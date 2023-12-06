import { useState } from "react";
import "./App.scss";

import Header from "./components/Header/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faXmark);

function App() {
  return (
    <>
      <Header />
    </>
  );
}

export default App;
