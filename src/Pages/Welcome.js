import React, { useState } from "react";
import Modal from "../components/Modal";
import SignupModal from "../components/SignupModal";
import "./../css/Welcome.css";

export default function Welcome() {
  const [openModal, setOpenModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  return (
    <div>
      <button
        // to="/main"
        className="openModalBtn"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <h1>로그인</h1>
      </button>
      {openModal && <Modal closeModal={setOpenModal} signupModal={setOpenSignUpModal}/>}
      {openSignUpModal && <SignupModal closeModal={setOpenSignUpModal} loginModal={setOpenModal}/>}
    </div>
  );
}
