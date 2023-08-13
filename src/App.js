import "./App.css";
import HomePage from "./View/HomePage";
import TestPage from "./View/Test";

function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}
      <div className="test-page-wrapper">
        <TestPage></TestPage>
      </div>
    </div>
  );
}

export default App;
