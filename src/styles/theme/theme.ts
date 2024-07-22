import { css, DefaultTheme } from "styled-components";

export const colors = {
  white_100: "#FFFFFF",

  black_900: "#000000",

  background: "#FFFFFF",

  placeholder_300: "#DDDDE3",

  text_primary: "",
  text_secondary: "",
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

export type ColorsType = typeof colors;
export type FontWeight = typeof fontWeight;
export type BorderRadius = typeof borderRadius;
export type ScrollBarNone = typeof scrollBarNone;

const theme: DefaultTheme = {
  colors,
  fontWeight,
  scrollBarNone,
  borderRadius,
};

export default theme;
