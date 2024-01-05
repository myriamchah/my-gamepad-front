import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Game from "./pages/Game";
import MyCollection from "./pages/MyCollection";
import FormModal from "./components/Modal/Modal";
import { UserProvider } from "./contexts/userContext";
import { ModalProvider } from "./contexts/modalContext";

function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <Router>
          <Header />
          <FormModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games/:gameSlug" element={<Game />} />
            <Route path="/my-collection" element={<MyCollection />} />
          </Routes>
        </Router>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
