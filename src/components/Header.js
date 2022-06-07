import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "../css/Header.css";
import "../css/Main.css";
import logo from "../image/muleoba_logo.png";
import {
  FaBell,
  FaBars,
  FaSearch,
  FaTrophy,
  FaWindowClose,
} from "react-icons/fa";
import { setPosts } from "../redux/Action";
import { connect } from "react-redux";
import { uID } from "../redux/idReducer";

const mapDispatchToProps = (dispatch) => {
  return {
    setPosts: (search) => dispatch(setPosts(search)),
  };
};

function Header({ setPosts }) {
  const uID = useSelector((state) => state.idReducer.uID);

  //const alarmRef = useRef(null);
  const [alarm, setAlarm] = useState(false);
  const [inalarm, setInalarm] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [rank, setRank] = useState([]);
  const [input, setInput] = useState("");

  const modalRef = useRef();
  //const showSidebar = () => setSidebar(!sidebar);

  const onClickAlarmInform = (e) => {
    getAlarm();
  };

  async function searchHandler() {
    await axios
      .post("/muleoba/searchitem", {
        uID: uID,
        searchString: input,
      })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
        setInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getAlarm() {
    await axios
      .post("/muleoba/get/alarm/list", {
        uID: uID,
      })
      .then((response) => {
        setInalarm(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*거래 최다 닉네임 랭킹*/
  async function fetchRank() {
    await axios
      .get("/muleoba/bestuser")
      .then((response) => {
        setRank(response.data);
        console.log(response.data);
        console.log(uID);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function onClickisRead(alarmNum) {
    await axios
      .get("/muleoba/alarm/isRead", { params: { alarmNum } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function onClickAlarmAlldelete() {
    await axios
      .get("/muleoba/alarm/alldelete", { params: { uID } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function onClickAlarmSelectdelete() {
    await axios
      .get("/muleoba/alarm/selectdelete", { params: { uID } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAlarm();
    fetchRank();
    var i = 1;

    window.setInterval(function () {
      document.getElementById(
        "header_ranking_textbox"
      ).style.transitionDuration = "400ms";
      document.getElementById("header_ranking_textbox").style.marginTop =
        i * -2.19 + "em";

      i++;
      i %= 5;
    }, 2500);
  }, []);

  /*외부영역 클릭 감지*/
  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);
    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (e) => {
    headerMenu(e);
    var target = e.target;

    if (target == e.currentTarget.querySelector(".header_alarm_box")) {
      return;
    }
    var divtags = e.currentTarget
      .querySelector(".header_alarm_box")
      .querySelectorAll("div");
    for (var i = 0; i < divtags.length; i++) {
      if (divtags[i] == target) {
        return;
      }
    }
    setAlarm(false);
  };

  const headerMenu = (e) => {
    var target = e.target;

    if (target == e.currentTarget.querySelector(".header_sideMenu")) {
      return;
    }
    var menudivtags = e.currentTarget
      .querySelector(".header_sideMenu")
      .querySelectorAll("div");
    for (var i = 0; i < menudivtags.length; i++) {
      if (menudivtags[i] == target) {
        return;
      }
    }
    setSidebar(false);
  };

  function changeText(e) {
    e.preventDefault();
    setInput(e.target.value);
    console.log(input);
  }

  function onKeyPress(e) {
    if (e.key == "Enter") {
      searchHandler();
    }
  }

  return (
    <div className="header">
      <div className="container ">
        <div className="header_flex">
          <div className="header_left">
            <div className="header_logo_box">
              <NavLink to="/main">
                <img src={logo} className="header_logo" />
              </NavLink>
            </div>
            <div className="header_searchBar">
              <input
                type="text"
                required={true}
                value={input}
                onKeyPress={onKeyPress}
                onChange={changeText}
                placeholder="물품 검색"
              />
              <div onClick={() => searchHandler()}>
                <FaSearch className="header_searchIcon" />
              </div>
            </div>
          </div>
          <div className="header_right">
            <div className="header_ranking">
              <div className="header_rankingIcon">
                <FaTrophy className="header_ranking_icon" />
              </div>
              <div className="header_ranking_box">
                {rank
                  ? rank.map((rank, index) => {
                      return (
                        <div
                          className="header_ranking_textbox"
                          id="header_ranking_textbox"
                          key={rank}
                        >
                          <div className="header_rankingNumber">
                            {index + 1}
                          </div>
                          <div className="header_rankingNickname">
                            <div className="header_rank">{rank}</div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="header_bell" onClick={() => setAlarm(!alarm)}>
              <FaBell className="header_bellIcon" />
            </div>
            <div className="header_menuBar">
              <FaBars
                className="header_barIcon"
                onClick={() => setSidebar(!sidebar)}
              />
            </div>
          </div>
        </div>
        <div className="header_alarm_bar">
          {alarm ? (
            <div>
              <div
                className="header_alarm_box"
                onClick={() => onClickAlarmInform()}
              >
                <div className="header_alarm_header">
                  <div className="header_alarm_header_left">전체알림</div>
                  <div className="header_alarm_header_right">
                    <div
                      className="header_alarm_header_delete"
                      onClick={() => onClickAlarmAlldelete()}
                    >
                      전체삭제
                    </div>
                    |
                    <div
                      className="header_alarm_header_delete"
                      onClick={() => onClickAlarmSelectdelete()}
                    >
                      읽은 알림 삭제
                    </div>
                  </div>
                </div>
                <div className="header_alarm_inner">
                  {inalarm
                    ? inalarm.map((inalarm, index) => {
                        return (
                          <div className="header_alarm_inner_box" key={index}>
                            {inalarm.isRead == true ? (
                              <div
                                onClick={() => onClickisRead(inalarm.alarmNum)}
                              >
                                <div className="header_alarm_inner_firstline">
                                  <div className="header_alarm_inner_title">
                                    거래요청
                                  </div>
                                  <div className="header_alarm_inner_my">
                                    나의
                                  </div>
                                  <div className="header_alarm_inner_myitem">
                                    {inalarm.itemName}
                                  </div>
                                </div>
                                <div className="header_alarm_inner_secondline">
                                  <div className="header_alarm_inner_applynickname">
                                    '{inalarm.requestNickName}'
                                  </div>
                                  <div className="header_alarm_inner_my">
                                    님의
                                  </div>
                                  <div className="header_alarm_inner_applyitem">
                                    {inalarm.requestItem}
                                  </div>
                                  <div className="header_alarm_inner_date">
                                    | {inalarm.timeAl}
                                  </div>
                                </div>
                                <hr />
                              </div>
                            ) : (
                              <div className="header_alarm_isread">
                                <div className="header_alarm_inner_firstline">
                                  <div className="header_alarm_inner_title">
                                    거래요청
                                  </div>
                                  <div className="header_alarm_inner_my_isread">
                                    나의
                                  </div>
                                  <div className="header_alarm_inner_myitem">
                                    {inalarm.itemName}
                                  </div>
                                </div>
                                <div className="header_alarm_inner_secondline">
                                  <div className="header_alarm_inner_applynickname_isread">
                                    '{inalarm.requestNickName}'
                                  </div>
                                  <div className="header_alarm_inner_my_isread">
                                    님의
                                  </div>
                                  <div className="header_alarm_inner_applyitem_isread">
                                    {inalarm.requestItem}
                                  </div>
                                  <div className="header_alarm_inner_date_isread">
                                    | {inalarm.timeAl}
                                  </div>
                                </div>
                                <hr />
                              </div>
                            )}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <nav className={sidebar ? "header_sideMenu active" : "header_sideMenu"}>
        <div className="header_sideMenu_items">
          <div className="header_sideMenu_toggle">
            <FaWindowClose
              className="header_closeIcon"
              onClick={() => setSidebar(!sidebar)}
            />
          </div>
          <div className="header_sideMenu_text">
            <NavLink to="/main" onClick={() => setSidebar(!sidebar)}>
              <div>Main</div>
            </NavLink>
          </div>
          <div className="header_sideMenu_text">
            <NavLink
              to="/main/mypage/mylist"
              onClick={() => setSidebar(!sidebar)}
            >
              <div>마이페이지</div>
            </NavLink>
          </div>

          <div className="header_sideMenu_text">
            <NavLink to="/" onClick={() => setSidebar(!sidebar)}>
              <div>로그아웃</div>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Header);
