import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Mainlist from "./Mainlist";
import Mypage from "./Mypage";
import Item from "./Item";
import DetailPost from "./DetailPost";
import "../css/Header.css";
import "../css/Content.css";
import "../css/Main.css";
import ScrollToTop from "./ScrollToTop";

export default function Content() {
  return (
    <div className="white_content">
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Mainlist />} />
        <Route path="/mypage/*" element={<Mypage />} />
        <Route path="/item" element={<Item />} />
        <Route exact path="/detail/:iid" element={<DetailPost />} />
      </Routes>
    </div>
  );
}
