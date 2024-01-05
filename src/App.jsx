import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Game from "./pages/Game";
import MyCollection from "./pages/MyCollection";
import FormModal from "./components/Modal/Modal";
import { UserProvider } from "./contexts/userContext";

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [form, setForm] = useState("Signup");
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default App;
