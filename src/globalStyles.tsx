import { createGlobalStyle } from "styled-components";
import { ThemeModel } from "./models/theme.model";

// Fonts from Shopify design philosophy

const GlobalStyles = createGlobalStyle<{ theme: ThemeModel }>`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI,
    Roboto, Helvetica Neue, sans-serif;
  }

  html {
    position: relative;
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    color: ${({ theme }) => theme.text};
  } 

  body {
    font-size: 100%;
    background: ${({ theme }) => `${theme.background} !important`};
    color: ${({ theme }) => `${theme.text} !important`};
  }
  
  .text {
    width: 100%;
    font-weight: bold;
    padding: 0.75rem;
    margin: 0;
  }
  
  .entries {
    padding-left: 1rem;
  }

  `;

export default GlobalStyles;
