import { css, DefaultTheme } from "styled-components";

export const colors = {
  white_100: "#FFFFFF",

  black_900: "#000000",

  yellow_500: "#ffce54",

  gray: "#e6e9ed",
  dark_gray: "#ccd1d9",

  background: "#FFFFFF",

  placeholder_300: "#DDDDE3",

  text_primary: "",
  text_secondary: "",
};

export const pointColors = {
  NO_STATUS: "#e6e9ed",
  TODO: "#0073cf",
  IN_PROGRESS: "#ffce54",
  DONE: "#a0d468",
};

export const fontWeight = {
  thin: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
};

export const borderRadius = {
  radius4: "0.4rem",
  radius8: "0.8rem",
  radius12: "1.2rem",
  radius16: "1.6rem",
  circle: "9999rem",
};

export const scrollBarNone = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const padding = {
  grid: 0.8,
};

export const boxShadow = {
  basic: "0 0 1.6rem 0.4rem rgba(0, 0, 0, 0.1)",
};

export type ColorsType = typeof colors;
export type FontWeight = typeof fontWeight;
export type BorderRadius = typeof borderRadius;
export type ScrollBarNone = typeof scrollBarNone;
export type Padding = typeof padding;
export type PointColors = typeof pointColors;
export type BoxShadow = typeof boxShadow;

const theme: DefaultTheme = {
  colors,
  fontWeight,
  scrollBarNone,
  borderRadius,
  padding,
  pointColors,
  boxShadow,
};

export default theme;
