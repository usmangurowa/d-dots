import "./App.css";
import { Dots } from "./components/dots";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Dots />
    </ThemeProvider>
  );
}

export default App;
