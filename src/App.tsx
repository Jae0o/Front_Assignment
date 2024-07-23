import { ThemeProvider } from "styled-components";

import { GlobalStyles, theme } from "@/styles";
import { TaskBoard } from "@/components";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <TaskBoard />
    </ThemeProvider>
  );
};

export default App;
