import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  html {  
    width: 100dvw;
    height: 100dvh;
    font-size: 62.5%;

    background-color: ${({ theme }) => theme.colors.background};
    
  }


`;

export default GlobalStyles;
