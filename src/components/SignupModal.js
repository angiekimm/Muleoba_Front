import React, { useState, useEffect, useCallback } from "react";
import "../css/SignupModal.css";
import logo from "../image/muleoba_logo.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import SelectBox from "./SelectBox";
import data from "../db/data.json";
import axios from "axios";

export default function SignupModal({ closeModal, loginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [cityList, setCityList] = useState([
    { value: false, name: "시/군/구" },
  ]);
  const [flag, setFlag] = useState(false);

  //오류메세지 상태저장
  const [pwMsg, setPwMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");

  //유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isNickname, setIsNickname] = useState(false);

  // 비밀번호 확인
  const onChangePw = useCallback((e) => {
    const pw2Current = e.target.value;
    setPw2(pw2Current);

    if (password === pw2Current) {
      setPwMsg("");
      setIsPw(true);
    } else {
      setPwMsg("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      setIsPw(false);
    }
  });

  // 지역: 시/도 선택에 따른 시/군/구 선택지 변경
  useEffect(() => {
    setCity("default");
    if (state === "Seoul")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Gangnam-gu", name: "강남구" },
        { value: "Gangdong-gu", name: "강동구" },
        { value: "Gangbuk-gu", name: "강북구" },
        { value: "Gangseo-gu", name: "강서구" },
        { value: "Gwanak-gu", name: "관악구" },
        { value: "Gwangjin-gu", name: "광진구" },
        { value: "Guro-gu", name: "구로구" },
        { value: "Geumcheon-gu", name: "금천구" },
        { value: "Nowon-gu", name: "노원구" },
        { value: "Dobong-gu", name: "도봉구" },
        { value: "Dongdaemun-gu", name: "동대문구" },
        { value: "Dongjak-gu", name: "동작구" },
        { value: "Mapo-gu", name: "마포구" },
        { value: "Seodaemun-gu", name: "서대문구" },
        { value: "Seocho-gu", name: "서초구" },
        { value: "Seongdong-gu", name: "성동구" },
        { value: "Seongbuk-gu", name: "성북구" },
        { value: "Songpa-gu", name: "송파구" },
        { value: "Yangcheon-gu", name: "양천구" },
        { value: "Yeongdeungpo-gu", name: "영등포구" },
        { value: "Yongsan-gu", name: "용산구" },
        { value: "Eunpyeong-gu", name: "은평구" },
        { value: "Jung-gu", name: "중구" },
        { value: "Jungnang-gu", name: "중랑구" },
      ]);
    else if (state === "Busan")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Gangseo-gu", name: "강서구" },
        { value: "Geumjeong-gu", name: "금정구" },
        { value: "Nam-gu", name: "남구" },
        { value: "Dong-gu", name: "동구" },
        { value: "Dongnae-gu", name: "동래구" },
        { value: "Busanjin-gu", name: "부산진구" },
        { value: "Buk-gu", name: "북구" },
        { value: "Sasang-gu", name: "사상구" },
        { value: "Saha-gu", name: "사하구" },
        { value: "Seo-gu", name: "서구" },
        { value: "Suyeong-gu", name: "수영구" },
        { value: "Yeonje-gu", name: "연제구" },
        { value: "Yeongdo-gu", name: "영도구" },
        { value: "Jung-gu", name: "중구" },
        { value: "Haeundae-gu", name: "해운대구" },
        { value: "Gijang-gun", name: "기장군" },
      ]);
    else if (state === "Daegu")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Nam-gu", name: "남구" },
        { value: "Dalseo-gu", name: "달서구" },
        { value: "Dong-gu", name: "동구" },
        { value: "Buk-gu", name: "북구" },
        { value: "Seo-gu", name: "서구" },
        { value: "Suseong-gu", name: "수성구" },
        { value: "Jung-gu", name: "중구" },
        { value: "Dalseong-gun", name: "달성군" },
      ]);
    else if (state === "Incheon")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Gyeyang-gu", name: "계양구" },
        { value: "Nam-gu", name: "남구" },
        { value: "Namdong-gu", name: "남동구" },
        { value: "Dong-gu", name: "동구" },
        { value: "Bupyeong-gu", name: "부평구" },
        { value: "Seo-gu", name: "서구" },
        { value: "Yeonsu-gu", name: "연수구" },
        { value: "Jung-gu", name: "중구" },
        { value: "Ganghwa-gun", name: "강화군" },
        { value: "Ongjin-gun", name: "옹진군" },
      ]);
    else if (state === "Gwangju")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Gwangsan-gu", name: "광산구" },
        { value: "Nam-gu", name: "남구" },
        { value: "Dong-gu", name: "동구" },
        { value: "Buk-gu", name: "북구" },
        { value: "Seo-gu", name: "서구" },
      ]);
    else if (state === "Daejeon")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Daedeok-gu", name: "대덕구" },
        { value: "Dong-gu", name: "동구" },
        { value: "Seo-gu", name: "서구" },
        { value: "Yuseong-gu", name: "유성구" },
        { value: "Jung-gu", name: "중구" },
      ]);
    else if (state === "Ulsan")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Ulju-gun", name: "울주군" },
        { value: "Nam-gu", name: "남구" },
        { value: "Dong-gu", name: "동구" },
        { value: "Buk-gu", name: "북구" },
        { value: "Jung-gu", name: "중구" },
      ]);
    else if (state === "Sejong")
      setCityList([{ value: "Sejong", name: "세종시" }]);
    else if (state === "Gyeonggi-do")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Suwon-si", name: "수원시" },
        { value: "Goyang-si", name: "고양시" },
        { value: "Gwacheon-si", name: "과천시" },
        { value: "Gwangmyeong-si", name: "광명시" },
        { value: "Gwangju-si", name: "광주시" },
        { value: "Guri-si", name: "구리시" },
        { value: "Gunpo-si", name: "군포시" },
        { value: "Gimpo-si", name: "김포시" },
        { value: "Namyangju-si", name: "남양주시" },
        { value: "Dongducheon-si", name: "동두천시" },
        { value: "Bucheon-si", name: "부천시" },
        { value: "Seongnam-si", name: "성남시" },
        { value: "Siheung-si", name: "시흥시" },
        { value: "Ansan-si", name: "안산시" },
        { value: "Anseong-si", name: "안성시" },
        { value: "Anyang-si", name: "안양시" },
        { value: "Yangju-si", name: "양주시" },
        { value: "Yeoju-si", name: "여주시" },
        { value: "Osan-si", name: "오산시" },
        { value: "Yongin-si", name: "용인시" },
        { value: "Uiwang-si", name: "의왕시" },
        { value: "Uijeongbu-si", name: "의정부시" },
        { value: "Icheon-si", name: "이천시" },
        { value: "Paju-si", name: "파주시" },
        { value: "Pyeongtaek-si", name: "평택시" },
        { value: "Pocheon-si", name: "포천시" },
        { value: "Hanam-si", name: "하남시" },
        { value: "Hwaseong-si", name: "화성시" },
        { value: "Gapyeong-gun", name: "가평군" },
        { value: "Yangpyeong-gun", name: "양평군" },
        { value: "Yeoncheon-gun", name: "연천군" },
      ]);
    else if (state === "Gangwon-do")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Chuncheon-si", name: "춘천시" },
        { value: "Gangneung-si", name: "강릉시" },
        { value: "Donghae-si", name: "동해시" },
        { value: "Samcheok-si", name: "삼척시" },
        { value: "Sokcho-si", name: "속초시" },
        { value: "Wonju-si", name: "원주시" },
        { value: "Taebaek-si", name: "태백시" },
        { value: "Goseong-gun", name: "고성군" },
        { value: "Yanggu-gun", name: "양구군" },
        { value: "Yangyang-gun", name: "양양군" },
        { value: "Yeongwol-gun", name: "영월군" },
        { value: "Inje-gun", name: "인제군" },
        { value: "Jeongseon-gun", name: "정선군" },
        { value: "Cheorwon-gun", name: "철원군" },
        { value: "Pyeongchang-gun", name: "평창군" },
        { value: "Hongcheon-gun", name: "홍천군" },
        { value: "Hwacheon-gun", name: "화천군" },
        { value: "Hoengseong-gun", name: "횡성군" },
      ]);
    else if (state === "Chungcheongbuk-do")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Cheongju-si", name: "청주시" },
        { value: "Jecheon-si", name: "제천시" },
        { value: "Chungju-si", name: "충주시" },
        { value: "Goesan-gun", name: "괴산군" },
        { value: "Danyang-gun", name: "단양군" },
        { value: "Boeun-gun", name: "보은군" },
        { value: "Yeongdong-gun", name: "영동군" },
        { value: "Okcheon-gun", name: "옥천군" },
        { value: "Jeungpyeong-gun", name: "증평군" },
        { value: "Jincheon-gun", name: "진천군" },
      ]);
    else if (state === "Chungcheongnam-do")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Cheonan-si", name: "천안시" },
        { value: "Gongju-si", name: "공주시" },
        { value: "Asan-si", name: "아산시" },
        { value: "Boryeong-si", name: "보령시" },
        { value: "Seosan-si", name: "서산시" },
        { value: "Nonsan-si", name: "논산시" },
        { value: "Gyeryong-si", name: "계룡시" },
        { value: "Dangjin-si", name: "당진시" },
        { value: "Buyeo-gun", name: "부여군" },
        { value: "Seocheon-gun", name: "서천군" },
        { value: "Cheongyang-gun", name: "청양군" },
        { value: "Hongseong-gun", name: "홍성군" },
        { value: "Yesan-gun", name: "예산군" },
        { value: "Taean-gun", name: "태안군" },
        { value: "Geumsan-gun", name: "금산군" },
      ]);
    else if (state === "Jeonbuk")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "Jeonju-si", name: "전주시" },
        { value: "Gunsan-si", name: "군산시" },
        { value: "Iksan-si", name: "익산시" },
        { value: "Jeongeup-si", name: "정읍시" },
        { value: "Namwon-si", name: "남원시" },
        { value: "Gimje-si", name: "김제시" },
        { value: "Wanju-gun", name: "완주군" },
        { value: "Jinan-gun", name: "진안군" },
        { value: "Muju-gun", name: "무주군" },
        { value: "Jangsu-gun", name: "장수군" },
        { value: "Imsil-gun", name: "임실군" },
        { value: "Sunchang-gun", name: "순창군" },
        { value: "Gochang-gun", name: "고창군" },
        { value: "Buan-gun", name: "부안군" },
      ]);
    else if (state === "Jeonnam")
      setCityList([
        { value: "default", name: "시/군/구" },
        { value: "Mokpo-si", name: "목포시" },
        { value: "Yeosu-si", name: "여수시" },
        { value: "Suncheon-si", name: "순천시" },
        { value: "Naju-si", name: "나주시" },
        { value: "Gwangyang-si", name: "광양시" },
        { value: "Damyang-gun", name: "담양군" },
        { value: "Gokseong-gun", name: "곡성군" },
        { value: "Gurye-gun", name: "구례군" },
        { value: "Goheung-gun", name: "고흥군" },
        { value: "Boseong-gun", name: "보성군" },
        { value: "Hwasun-gun", name: "화순군" },
        { value: "Jangheung-gun", name: "장흥군" },
        { value: "Gangjin-gun", name: "강진군" },
        { value: "Haenam-gun", name: "해남군" },
        { value: "Yeongam-gun", name: "영암군" },
        { value: "Muan-gun", name: "무안군" },
        { value: "Hampyeong-gun", name: "함평군" },
        { value: "Yeonggwang-gun", name: "영광군" },
        { value: "Jangseong-gun", name: "장성군" },
        { value: "Wando-gun", name: "완도군" },
        { value: "Jindo-gun", name: "진도군" },
        { value: "Sinan-gun", name: "신안군" },
      ]);
    else if (state === "Gyeongbuk")
      setCityList([
        { value: "default", name: "시/군/구" },
        { value: "Pohang-si", name: "포항시" },
        { value: "Andong-si", name: "안동시" },
        { value: "Gumi-si", name: "구미시" },
        { value: "Gyeongju-si", name: "경주시" },
        { value: "Gyeongsan-si", name: "경산시" },
        { value: "Yeongju-si", name: "영주시" },
        { value: "Yeongcheon-si", name: "영천시" },
        { value: "Sangju-si", name: "상주시" },
        { value: "Mungyeong-si", name: "문경시" },
        { value: "Gimcheon-si", name: "김천시" },
        { value: "Chilgok-gun", name: "칠곡군" },
        { value: "Uiseong-gun", name: "의성군" },
        { value: "Seongju-gun", name: "성주군" },
        { value: "Goryeong-gun", name: "고령군" },
        { value: "Yecheon-gun", name: "예천군" },
        { value: "Bonghwa-gun", name: "봉화군" },
        { value: "Uljin-gun", name: "울진군" },
        { value: "Yeongdeok-gun", name: "영덕군" },
        { value: "Cheongsong-gun", name: "청송군" },
        { value: "Yeongyang-gun", name: "영양군" },
        { value: "Gunwi-gun", name: "군위군" },
        { value: "Cheongdo-gun", name: "청도군" },
        { value: "Ulleung-gun", name: "울릉군" },
      ]);
    else if (state === "Gyeongnam")
      setCityList([
        { value: "default", name: "시/군/구" },
        { value: "Changwon-si", name: "창원시" },
        { value: "Jinju-si", name: "진주시" },
        { value: "Sacheon-si", name: "사천시" },
        { value: "Gimhae-si", name: "김해시" },
        { value: "Miryang-si", name: "밀양시" },
        { value: "Yangsan-si", name: "양산시" },
        { value: "Tongyeong-si", name: "통영시" },
        { value: "Geoje-si", name: "거제시" },
        { value: "Haman-gun", name: "함안군" },
        { value: "Changnyeong-gun", name: "창녕군" },
        { value: "Uiryeong-gun", name: "의령군" },
        { value: "Goseong-gun", name: "고성군" },
        { value: "Namhae-gun", name: "남해군" },
        { value: "Sancheong-gun", name: "산청군" },
        { value: "Hapcheon-gun", name: "합천군" },
        { value: "Geochang-gun", name: "거창군" },
        { value: "Hamyang-gun", name: "함양군" },
        { value: "Hadong-gun", name: "하동군" },
      ]);
    else if (state === "Jeju")
      setCityList([
        { value: "default", name: "시/군/구" },
        { value: "Jeju-si", name: "제주시" },
        { value: "Seogwipo-si", name: "서귀포시" },
      ]);
  }, [state]);

  //지역을 설정
  const handleChangeState = (e) => {
    setState(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  // 비밀번호 보이기/숨기기 선택
  const [pwdType, setPwdType] = useState({
    type: "password",
    visible: false,
  });
  const [pwdType2, setPwdType2] = useState({
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
  const handlePwdType2 = (e) => {
    setPwdType2(() => {
      if (!pwdType2.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  useEffect(() => {
    setAddress(state + " " + city);
  }, [state, city]);

  // 회원가입
  async function registerUser() {
    await axios
      .post("/muleoba/signup", {
        email: email,
        password: password,
        name: name,
        nickName: nickName,
        phoneNumber: phoneNumber,
        address: address,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === 1) {
          // 로그인 페이지로 이동
          closeModal(false);
          loginModal(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 닉네임 중복확인
  const onChangeNickName = useCallback((e) => {
    const nickNameCurrent = e.target.value;
    setNickName(nickNameCurrent);
  });

  useEffect(() => {
    if (nickName) {
      checkNickName();
    }
  }, [nickName]);

  useEffect(() => {
    if (!isNickname) {
      setNicknameMsg("중복된 닉네임입니다.");
    } else {
      setNicknameMsg("");
    }
  }, [isNickname]);

  // 닉네임 중복확인
  async function checkNickName() {
    await axios
      .get("/muleoba/check/nickname", {
        params: { nickName },
      })
      .then((response) => {
        console.log(response.data);
        setIsNickname(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMsg("이메일은 123@muleoba.com 과 같은 형식으로 적어주세요.");
      setIsEmail(false);
    } else {
      checkEmail();
    }
  });

  useEffect(() => {
    if (email.length > 6) {
      checkEmail();
    }
  }, [email]);

  // 이메일 중복확인
  async function checkEmail() {
    await axios
      .get("/muleoba/check/email", {
        params: { email },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setIsEmail(response.data);
          setEmailMsg("");
        } else {
          setEmailMsg("존재하는 이메일입니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="signupModal_background">
      <div className="signupModal_container">
        <div className="signupModal_logoBox">
          <div className="signupModal_logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="modal_closeBtn">
            <button
              onClick={() => {
                closeModal(false);
              }}
            >
              X
            </button>
          </div>
        </div>

        <div className="signupModal_title">
          <h1>회원가입</h1>
        </div>
        <div className="signupModal_body">
          <div className="signupModal_emailinput">
            <input
              type="email"
              placeholder="이메일"
              autoFocus
              value={email}
              onChange={onChangeEmail}
            />
            {email && <span className="signupModal_error">{emailMsg}</span>}
          </div>
          <div className="signupModal_pwdinput">
            <input
              type={pwdType.type}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span onClick={handlePwdType} className="signupModal_pwdIconCover">
              {pwdType.visible ? (
                <FaEye className="signupModal_pwdIcon" />
              ) : (
                <FaEyeSlash className="signupModal_pwdIcon" />
              )}
            </span>
          </div>
          <div className="signupModal_pwdinput">
            <input
              type={pwdType2.type}
              placeholder="비밀번호 확인"
              value={pw2}
              onChange={onChangePw}
            />
            <span onClick={handlePwdType2} className="signupModal_pwdIconCover">
              {pwdType2.visible ? (
                <FaEye className="signupModal_pwdIcon" />
              ) : (
                <FaEyeSlash className="signupModal_pwdIcon" />
              )}
            </span>
          </div>
          <div className="signupModal_pwdinput">
            {pw2 && <span className="signupModal_error">{pwMsg}</span>}
          </div>
          <div className="signupModal_emailinput">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="signupModal_emailinput">
            <input
              type="text"
              placeholder="닉네임"
              value={nickName}
              onChange={onChangeNickName}
            />
            {nickName && (
              <span className="signupModal_error">{nicknameMsg}</span>
            )}
          </div>
          <div className="signupModal_emailinput">
            <input
              type="text"
              placeholder="핸드폰번호"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div className="signupModal_selectbox">
            <SelectBox
              address={data.states}
              defaultValue={false}
              handleChangeState={handleChangeState}
            />
            <SelectBox
              address={cityList}
              defaultValue={false}
              handleChangeState={handleChangeCity}
            />
          </div>
        </div>
        <div
          className={
            !(
              isEmail &&
              isPw &&
              name &&
              isNickname &&
              state &&
              city &&
              phoneNumber
            )
              ? "signupModal_disabled"
              : "signupModal_btn"
          }
        >
          <button
            type="submit"
            onClick={registerUser}
            disabled={
              !(
                isEmail &&
                isPw &&
                name &&
                isNickname &&
                city &&
                state &&
                phoneNumber
              )
            }
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
