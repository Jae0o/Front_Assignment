import { css, DefaultTheme } from "styled-components";

export const colors = {
  white_300: "#edf2f4",
  white_500: "#FFFFFF",

  blue_500: "#0073cf",

  green_500: "#a0d468",

  red_700: "#ed5565",

  gray_400: "#ccd1d9",

  background: "#FFFFFF",
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
  medium: "0 0 0.8rem 0.2rem rgba(0, 0, 0, 0.1)",
  small: "0 0 0.4rem 0.1rem rgba(0, 0, 0, 0.1)",
};

export type ColorsType = typeof colors;
export type FontWeight = typeof fontWeight;
export type BorderRadius = typeof borderRadius;
export type ScrollBarNone = typeof scrollBarNone;
export type Padding = typeof padding;
export type BoxShadow = typeof boxShadow;

const theme: DefaultTheme = {
  colors,
  fontWeight,
  scrollBarNone,
  borderRadius,
  padding,
  boxShadow,
};

export default theme;
