import React, {useState, useEffect, useRef} from "react";
import "../css/Footer.css";
import "../Main.css";
import logo from "../image/muleoba_footer_logo.png";




export default function Footer(){

    return (
        <div className="footer_box">
            <div className="footer">
                <div className="footer_bold">
                    <div className="footer_logo_box">
                        <img src={logo} className="footer_logo" />
                    </div>
                    <div className="footer_boldtext">이용약관</div>
                    <div className="footer_boldtext">회사소개</div>
                </div>
                <hr />
                <div className="footer_light">
                    서울특별시 강남대로 00길 00, 1004호<br />
                    사업자 등록번호 1234567-7654321<br /><br />
                    Copyright ⓒ 2022 Muleoba All rights reserved.
                </div>

            </div>
        </div>
    );
};