import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorite from "./Favorite";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </Router>
  )
}
export default App;