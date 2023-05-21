import Home from "./components/home";
import ImageComponent from "./components/slide";
import "./background-space.css";

function App() {
  return (
    <div className="space-background">
      <ImageComponent index={4} />
      <Home />
    </div>
  );
}

export default App;
