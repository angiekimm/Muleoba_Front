import {  BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import Mainlist from "./Mainlist";
import Mypage from "./Mypage";
import "../css/Header.css";
import "../css/Content.css";
import "../css/Main.css";




export default function Content(){

  return (
    <div className="white_content">
      <Routes>
        <Route exact path="/" element={<Mainlist />}/>
        <Route path="/mypage/*" element={<Mypage />}/>
      </Routes>
    </div>
  );
};
