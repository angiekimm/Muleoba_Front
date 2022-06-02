import {  BrowserRouter as Router, Routes, Route, NavLink, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Mylist from "./Mylist";
import Mychangelist from "./Mychangelist";
import Successlist from "./Successlist";
import "../css/Mypage.css";

export default function Mypage() {

    return (
        <div className="mypage">
            <div className="mypage_head">
                <NavLink to="/main/mypage/mylist" className="mypage_head_text">
                    <div className="mypage_head_text_action">
                    나의 물품
                    </div>
                </NavLink>
                <NavLink to="/main/mypage/mychangelist" className="mypage_head_text">
                    <div className="mypage_head_text_action">
                    나의 교환신청 물품
                    </div>
                </NavLink>
                <NavLink to="/main/mypage/successlist" className="mypage_head_text">
                    <div className="mypage_head_text_action">
                    교환완료 물품
                    </div>
                </NavLink>
            </div>
            <hr />

            <div className="mypage_content" >
                <Routes>
                  <Route exact path="/mylist" element={<Mylist />} />
                  <Route exact path="/mychangelist" element={<Mychangelist />} />
                  <Route exact path="/successlist" element={<Successlist />} />
                </Routes>
            </div>
        </div>
    );
};