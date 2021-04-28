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
    color: ${({ theme }) => theme.primaryTextColor};
    font-family: 'Lato', sans-serif;
  }`;

  export default GlobalStyles;