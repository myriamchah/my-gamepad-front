import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./header.scss";
import logo from "../../assets/img/g-white.png";

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo" height="32" />
            &nbsp;amepad
          </Navbar.Brand>
          <div className="input-search">
            <input type="text" placeholder="Search xxx,xxx games" />
            <FontAwesomeIcon icon="magnifying-glass" className="icon" />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">LOG IN</Nav.Link>
              <Nav.Link href="#link">SIGN UP</Nav.Link>
              <Nav.Link href="#api">API</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
