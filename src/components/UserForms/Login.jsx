import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = ({ setToken, setForm, setModalShow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      const response = await axios.post("http://localhost:3000/user/login", {
        ...{ email, password },
      });

      if (response.data.token) {
        setToken(response.data.token);
        setModalShow(false);
        navigate("/");
      } else {
        alert("Oops! Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit} className="w-75 m-auto">
        <Form.Control
          type="email"
          placeholder="Email"
          className="mb-3 border-0 p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Form.Control
          type="password"
          placeholder="Create a password"
          className="mb-3 border-0 p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="light" type="submit" className="w-100 mb-3 p-3">
          Log in
        </Button>
      </Form>
      {errorMessage && (
        <p className="text-danger text-center">{errorMessage}</p>
      )}
      <div className="text-center" onClick={() => setForm("Signup")}>
        Don't have an account ?{" "}
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>
          Sign up
        </span>
      </div>
    </>
  );
};

export default Login;
