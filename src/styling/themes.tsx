const lightTheme = {
    background: "#e6e6e6",
    text: "#36393E",
    container: "#ffffff",
    accent: "#4fbd7c",
}
  
const darkTheme = {
    background: "#1E2124",
    text: "#ffffff",
    container: "#36393E",
    accent: "#4fbd7c",
}

type ThemeType = typeof lightTheme;

export { lightTheme, darkTheme };
export type { ThemeType };
