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
    setCity(false);
    if (state === "서울특별시")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "강남구", name: "강남구" },
        { value: "강동구", name: "강동구" },
        { value: "강북구", name: "강북구" },
        { value: "강서구", name: "강서구" },
        { value: "관악구", name: "관악구" },
        { value: "광진구", name: "광진구" },
        { value: "구로구", name: "구로구" },
        { value: "금천구", name: "금천구" },
        { value: "노원구", name: "노원구" },
        { value: "도봉구", name: "도봉구" },
        { value: "동대문구", name: "동대문구" },
        { value: "동작구", name: "동작구" },
        { value: "마포구", name: "마포구" },
        { value: "서대문구", name: "서대문구" },
        { value: "서초구", name: "서초구" },
        { value: "성동구", name: "성동구" },
        { value: "성북구", name: "성북구" },
        { value: "송파구", name: "송파구" },
        { value: "양천구", name: "양천구" },
        { value: "영등포구", name: "영등포구" },
        { value: "용산구", name: "용산구" },
        { value: "은평구", name: "은평구" },
        { value: "중구", name: "중구" },
        { value: "중랑구", name: "중랑구" },
      ]);
    else if (state === "부산광역시")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "강서구", name: "강서구" },
        { value: "금정구", name: "금정구" },
        { value: "남구", name: "남구" },
        { value: "동구", name: "동구" },
        { value: "동래구", name: "동래구" },
        { value: "부산진구", name: "부산진구" },
        { value: "북구", name: "북구" },
        { value: "사상구", name: "사상구" },
        { value: "사하구", name: "사하구" },
        { value: "서구", name: "서구" },
        { value: "수영구", name: "수영구" },
        { value: "연제구", name: "연제구" },
        { value: "영도구", name: "영도구" },
        { value: "중구", name: "중구" },
        { value: "해운대구", name: "해운대구" },
        { value: "기장군", name: "기장군" },
      ]);
    else if (state === "대구광역시")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "남구", name: "남구" },
        { value: "달서구", name: "달서구" },
        { value: "동구", name: "동구" },
        { value: "북구", name: "북구" },
        { value: "서구", name: "서구" },
        { value: "수성구", name: "수성구" },
        { value: "중구", name: "중구" },
        { value: "달성군", name: "달성군" },
      ]);
    else if (state === "인천광역시")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "계양구", name: "계양구" },
        { value: "남구", name: "남구" },
        { value: "남동구", name: "남동구" },
        { value: "동구", name: "동구" },
        { value: "부평구", name: "부평구" },
        { value: "서구", name: "서구" },
        { value: "연수구", name: "연수구" },
        { value: "중구", name: "중구" },
        { value: "강화군", name: "강화군" },
        { value: "옹진군", name: "옹진군" },
      ]);
    else if (state === "광주광역시")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "광산구", name: "광산구" },
        { value: "남구", name: "남구" },
        { value: "동구", name: "동구" },
        { value: "북구", name: "북구" },
        { value: "서구", name: "서구" },
      ]);
    else if (state === "대전광역시")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "대덕구", name: "대덕구" },
        { value: "동구", name: "동구" },
        { value: "서구", name: "서구" },
        { value: "유성구", name: "유성구" },
        { value: "중구", name: "중구" },
      ]);
    else if (state === "울산광역시")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "울주군", name: "울주군" },
        { value: "남구", name: "남구" },
        { value: "동구", name: "동구" },
        { value: "북구", name: "북구" },
        { value: "중구", name: "중구" },
      ]);
    else if (state === "세종특별자치시")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "세종시", name: "세종시" },
      ]);
    else if (state === "경기도")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "수원시", name: "수원시" },
        { value: "고양시", name: "고양시" },
        { value: "과천시", name: "과천시" },
        { value: "광명시", name: "광명시" },
        { value: "광주시", name: "광주시" },
        { value: "구리시", name: "구리시" },
        { value: "군포시", name: "군포시" },
        { value: "김포시", name: "김포시" },
        { value: "남양주시", name: "남양주시" },
        { value: "동두천시", name: "동두천시" },
        { value: "부천시", name: "부천시" },
        { value: "성남시", name: "성남시" },
        { value: "시흥시", name: "시흥시" },
        { value: "안산시", name: "안산시" },
        { value: "안성시", name: "안성시" },
        { value: "안양시", name: "안양시" },
        { value: "양주시", name: "양주시" },
        { value: "여주시", name: "여주시" },
        { value: "오산시", name: "오산시" },
        { value: "용인시", name: "용인시" },
        { value: "의왕시", name: "의왕시" },
        { value: "의정부시", name: "의정부시" },
        { value: "이천시", name: "이천시" },
        { value: "파주시", name: "파주시" },
        { value: "평택시", name: "평택시" },
        { value: "포천시", name: "포천시" },
        { value: "하남시", name: "하남시" },
        { value: "화성시", name: "화성시" },
        { value: "가평군", name: "가평군" },
        { value: "양평군", name: "양평군" },
        { value: "연천군", name: "연천군" },
      ]);
    else if (state === "강원도")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "춘천시", name: "춘천시" },
        { value: "강릉시", name: "강릉시" },
        { value: "동해시", name: "동해시" },
        { value: "삼척시", name: "삼척시" },
        { value: "속초시", name: "속초시" },
        { value: "원주시", name: "원주시" },
        { value: "태백시", name: "태백시" },
        { value: "고성군", name: "고성군" },
        { value: "양구군", name: "양구군" },
        { value: "양양군", name: "양양군" },
        { value: "영월군", name: "영월군" },
        { value: "인제군", name: "인제군" },
        { value: "정선군", name: "정선군" },
        { value: "철원군", name: "철원군" },
        { value: "평창군", name: "평창군" },
        { value: "홍천군", name: "홍천군" },
        { value: "화천군", name: "화천군" },
        { value: "횡성군", name: "횡성군" },
      ]);
    else if (state === "충청북도")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "청주시", name: "청주시" },
        { value: "제천시", name: "제천시" },
        { value: "충주시", name: "충주시" },
        { value: "괴산군", name: "괴산군" },
        { value: "단양군", name: "단양군" },
        { value: "보은군", name: "보은군" },
        { value: "영동군", name: "영동군" },
        { value: "옥천군", name: "옥천군" },
        { value: "증평군", name: "증평군" },
        { value: "진천군", name: "진천군" },
      ]);
    else if (state === "충청남도")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "천안시", name: "천안시" },
        { value: "공주시", name: "공주시" },
        { value: "아산시", name: "아산시" },
        { value: "보령시", name: "보령시" },
        { value: "서산시", name: "서산시" },
        { value: "논산시", name: "논산시" },
        { value: "계룡시", name: "계룡시" },
        { value: "당진시", name: "당진시" },
        { value: "부여군", name: "부여군" },
        { value: "서천군", name: "서천군" },
        { value: "청양군", name: "청양군" },
        { value: "홍성군", name: "홍성군" },
        { value: "예산군", name: "예산군" },
        { value: "태안군", name: "태안군" },
        { value: "금산군", name: "금산군" },
      ]);
    else if (state === "전라북도")
      setCityList([
        { value: false, name: "시/군/구" },
        { value: "전주시", name: "전주시" },
        { value: "군산시", name: "군산시" },
        { value: "익산시", name: "익산시" },
        { value: "정읍시", name: "정읍시" },
        { value: "남원시", name: "남원시" },
        { value: "김제시", name: "김제시" },
        { value: "완주군", name: "완주군" },
        { value: "진안군", name: "진안군" },
        { value: "무주군", name: "무주군" },
        { value: "장수군", name: "장수군" },
        { value: "임실군", name: "임실군" },
        { value: "순창군", name: "순창군" },
        { value: "고창군", name: "고창군" },
        { value: "부안군", name: "부안군" },
      ]);
    else if (state === "전라남도")
      setCityList([
        { value: "default", name: "시/군/구" },
        { value: "목포시", name: "목포시" },
        { value: "여수시", name: "여수시" },
        { value: "순천시", name: "순천시" },
        { value: "나주시", name: "나주시" },
        { value: "광양시", name: "광양시" },
        { value: "담양군", name: "담양군" },
        { value: "곡성군", name: "곡성군" },
        { value: "구례군", name: "구례군" },
        { value: "고흥군", name: "고흥군" },
        { value: "보성군", name: "보성군" },
        { value: "화순군", name: "화순군" },
        { value: "장흥군", name: "장흥군" },
        { value: "강진군", name: "강진군" },
        { value: "해남군", name: "해남군" },
        { value: "영암군", name: "영암군" },
        { value: "무안군", name: "무안군" },
        { value: "함평군", name: "함평군" },
        { value: "영광군", name: "영광군" },
        { value: "장성군", name: "장성군" },
        { value: "완도군", name: "완도군" },
        { value: "진도군", name: "진도군" },
        { value: "신안군", name: "신안군" },
      ]);
    else if (state === "경상북도")
      setCityList([
        { value: "default", name: "시/군/구" },
        { value: "포항시", name: "포항시" },
        { value: "안동시", name: "안동시" },
        { value: "구미시", name: "구미시" },
        { value: "경주시", name: "경주시" },
        { value: "경산시", name: "경산시" },
        { value: "영주시", name: "영주시" },
        { value: "영천시", name: "영천시" },
        { value: "상주시", name: "상주시" },
        { value: "문경시", name: "문경시" },
        { value: "김천시", name: "김천시" },
        { value: "칠곡군", name: "칠곡군" },
        { value: "의성군", name: "의성군" },
        { value: "성주군", name: "성주군" },
        { value: "고령군", name: "고령군" },
        { value: "예천군", name: "예천군" },
        { value: "봉화군", name: "봉화군" },
        { value: "울진군", name: "울진군" },
        { value: "영덕군", name: "영덕군" },
        { value: "청송군", name: "청송군" },
        { value: "영양군", name: "영양군" },
        { value: "군위군", name: "군위군" },
        { value: "청도군", name: "청도군" },
        { value: "울릉군", name: "울릉군" },
      ]);
    else if (state === "경상남도")
      setCityList([
        { value: "default", name: "시/군/구" },
        { value: "창원시", name: "창원시" },
        { value: "진주시", name: "진주시" },
        { value: "사천시", name: "사천시" },
        { value: "김해시", name: "김해시" },
        { value: "밀양시", name: "밀양시" },
        { value: "양산시", name: "양산시" },
        { value: "통영시", name: "통영시" },
        { value: "거제시", name: "거제시" },
        { value: "함안군", name: "함안군" },
        { value: "창녕군", name: "창녕군" },
        { value: "의령군", name: "의령군" },
        { value: "고성군", name: "고성군" },
        { value: "남해군", name: "남해군" },
        { value: "산청군", name: "산청군" },
        { value: "합천군", name: "합천군" },
        { value: "거창군", name: "거창군" },
        { value: "함양군", name: "함양군" },
        { value: "하동군", name: "하동군" },
      ]);
    else if (state === "제주특별자치도")
      setCityList([
        { value: "default", name: "시/군/구" },
        { value: "제주시", name: "제주시" },
        { value: "서귀포시", name: "서귀포시" },
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
    if (state && city) {
      setAddress(state + " " + city);
    }
  }, [city]);

  useEffect(() => {
    console.log(address);
  }, [address]);

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
