import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Game from "./pages/Game";
import MyCollection from "./pages/MyCollection";
import FormModal from "./components/Modal/Modal";

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
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <>
      <Router>
        <Header {...{ token, setUser, setModalShow, form, setForm }} />
        <FormModal
          {...{
            setUser,
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
            element={<Game {...{ token, setModalShow, setForm }} />}
          />
          <Route
            path="/my-collection"
            element={<MyCollection {...{ token }} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
