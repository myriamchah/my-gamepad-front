import { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home";

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
      <Header />
      <Home />
    </>
  );
}

export default App;
