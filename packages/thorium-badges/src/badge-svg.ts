import rawLogo from "./thorium-logo.svg?raw";

export * from "./params.js";

const _iconUri = `data:image/svg+xml;base64,${ btoa(rawLogo) }`;
const _font = 'font-family="system-ui,-apple-system,Arial,sans-serif"';

export function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function makeSVG({ line1, line2, title }: { line1: string; line2: string; title: string }): string {
  const iconPart = `<clipPath id="ic"><rect x="12" y="12" width="32" height="32" rx="5"/></clipPath>\n  <image href="${ _iconUri }" x="12" y="12" width="32" height="32" clip-path="url(#ic)" preserveAspectRatio="xMidYMid meet"/>`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 56" width="196" height="56" role="img" aria-label="${ esc(title) }">`,
    `  <title>${ esc(title) }</title>`,
    `  <rect width="196" height="56" rx="8" fill="#A4485F"/>`,
    `  ${ iconPart }`,
    `  <text x="57" y="22" ${ _font } font-size="10" fill="#F9F4E3" opacity="0.85">${ esc(line1) }</text>`,
    `  <text x="57" y="40" ${ _font } font-size="15" font-weight="700" fill="#F9F4E3">${ esc(line2) }</text>`,
    `</svg>`,
  ].join("\n");
}
