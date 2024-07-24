import { ThemeProvider } from "styled-components";

import { GlobalStyles, theme } from "@/styles";
import { TaskBoard, ToastProvider } from "@/components";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastProvider>
        <TaskBoard />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
