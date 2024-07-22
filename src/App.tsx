import { GlobalStyles, theme } from "@/styles";
import { ThemeProvider } from "styled-components";
import { TaskBoard } from "./components";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <TaskBoard />
    </ThemeProvider>
  );
};

export default App;
