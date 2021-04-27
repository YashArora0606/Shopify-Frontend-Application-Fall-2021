import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './themes';

const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    display: flex;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }`;

  export default GlobalStyles;