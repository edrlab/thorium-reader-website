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

abstract class ThoriumBadgeElement extends BaseElement {
  protected abstract universalLink: string;
  protected abstract paramAttrs: ParamAttrs;
  protected abstract urlAttrs: Set<string>;

  protected abstract isValid(get: (attr: string) => string): boolean;
  protected abstract requiredAttrsMessage: string;

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  private attr(name: string): string {
    return this.getAttribute(name)?.trim() ?? "";
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

class ThoriumBadgeCatalogElement extends ThoriumBadgeElement {
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
}

class ThoriumBadgePublicationElement extends ThoriumBadgeElement {
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
}

if (typeof customElements !== "undefined") {
  if (!customElements.get("thorium-badge-catalog")) {
    customElements.define("thorium-badge-catalog", ThoriumBadgeCatalogElement);
  }
  if (!customElements.get("thorium-badge-publication")) {
    customElements.define("thorium-badge-publication", ThoriumBadgePublicationElement);
  }
}
