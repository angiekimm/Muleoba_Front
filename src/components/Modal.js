import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Modal.css";
import logo from "../image/muleoba_logo.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { setID } from "../redux/Action";

const mapDispatchToProps = (dispatch) => {
  return {
    setID: (uid) => dispatch(setID(uid)),
  };
};

function Modal({ closeModal, signupModal, setID }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [emailMsg, setEmailMsg] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMsg("123@muleoba.com 형식으로 적어주세요");
      setIsEmail(false);
    } else {
      setIsEmail(true);
      setEmailMsg("");
    }
  });

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

  // 외부 영역 감지
  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);
    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (e) => {
    var target = e.target;

    if (target == e.currentTarget.querySelector(".modal_background")) {
      closeModal(false);
      return;
    }
  };

  async function checkUser() {
    await axios
      .post("/muleoba/login", { email: email, password: password })
      .then((response) => {
        // console.log(response.data);
        setID(response.data);
        if (response.data) {
          navigate("/main");
        } else {
          toast.error("이메일과 비밀번호를 확인해주세요.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //enter keydown 시 로그인
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && isEmail && password) {
      checkUser();
    }
  };

  return (
    <div className="modal_background">
      <ToastContainer className="Toastify__toast-container" theme="dark" />
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
        <div className="modal_body" onKeyDown={handleKeyDown}>
          <div className="modal_emailinput">
            <input
              type="email"
              placeholder="이메일"
              autoFocus
              value={email}
              onChange={onChangeEmail}
            />
            {email && <span className="modal_error">{emailMsg}</span>}
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
        <div
          className={!(isEmail && password) ? "modal_disabled" : "modal_btn"}
        >
          <button onClick={checkUser} disabled={!(isEmail && password)}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Modal);
