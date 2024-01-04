import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Game from "./pages/Game";
import MyCollection from "./pages/MyCollection";
import FormModal from "./components/Modal/Modal";
import { AuthProvider } from "./contexts/authContext";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faPlus,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faPlus, faChevronRight);

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [form, setForm] = useState("Signup");
  return (
    <AuthProvider>
      <Router>
        <Header {...{ setModalShow, form, setForm }} />
        <FormModal
          {...{
            form,
            setForm,
            modalShow,
            setModalShow,
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/games/:gameSlug"
            element={<Game {...{ setModalShow, setForm }} />}
          />
          <Route path="/my-collection" element={<MyCollection />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
