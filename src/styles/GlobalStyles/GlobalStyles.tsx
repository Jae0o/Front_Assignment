import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  html {  
    width: 100dvw;
    height: 100dvh;
    font-size: 62.5%;

    background-color: ${({ theme }) => theme.colors.background};
    
  }

  li {
    list-style: none;
  }

  html, body, ul, li {
    padding: 0;
    margin: 0;

    box-sizing: border-box;
  }

`;

export default GlobalStyles;
