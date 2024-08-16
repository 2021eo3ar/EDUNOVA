import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import PersonView from "./pages/PersonView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/people_directory" element={<PersonView />} />
      </Routes>
    </Router>
  );
}

export default App;
