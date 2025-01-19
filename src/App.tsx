import "./App.css";
import { DotsComponent } from "./components/dots-component";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DotsComponent />
    </ThemeProvider>
  );
}

export default App;
