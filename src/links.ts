export const blogHref = "https://blog.thoriumreader.com/";
export const supportHref = (lang: string) =>
  lang === "en"
    ? "https://support.thoriumreader.com"
    : `https://support.thoriumreader.com/hc/${ lang }`;
export const discordHref = "https://discord.gg/84wgWhFKDY";
export const githubHref = "https://github.com/edrlab";

// https://toolbox.marketingtools.apple.com/en-us/app-store/us
export const appleAppId = "6745025189";
export const appleReleaseDate = "1777507200";

// https://apps.microsoft.com/badge?hl=en-us&gl=US
export const msProductId = "9NFZP1G7M2SC";

// Deep linking
export const addCatalogUniversalLink = "https://www.thoriumreader.com/add/catalog";
export const addPublicationUniversalLink = "https://www.thoriumreader.com/add/publication";

export const addCatalogScheme = "com.thoriumreader:/add/catalog";
export const addPublicationScheme = "com.thoriumreader:/add/publication";

export const desktopVersion = "3.5.1";

export const downloadUrls = {
  macosArm: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }-arm64.dmg`,
  macosX64: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }-x64.dmg`,
  windowsExe: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }-x64.exe`,
  windowsArm: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }-arm64.exe`,
  linuxAppImage: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }-x86_64.AppImage`,
  linuxDeb: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }-amd64.deb`,
  linuxAppImageArm: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }-arm64.AppImage`,
  linuxDebArm: `https://github.com/edrlab/thorium-reader/releases/download/v${ desktopVersion }/Thorium-${ desktopVersion }-arm64.deb`,
};

export const downloadPlatforms: Record<string, string> = {
  macosArm:         "macos",
  macosX64:         "macos_intel",
  windowsExe:       "windows",
  windowsArm:       "windows_arm",
  linuxAppImage:    "linux_appimage",
  linuxAppImageArm: "linux_appimage_arm",
  linuxDeb:         "linux_debian",
  linuxDebArm:      "linux_debian_arm",
};