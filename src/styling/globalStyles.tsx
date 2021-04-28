import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './themes';

// Fonts from Shopify design philosophy

const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI,
    Roboto, Helvetica Neue, sans-serif;
  }

  body {
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.primaryTextColor};
  }`;

  export default GlobalStyles;