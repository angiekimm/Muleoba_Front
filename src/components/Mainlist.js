import React, { useState, useEffect, useRef } from "react";
import "../css/Mainlist.css";

export default function Mainlist() {

    return (
        <div className="mainlist">
            <div className="mainlist_head">
                <div className="mainlist_head_title">
                    <div className="mainlist_head_text">
                        최신등록한 물품
                    </div>
                    <div className="mainlist_head_area">
                        서울시 강남구
                    </div>
                </div>
                <div className="mainlist_head_cate_box">
                <select className="mainlist_head_cate">
                    <option>전체</option>
                    <option>패션의류/잡화</option>
                    <option>뷰티</option>
                    <option>출산/유아동</option>
                    <option>식품</option>
                    <option>주방용품</option>
                    <option>생활용품</option>
                    <option>홈인테리어</option>
                    <option>가전디지털</option>
                    <option>스포츠/레저</option>
                    <option>자동차용품</option>
                    <option>도서/음반/DVD</option>
                    <option>완구/취미</option>
                    <option>문구/오피스</option>
                    <option>반려동물용품</option>
                    <option>헬스/건강식품</option>
                </select>
                </div>
            </div>
            <hr />

            <div className="mainlist_content" >
                {

                }
            </div>
        </div>
    );
};