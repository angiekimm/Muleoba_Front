import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';
import "../css/Header.css";
import "../css/Main.css";
import logo from "../image/muleoba_logo.png";
import { FaBell, FaBars, FaSearch, FaTrophy, FaWindowClose } from "react-icons/fa";




export default function Header() {

  const uID = useSelector((state) => state.uID);
  //const alarmRef = useRef(null);
  const [alarm, setAlarm] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [rank, setRank] = useState([])

  const modalRef = useRef();

  //const showSidebar = () => setSidebar(!sidebar);



  const onClickAlarmInform = (e) => {
    getAlarm();
  };

  async function getAlarm() {
    await axios
      .get("/muleoba/alarm")
      .then((response) => {

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /*거래 최다 닉네임 랭킹*/
  async function fetchRank() {
    await axios
      .get("/muleoba/bestuser")
      .then((response) => {
        setRank(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchRank();
    var i = 1;

    window.setInterval(function () {
      document.getElementById("header_ranking_textbox").style.transitionDuration = "400ms";
      document.getElementById("header_ranking_textbox").style.marginTop = (i * -2.19) + "em";

      i++;
      i %= 5;

    }, 2500);
  }, [])

  /*외부영역 클릭 감지*/
  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);
      return () => {
      document.removeEventListener('mousedown', clickModalOutside);
    };
  });

  const clickModalOutside = e => {
    headerMenu(e);
    var target = e.target;

    if (target == e.currentTarget.querySelector('.header_alarm_box')) {
      return;
    }
    var divtags = e.currentTarget.querySelector('.header_alarm_box').querySelectorAll('div');
    for (var i = 0; i < divtags.length; i++) {
      if (divtags[i] == target) {
        return;
      }
    }
    setAlarm(false);
  };

  const headerMenu = e => {
    var target = e.target;

    if (target == e.currentTarget.querySelector('.header_sideMenu')) {
      return;
    }
    var menudivtags = e.currentTarget.querySelector('.header_sideMenu').querySelectorAll("div");
    for (var i = 0; i < menudivtags.length; i++) {
      if (menudivtags[i] == target) {
        return;
      }
    }
    setSidebar(false);
  };


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
              <input type="text" placeholder="물품 검색" />
              <FaSearch className="header_searchIcon" />
            </div>
          </div>
          <div className="header_right">
            <div className="header_ranking">
              <div className="header_rankingIcon">
                <FaTrophy className="header_ranking_icon" />
              </div>
              <div className="header_ranking_box"  >
                {
                  rank
                    ? rank.map((rank, index) => {
                      return (
                        <div className="header_ranking_textbox" id="header_ranking_textbox" key={rank}>
                          <div className="header_rankingNumber">{index + 1}</div>
                          <div className="header_rankingNickname">
                            <div className="header_rank">
                              {rank}
                            </div>
                          </div>
                        </div>
                      )
                    })
                    : null
                }
              </div>
            </div>
            <div className="header_bell" onClick={() => setAlarm(!alarm)} >
              <FaBell className="header_bellIcon" />
            </div>
            <div className="header_menuBar">
              <FaBars className="header_barIcon" onClick={() => setSidebar(!sidebar)} />
            </div>
          </div>
        </div>
        <div className="header_alarm_bar">
          {
            alarm ?
              <div>
                <div className="header_alarm_box" onClick={() => onClickAlarmInform()}>

                  <div className="header_alarm_header">
                    <div className="header_alarm_header_left">
                      전체알림
                    </div>
                    <div className="header_alarm_header_right">
                      <div className="header_alarm_header_delete">
                        전체삭제
                      </div>
                      |
                      <div className="header_alarm_header_delete">
                        읽은 알림 삭제
                      </div>
                    </div>
                  </div>
                  <div className="header_alarm_inner">
                    알람
                  </div>
                </div>
              </div>
              : null
          }
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
            <NavLink to="/" onClick={() => setSidebar(!sidebar)}>
              <div>Home</div>
            </NavLink>
          </div>
          <div className="header_sideMenu_text">
            <NavLink to="/main/mypage/mylist" onClick={() => setSidebar(!sidebar)}>
              <div>마이페이지</div>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
