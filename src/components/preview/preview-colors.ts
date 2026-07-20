export interface PreviewPalette {
  foreground: string;
  backgroundStart: string;
  backgroundEnd: string;
}

// Mirrors the native Thorium Reader app's catalog color palette (SwiftUI
// Palette enum) so web previews match what the app itself renders.
export const previewColors: Record<string, PreviewPalette> = {
  gray:   { foreground: "#404040", backgroundStart: "#EBEBEB", backgroundEnd: "#C7C7C7" },
  red:    { foreground: "#8C0D0D", backgroundStart: "#FFD9D9", backgroundEnd: "#F2A6A6" },
  yellow: { foreground: "#806600", backgroundStart: "#FFF5CC", backgroundEnd: "#FFE08C" },
  blue:   { foreground: "#0D2680", backgroundStart: "#D1E6FF", backgroundEnd: "#8CB3F2" },
  green:  { foreground: "#0D6626", backgroundStart: "#D1F5D9", backgroundEnd: "#8CD999" },
  purple: { foreground: "#591A80", backgroundStart: "#EBD9FF", backgroundEnd: "#BF99F2" },
  orange: { foreground: "#8C4000", backgroundStart: "#FFEBCC", backgroundEnd: "#FFBF73" },
  pink:   { foreground: "#8C0D4D", backgroundStart: "#FFD9EB", backgroundEnd: "#F2A6CC" },
};
