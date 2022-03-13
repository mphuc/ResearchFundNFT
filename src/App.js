import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import Main from "./components/Main";

const theme = createTheme({
  palette: {
    primary: {
      main: "#175c4c",
    },
    secondary: {
      main: "#efdbce",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
