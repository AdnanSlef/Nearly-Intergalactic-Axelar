import Home from "./components/home";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

function App() {
  return (
    <>
      <AwesomeButton
        // cssModule={AwesomeButtonStyles}
        type="primary"
        onPress={() => {
          // do something
        }}
      >
        Begin Intergalactic Experience!
      </AwesomeButton>
      <Home />
    </>
  );
}

export default App;
