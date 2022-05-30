import React, {useState, useEffect, useRef} from "react";
import "../css/Header.css";
import "../Main.css";
import logo from "../image/muleoba_logo.png";
import { FaBell, FaBars, FaSearch } from "react-icons/fa";




export default function Header(){
  const [alarm, setAalarm] = useState(false);

  function onClickalarm(){
    setAalarm(true);
  }

  return (
    <div className="header">
      <div className="container ">
        <div className="header_flex">
        <div className="header_left">
          <div className="header_logo_box">
            <img src={logo} className="header_logo"/>
          </div>
          <div className="header_searchBar">
            <input type="text" placeholder="물품 검색" />
            <FaSearch className="header_searchIcon" />
          </div>
        </div>
        <div className="header_right">
          <div className="header_ranking">
            <div className="header_rankingNumber">3</div>
            <div className="header_rankingNickname">의왕시피바다</div>
          </div>
          <div className="header_bell">
            <FaBell className="header_bellIcon" onClick={() => setAalarm(!alarm)}/>
          </div>
          <div className="header_menuBar">
            <FaBars className="header_barIcon" />
          </div>
        </div>
        </div>
        <div className="header_alarm_bar">
          {
              alarm ?
              <div>
              <div className="header_alarm_arrow"></div>
              <div className="header_alarm_box">알람</div>
              </div>
              :null
            }
        </div>    
      </div>
    </div>
  );
};
