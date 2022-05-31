import {  BrowserRouter as Router, Routes, Route, NavLink, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "../css/Mypage.css";

export default function Mychangelist() {

    return (
        <div className="mylist">
            나의 교환신청 리스트
        </div>
    );
};