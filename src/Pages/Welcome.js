import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import SignupModal from "../components/SignupModal";
import "./../css/Welcome.css";
import logo from "../image/muleoba_logo.png";
import { FaAngleRight } from "react-icons/fa";
import { CgMouse } from "react-icons/cg";
import bubble from "../image/bubble.jpg";
import graph from "../image/main_graph.png";

export default function Welcome() {
  const uID = useSelector((state) => state.idReducer.uID);

  const [openModal, setOpenModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  // About 클릭 스크롤 이동
  const aboutRef = useRef(null);
  const onAboutClick = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 외부영역 감지

  return (
    <div className="welcome">
      <div className="welcome_navbar">
        <div className="welcome_navbar_container">
          <div className="welcome_navbar_flex">
            <div className="welcome_navbar_left">
              <div className="welcome_navbar_logo_box">
                <img src={logo} className="welcome_navbar_logo" />
              </div>
            </div>
            <div className="welcome_navbar_right">
              <div
                className="welcome_navbar_login"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                로그인
              </div>
              <div className="welcome_navbar_about" onClick={onAboutClick}>
                ABOUT
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="welcome_main">
        <div className="welcome_area">
          <h1>물건, 어디서 바꿀래?</h1>
          <h2>
            자주 사용하지 않는 물건을 <br />
            필요한 물건과 무료로 바꾸는 위치 기반 서비스
          </h2>
          <button
            className="welcome_modal_btn"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            서비스 이용하기 &nbsp;
            <div className="welcome_arrowBtn">
              <FaAngleRight />
            </div>
          </button>
          <div className="welcome_scrollDown">
            <h4>마우스를 이동해주세요</h4>
            <CgMouse className="welcome_mouseIcon" />
          </div>
        </div>
      </div>
      <div className="welcome_container1 welcome_background1" ref={aboutRef}>
        <div className="text">
          <br />
          <br />
          <h1>물건,</h1>
          <h1 className="text_purple">어디서 바꿀래?</h1>
          <br />
          <p>
            버려진 플라스틱이나 쓰레기로 인한 환경오염 심각성이 대두됨에 따라,
            <br />
            품질은 좋지만 더이상 필요하지 않는 물품을 교환하고 나누고 다시 쓰며
            <br />
            누구나 환경보호에 동참할 수 있는 사용 친화 서비스를 제공합니다.
            <br />
          </p>
        </div>

        <div className="image">
          <img src={graph} />
        </div>
      </div>
      <div className="welcome_container1 welcome_background2">
        <br />
        <br />
        <div className="image">
          <img src={bubble} />
        </div>
        <div className="text text_white">
          <h1>물어바, 우리가</h1>
          <br />
          <h1 className="text_purple">기대하는 세상</h1>
          <p>
            필요하지 않은 물품과 원하는 물품을 물물교환함으로써,
            <br />
            버려지는 쓰레기를 줄여 환경을 보호할 수 있고
            <br /> 사용자의 꼭 필요하지 않는 소비 감소를 기대합니다.
            <br />
            <br />
            <br />
            사용자에게 사용친화적인 인터페이스를 제공하면서,
            <br />
            데이터 분석을 통한 랭킹 서비스를 통해 <br />
            환경보호에 대한 의지를 높여줍니다.
            <br />
          </p>
          <br />
          <br />
        </div>
      </div>
      <div className="welcome_container1 welcome_background3">
        <div className="welcome_area3">
          <h1>자, 그러면</h1>
          <br />
          <h1>다같이 시작해볼까요?</h1>
          <button
            className="welcome_modal_btn"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            서비스 이용하기 &nbsp;
            <div className="welcome_arrowBtn">
              <FaAngleRight />
            </div>
          </button>
        </div>
      </div>
      <Footer />

      {/* 로그인 및 회원가입 모달창 */}
      {openModal && (
        <Modal closeModal={setOpenModal} signupModal={setOpenSignUpModal} />
      )}
      {openSignUpModal && (
        <SignupModal
          closeModal={setOpenSignUpModal}
          loginModal={setOpenModal}
        />
      )}
    </div>
  );
}
