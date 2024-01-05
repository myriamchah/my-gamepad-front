import { createContext, useState, useContext } from "react";

import Signup from "../components/UserForms/Signup";
import Login from "../components/UserForms/Login";
import Review from "../components/GameForms/Review";
import Comment from "../components/GameForms/Comment";

const ModalContext = createContext();

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider(props) {
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState("Sign up");
  const [content, setContent] = useState("Signup");

  const showLoginModal = () => {
    setTitle("Log in");
    setContent(<Login />);
    setModalShow(true);
  };

  const showSignupModal = () => {
    setTitle("Sign up");
    setContent(<Signup />);
    setModalShow(true);
  };

  const showReviewModal = () => {
    setTitle("Write your review");
    setContent(<Review />);
    setModalShow(true);
  };

  const showCommentModal = () => {
    setTitle("Write your comment");
    setContent(<Comment />);
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const value = {
    title,
    content,
    modalShow,
    showLoginModal,
    showSignupModal,
    showReviewModal,
    showCommentModal,
    hideModal,
  };
  return (
    <ModalContext.Provider value={value}>
      {props.children}
    </ModalContext.Provider>
  );
}
