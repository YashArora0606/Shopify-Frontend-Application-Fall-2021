import { createGlobalStyle } from 'styled-components';
import { ThemeModel } from '../models/theme.model';

// Fonts from Shopify design philosophy

const GlobalStyles = createGlobalStyle<{ theme: ThemeModel }>`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI,
    Roboto, Helvetica Neue, sans-serif;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
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