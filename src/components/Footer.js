import React, {useState, useEffect, useRef} from "react";
import "../css/Footer.css";
import "../Main.css";
import logo from "../image/muleoba_logo.png";




export default function Footer(){

  return (
    <div className="footer_box">
      <div className="footer">
        <div className="footer_logo_box">
            <img src={logo} className="footer_logo"/>
          </div>

      </div>
    </div>
  );
};