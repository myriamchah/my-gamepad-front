import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useUserContext } from "../../contexts/userContext";
import { useModalContext } from "../../contexts/modalContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setOrUpdateUser } = useUserContext();
  const { showLoginModal, hideModal } = useModalContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        {
          ...{ username, email, password },
        }
      );

      if (data.user) {
        setOrUpdateUser(data.user);
        hideModal();
      } else {
        alert("Oops! Please try again.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Email already used");
      } else {
        setErrorMessage(error);
      }
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
          type="text"
          placeholder="Username"
          className="mb-3 border-0 p-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Form.Control
          type="password"
          placeholder="Create a password"
          className="mb-3 border-0 p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="light" type="submit" className="w-100 mb-3 p-3">
          Sign up
        </Button>
      </Form>
      {errorMessage && (
        <p className="text-danger text-center">{errorMessage}</p>
      )}
      <div className="text-center" onClick={showLoginModal}>
        Already have an account ?{" "}
        <span className="cursor-pointer text-decoration-underline">Log in</span>
      </div>
    </>
  );
};

export default Signup;
