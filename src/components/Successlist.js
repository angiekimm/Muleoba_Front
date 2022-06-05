import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegHandPaper } from "react-icons/fa";
import logo from "../image/muleoba_success_logo.png";
import "../css/Mypage.css";
import "../css/Successlist.css";

export default function Successlist() {
    const uID = useSelector((state) => state.uID);

    const [lists, setLists] = useState([]);
    const [pages, setPages] = useState(9);

    useEffect(() => {
        getList();
    }, [uID, pages]);

    async function getList() {
        await axios
            .get("/muleoba/successlist", { params: { uID } })
            .then((response) => {
                setLists(response.data.slice(0, pages));
                console.log(pages);
                console.log(uID);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onClickPlusPage = (e) => {
        console.log(pages);
        setPages(pages + 9);
        getList();
    };

    return (
        <div className="successlist">
            <div className="successlist_content" >
                {
                    lists
                        ? lists.map((list) => {
                            return (
                                <div className="successlist_detailbox" key={list.item}>
                                    <div className="successlist_detail">
                                        <div className="successlist_detail_photo">
                                        </div>
                                        <div className="successlist_detail_text">

                                            <div className="successlist_detail_cate">
                                                {list.category}
                                            </div>
                                            <div className="successlist_detail_item">
                                                {list.item}
                                            </div>
                                        </div>
                                        <div className="successlist_detail_requestnum_box">
                                            <div className="successlist_detail_requestnum">
                                                <FaRegHandPaper className="successlist_detail_requesticon" />
                                                {list.requestNum}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="successlist_detail_stamp_box">
                                        {/* <img src={logo} className="successlist_detail_stamp" /> */}
                                        <div className="successlist_detail_stamp">
                                            거래완료
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : null
                }
            </div>
            <div className="successlist_plus_box" onClick={(e) => onClickPlusPage(e)}>
                더보기
            </div>
        </div>
    );
};