import React, { useState, useEffect, useCallback } from "react";
import "../css/Modal.css";
import logo from "../image/muleoba_logo.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";

export default function Modal({ closeModal, signupModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [pwdType, setPwdType] = useState({
    type: "password",
    visible: false,
  });

  const handlePwdType = (e) => {
    setPwdType(() => {
      if (!pwdType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  // useEffect(() => {
  //   console.log(email, password);
  // }, [[password]]);

  async function checkUser() {
    await axios
      .post("/muleoba/login", { email: email, password: password })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="modal_closeBtn">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="modal_logo">
          <img src={logo} />
        </div>
        <div className="modal_title">
          <h1>로그인</h1>
        </div>
        <div className="modal_body">
          <div className="modal_emailinput">
            <input
              type="text"
              placeholder="이메일"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="modal_pwdinput">
            <input
              type={pwdType.type}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span onClick={handlePwdType} className="modal_pwdIconCover">
              {pwdType.visible ? (
                <FaEye className="modal_pwdIcon" />
              ) : (
                <FaEyeSlash className="modal_pwdIcon" />
              )}
            </span>
          </div>
          <div className="modal_logininfo">
            <div>아이디 찾기 /&nbsp;</div>
            <div>비밀번호 찾기 /&nbsp;</div>
            <div>
              <button
                className="modal_signupBtn"
                onClick={() => {
                  closeModal(false);
                  signupModal(true);
                }}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
        <div className="modal_btn">
          <button onClick={checkUser}>로그인</button>
        </div>
      </div>
    </div>
  );
}
