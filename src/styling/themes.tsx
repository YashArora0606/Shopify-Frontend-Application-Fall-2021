const lightTheme = {
    backgroundColor: "white",
    textColor: "black"
}
  
const darkTheme = {
    backgroundColor: "black",
    textColor: "white"
}

type ThemeType = typeof lightTheme;

export { lightTheme, darkTheme };
export type { ThemeType };
