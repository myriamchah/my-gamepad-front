import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Game from "./pages/Game";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faPlus,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faPlus, faChevronRight);

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:gameSlug" element={<Game />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
