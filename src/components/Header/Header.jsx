import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import "./header.scss";
import logo from "../../assets/img/g-white.png";

import SearchResultsCard from "./SearchResultsCard";

const Header = ({ token, setToken, setForm, setModalShow }) => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000?search=${search}`
        );

        setGames(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div>
      <Navbar expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" height="32" />
            &nbsp;amepad
          </Navbar.Brand>
          <div className="input-search">
            <input
              type="text"
              value={search}
              placeholder={`Search 860,587 games`}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <FontAwesomeIcon icon="magnifying-glass" className="icon" />
            <Collapse in={search.length > 0}>
              <div id="search-results">
                {search ? <SearchResultsCard {...{ games }} /> : ""}
              </div>
            </Collapse>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {token ? (
                <>
                  <Nav.Link>MY COLLECTIONS</Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setToken("");
                      navigate("/");
                    }}
                  >
                    LOG OUT
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    onClick={() => {
                      setForm("Login");
                      setModalShow(true);
                    }}
                  >
                    LOG IN
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setForm("Signup");
                      setModalShow(true);
                    }}
                  >
                    SIGN UP
                  </Nav.Link>
                </>
              )}

              <Nav.Link href="https://api.rawg.io/docs/" target="_blank">
                API
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
