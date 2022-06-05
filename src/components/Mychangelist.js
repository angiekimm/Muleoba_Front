import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegHandPaper } from "react-icons/fa";
import "../css/Mypage.css";
import "../css/Mychangelist.css";
import { FaArrowCircleRight, FaTimes } from "react-icons/fa";


export default function Mychangelist() {
    const uID = useSelector((state) => state.uID);

    const [lists, setLists] = useState([]);
    const [responselists, setresponseLists] = useState([]);
    const [pages, setPages] = useState(4);

    useEffect(() => {
        getList();
        getResponseList();
    }, [uID, pages]);

    async function getList() {
        await axios
            .get("/muleoba/requestid", { params: { uID } })
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

    async function getResponseList() {
        await axios
            .get("/muleoba/requestitem", { params: { uID } })
            .then((response) => {
                setresponseLists(response.data.slice(0, pages));
                console.log(pages);
                console.log(uID);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function CancelRequest(iid, requestiID) {
        await axios
            .post("/muleoba/requestcancel", {
                requestiID : requestiID,
                iID : iid
            })
            .then((response) => {
                console.log(response.data);
                getList();
                getResponseList();
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    const onClickPlusPage = (e) => {
        console.log(pages);
        setPages(pages + 4);
        getList();
    };

    
    

    return (
        <div className="mychangelist">
            <div className="mychangelist_content" >
                <div className="mychangelist_content_detail_one" >
                    {
                        lists
                            ? lists.map((list) => {
                                return (
                                    <div className="mychangelist_two_box">
                                        <div className="mychangelist_detailbox" key={list.item}>
                                            <div className="mychangelist_detail">
                                                <div className="mychangelist_detail_photo">
                                                </div>
                                                <div className="mychangelist_detail_text">
                                                    <div className="mychangelist_detail_cate">
                                                        {list.category}
                                                    </div>
                                                    <div className="mychangelist_detail_item">
                                                        {list.item}
                                                    </div>
                                                </div>
                                                <div className="mychangelist_detail_requestnum_box">
                                                    <div className="mychangelist_detail_requestnum">
                                                        <FaRegHandPaper className="mychangelist_detail_requesticon" />
                                                        {list.requestNum}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mychangelist_arrow_box">
                                            <FaArrowCircleRight className="mychangelist_arrow" />
                                        </div>
                                    </div>
                                )
                            })
                            : null
                    }

                </div>
                <div className="mychangelist_content_detail_two" >
                    {
                        responselists
                            ? responselists.map((list) => {
                                return (
                                    <div className="mychangelist_two_box">
                                        <div className="mychangelist_detailbox_two" key={list.item}>
                                            <div className="mychangelist_detail_two">
                                                <div className="mychangelist_detail_photo_two">
                                                </div>
                                                <div className="mychangelist_detail_text_two">
                                                    <div className="mychangelist_detail_cate_two">
                                                        {list.category}
                                                    </div>
                                                    <div className="mychangelist_detail_item_two">
                                                        {list.item}
                                                    </div>
                                                </div>
                                                <div className="mychangelist_detail_requestnum_box_two">
                                                    <div className="mychangelist_detail_requestnum_two">
                                                        <FaRegHandPaper className="mychangelist_detail_requesticon_two" />
                                                        {list.requestNum}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mychangelist_cancel_box">
                                        <div className="mychangelist_cancel_box_icon" onClick={() => CancelRequest( list.iid, list.requestiID)}>
                                            <FaTimes className="mychangelist_cancel" />
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                            : null
                    }
                </div>
            </div>
            <div className="mychangelist_plus_box" onClick={(e) => onClickPlusPage(e)}>
                더보기
            </div>
        </div>
    );
};