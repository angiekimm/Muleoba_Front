import {  BrowserRouter as Router, Routes, Route, NavLink, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Mylist from "./Mylist.js";
import Mychangelist from "./Mychangelist";
import Successlist from "./Successlist";
import "../css/Mypage.css";

export default function Mypage() {

    return (
        <div className="mypage">
            <div className="mypage_head">
                <NavLink to="/mypage" className="mypage_head_text">
                    나의 물품
                </NavLink>
                <NavLink to="/mypage/mychangelist" className="mypage_head_text">
                    나의 교환신청 물품
                </NavLink>
                <NavLink to="/mypage/successlist" className="mypage_head_text">
                    교환완료 물품
                </NavLink>
            </div>
            <hr />

            <div className="mypage_content" >
                <Routes>
                  <Route path="/mypage" element={<Mylist />} />
                  <Route path="/mypage/mychangelist" element={<Mychangelist />} />
                  <Route path="/mypage/successlist" element={<Successlist />} />
                </Routes>
            </div>
        </div>
    );
};