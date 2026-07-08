import { makeSVG, esc } from "./badge-svg.js";
import { badgeTexts, interpolate, resolveLocale } from "./locales.js";
import {
  assertValidUrl,
  catalogIsValid,
  catalogParamAttrs,
  catalogUrlAttrs,
  publicationIsValid,
  publicationParamAttrs,
  publicationUrlAttrs,
  type ParamAttrs,
} from "./params.js";

const addCatalogUniversalLink = "https://www.thoriumreader.com/add/catalog";
const addPublicationUniversalLink = "https://www.thoriumreader.com/add/publication";

const sharedStyle = `
  :host { display: inline-block; line-height: 0; }
  a { display: inline-block; text-decoration: none; }
`;

// Falls back to a plain class outside a browser (SSR/Node import of the main
// entry) so this module can be imported without a ReferenceError; the real
// custom elements are only ever defined/constructed when HTMLElement exists.
const BaseElement: typeof HTMLElement =
  typeof HTMLElement !== "undefined" ? HTMLElement : (class {} as unknown as typeof HTMLElement);

// Defines a property on `prototype` that reflects to/from the given content
// attribute. Declare the matching field with `declare` (not `!:`) on the
// class so TS doesn't emit a class-field initializer that would shadow this
// accessor at construction time.
function reflect(prototype: object, prop: string, attr: string): void {
  Object.defineProperty(prototype, prop, {
    get(this: ThoriumBadgeElement): string {
      return this.attr(attr);
    },
    set(this: ThoriumBadgeElement, value: string): void {
      this.setAttr(attr, value);
    },
    enumerable: true,
    configurable: true,
  });
}

abstract class ThoriumBadgeElement extends BaseElement {
  protected abstract universalLink: string;
  protected abstract paramAttrs: ParamAttrs;
  protected abstract urlAttrs: Set<string>;

  protected abstract isValid(get: (attr: string) => string): boolean;
  protected abstract requiredAttrsMessage: string;

  // Property names (not attribute names) reflected on this class, used to
  // recover values set as properties before the element was upgraded — see
  // upgradeProperty(). Subclasses override with their own list, prefixed
  // with this one.
  protected static reflectedProps: readonly string[] = ["title", "passphrase", "hashedPassphrase"];

  static {
    reflect(this.prototype, "title", "title");
    reflect(this.prototype, "passphrase", "passphrase");
    reflect(this.prototype, "hashedPassphrase", "hashed-passphrase");
  }

  declare title: string;
  declare passphrase: string;
  declare hashedPassphrase: string;

  connectedCallback() {
    const { reflectedProps } = this.constructor as typeof ThoriumBadgeElement;
    for (const prop of reflectedProps) this.upgradeProperty(prop);

    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  // A property set before customElements.define() runs (e.g. by a framework
  // assigning DOM properties ahead of upgrade) lands as a plain own instance
  // property. Left alone, that own property permanently shadows the
  // reflect()-defined prototype accessor once the class registers, so the
  // value would never reach the underlying attribute. Re-assigning through
  // the accessor after deleting the own property fixes that.
  // https://web.dev/articles/custom-elements-best-practices
  private upgradeProperty(prop: string) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = (this as unknown as Record<string, string>)[prop];
      delete (this as unknown as Record<string, string>)[prop];
      (this as unknown as Record<string, string>)[prop] = value;
    }
  }

  attr(name: string): string {
    return this.getAttribute(name)?.trim() ?? "";
  }

  setAttr(name: string, value: string) {
    if (value) this.setAttribute(name, value);
    else this.removeAttribute(name);
  }

  private render() {
    const root = this.shadowRoot;
    if (!root) return;

    for (const attrName of this.urlAttrs) {
      const value = this.attr(attrName);
      if (value) assertValidUrl(this.tagName.toLowerCase(), attrName, value);
    }

    if (!this.isValid((name) => this.attr(name))) {
      throw new Error(
        `<${ this.tagName.toLowerCase() }> is missing required attribute(s): ${ this.requiredAttrsMessage }.`
      );
    }

    const locale = resolveLocale(this.getAttribute("lang"));
    const { line1, line2, alt } = badgeTexts[locale];
    const title = this.attr("title");
    const svgTitle = title ? interpolate(alt, { name: title }) : `${ line1 } ${ line2 }`;
    const svg = makeSVG({ line1, line2, title: svgTitle });

    const params = new URLSearchParams();
    for (const [attrName, paramName] of this.paramAttrs) {
      const value = this.attr(attrName);
      if (value) params.set(paramName, value);
    }

    const href = `${ this.universalLink }?${ params.toString() }`;

    root.innerHTML = `<style>${ sharedStyle }</style><a href="${ esc(href) }">${ svg }</a>`;
  }
}

export class ThoriumBadgeCatalogElement extends ThoriumBadgeElement {
  static get observedAttributes() {
    return ["title", "main", "bookshelf", "passphrase", "hashed-passphrase", "open-in", "icon", "banner", "color", "lang"];
  }

  protected universalLink = addCatalogUniversalLink;
  protected paramAttrs = catalogParamAttrs;
  protected urlAttrs = catalogUrlAttrs;
  protected requiredAttrsMessage = `"title" and at least one of "main" or "bookshelf"`;

  protected isValid(get: (attr: string) => string): boolean {
    return catalogIsValid(get);
  }

  protected static reflectedProps: readonly string[] = [
    ...ThoriumBadgeElement.reflectedProps,
    "main",
    "bookshelf",
    "openIn",
    "icon",
    "banner",
    "color",
  ];

  static {
    reflect(this.prototype, "main", "main");
    reflect(this.prototype, "bookshelf", "bookshelf");
    reflect(this.prototype, "openIn", "open-in");
    reflect(this.prototype, "icon", "icon");
    reflect(this.prototype, "banner", "banner");
    reflect(this.prototype, "color", "color");
  }

  declare main: string;
  declare bookshelf: string;
  declare openIn: "" | "webview" | "browser";
  declare icon: string;
  declare banner: string;
  declare color: string;
}

export class ThoriumBadgePublicationElement extends ThoriumBadgeElement {
  static get observedAttributes() {
    return ["publication", "title", "author", "cover", "passphrase", "hashed-passphrase", "lang"];
  }

  protected universalLink = addPublicationUniversalLink;
  protected paramAttrs = publicationParamAttrs;
  protected urlAttrs = publicationUrlAttrs;
  protected requiredAttrsMessage = `"publication"`;

  protected isValid(get: (attr: string) => string): boolean {
    return publicationIsValid(get);
  }

  protected static reflectedProps: readonly string[] = [
    ...ThoriumBadgeElement.reflectedProps,
    "publication",
    "author",
    "cover",
  ];

  static {
    reflect(this.prototype, "publication", "publication");
    reflect(this.prototype, "author", "author");
    reflect(this.prototype, "cover", "cover");
  }

  declare publication: string;
  declare author: string;
  declare cover: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "thorium-badge-catalog": ThoriumBadgeCatalogElement;
    "thorium-badge-publication": ThoriumBadgePublicationElement;
  }
}

if (typeof customElements !== "undefined") {
  if (!customElements.get("thorium-badge-catalog")) {
    customElements.define("thorium-badge-catalog", ThoriumBadgeCatalogElement);
  }
  if (!customElements.get("thorium-badge-publication")) {
    customElements.define("thorium-badge-publication", ThoriumBadgePublicationElement);
  }
}
