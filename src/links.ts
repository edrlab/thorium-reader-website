export const blogHref = "https://blog.thoriumreader.com/";
export const supportHref = (lang: string) =>
  lang === "en"
    ? "https://support.thoriumreader.com"
    : `https://support.thoriumreader.com/hc/${ lang }`;
export const discordHref = "https://discord.gg/84wgWhFKDY";

// https://toolbox.marketingtools.apple.com/en-us/app-store/us
export const appleAppId = "6745025189";
export const appleReleaseDate = "1777507200";

// https://apps.microsoft.com/badge?hl=en-us&gl=US
export const msProductId = "9NFZP1G7M2SC";

// Deep link scheme for adding a catalog to Thorium Reader (placeholder)
export const addCatalogScheme = "https://www.thoriumreader.com";

export const desktopVersion = "3.4.0";

export const downloadUrls = {
  macosArm: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }-arm64.dmg`,
  macosX64: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }.dmg`,
  windowsExe: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium.Setup.${ desktopVersion }.exe`,
  windowsArm: "https://www.thoriumreader.com/#download-windows-arm",
};