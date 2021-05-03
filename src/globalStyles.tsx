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

  // Add theme and overriding to polaris styled components 

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

  .Polaris-Popover__Wrapper {
    background: ${({ theme }) => `${theme.container}`};
    color: ${({ theme }) => `${theme.text}`};
  }

  .Polaris-ActionList__Item:hover {
      background: rgba(0, 0, 0, 0.1);
  }

  .Polaris-Modal-Dialog__Modal {
    max-width: 80% !important;
    border-radius: 2rem;
    background: ${({ theme }) => `${theme.container}`};
    color: ${({ theme }) => `${theme.text}`};
  }

  .Polaris-Modal-CloseButton {
    padding: 0.5em 1.1em;
    margin: 1em 0.3em 0.3em 0.1em;
    border-radius: 2em;
    background: ${({ theme }) => `${theme.container}`};
  }

  .Polaris-Icon__Svg {
    fill: ${({ theme }) => `${theme.text} !important`};
  }

  .Polaris-Modal-CloseButton:hover {
    background: ${({ theme }) => `${theme.container}`};
  }

  @media (max-width: 768px) {
    .Polaris-Modal-Dialog__Modal {
        border-radius: 0;
        border-top-left-radius: 2rem;
        border-top-right-radius: 2rem;

        max-width: 100% !important;
    }
  }
  `;

export default GlobalStyles;
