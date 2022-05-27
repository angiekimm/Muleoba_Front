import React from "react";
import "../css/Header.css";
import "../Main.css";
import logo from "../image/muleoba_logo.png";
import { FaBell, FaBars, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <div className="container header_flex">
        <div className="header_left">
          <div className="header_logo">
            <img src={logo} />
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
            <FaBell className="header_bellIcon" />
          </div>
          <div className="header_menuBar">
            <FaBars className="header_barIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
