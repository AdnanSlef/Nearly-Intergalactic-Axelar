import Home from "./components/home";
import ImageComponent from "./components/slide";

function App() {
  return (
    <div>
      <ImageComponent index={1} />
      <Home />
    </div>
  );
}

export default App;
