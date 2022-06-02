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
  
  
  //const showSidebar = () => setSidebar(!sidebar);

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

    window.setInterval(function(){
      document.getElementById("header_ranking_textbox").style.transitionDuration = "400ms";
      document.getElementById("header_ranking_textbox").style.marginTop = (i*-2.19) + "em";

      i++;
      i%=5;
      
    },2500);
  }, [])
  


/*   const newsTicker = (timer) => {
    const ranking = document.querySelector('.header_ranking_textbox');
  
    window.setInterval(() => {
      ranking.style.transitionDuration = "500ms";
      ranking.style.marginTop = "0px";
  
      window.setTimeout(() => {
        ranking.style.transitionDuration = "500ms";
        ranking.style.marginTop = "-137px";
        
        
      }, 800)
  
    }, timer)
  }
  
  newsTicker(2300); */



  /* 외부 영역을 클릭했을 때 알람창이 닫히도록 
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        alarmRef.current &&
        !alarmRef.current.contains(event.target)
      ) {
        setAlarm(false); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [alarmRef]);
*/
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
            <div className="header_bell">
              <FaBell className="header_bellIcon" onClick={() => setAlarm(!alarm)} />
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
                <div className="header_alarm_arrow"></div>
                <div className="header_alarm_box">알람</div>
              </div>
              : null
          }
        </div>
      </div>
      <nav className={sidebar ? "header_sideMenu active" : "header_sideMenu"}>
        <ul className="header_sideMenu_items">
          <li className="header_sideMenu_toggle">
              <FaWindowClose
                className="header_closeIcon"
                onClick={() => setSidebar(!sidebar)}
              />   
          </li>
          <li className="header_sideMenu_text">
            <NavLink to="/" onClick={() => setSidebar(!sidebar)}>
              Home
            </NavLink>
          </li>
          <li className="header_sideMenu_text">
            <NavLink to="/main/mypage/mylist" onClick={() => setSidebar(!sidebar)}>
              마이페이지
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
