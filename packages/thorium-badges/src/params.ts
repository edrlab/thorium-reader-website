export type ParamAttrs = [attr: string, param: string][];

export const catalogParamAttrs: ParamAttrs = [
  ["title", "title"],
  ["main", "main"],
  ["bookshelf", "bookshelf"],
  ["passphrase", "passphrase"],
  ["hashed-passphrase", "hashed_passphrase"],
  ["open-in", "open_in"],
  ["icon", "icon"],
  ["banner", "banner"],
  ["color", "color"],
];

export const catalogUrlAttrs = new Set(["main", "bookshelf", "icon", "banner"]);

export function catalogIsValid(get: (attr: string) => string): boolean {
  return Boolean(get("title") && (get("main") || get("bookshelf")));
}

export const publicationParamAttrs: ParamAttrs = [
  ["publication", "publication"],
  ["title", "title"],
  ["author", "author"],
  ["cover", "cover"],
  ["passphrase", "passphrase"],
  ["hashed-passphrase", "hashed_passphrase"],
];

export const publicationUrlAttrs = new Set(["publication", "cover"]);

export function publicationIsValid(get: (attr: string) => string): boolean {
  return Boolean(get("publication"));
}

export function assertValidUrl(tagName: string, attrName: string, value: string): void {
  try {
    new URL(value);
  } catch {
    throw new Error(`<${ tagName }> attribute "${ attrName }" is not a valid URL: "${ value }"`);
  }
}
