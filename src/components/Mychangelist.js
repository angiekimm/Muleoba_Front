import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { FaRegHandPaper } from "react-icons/fa";
import "../css/Mypage.css";
import "../css/Mychangelist.css";
import { FaArrowCircleRight, FaTimes } from "react-icons/fa";
import { uID } from "../redux/idReducer";

export default function Mychangelist() {
    const uID = useSelector((state) => state.idReducer.uID);

    const [lists, setLists] = useState([]);
    const [responselists, setresponseLists] = useState([]);
    const [pages, setPages] = useState(4);
    const [itemcount, setItemcount] = useState(0);

    useEffect(() => {
        getList();
        getResponseList();
    }, [uID, pages]);

    async function getList() {
        await axios
            .get("/muleoba/requestid", { params: { uID } })
            .then((response) => {
                setLists(response.data.slice(0, pages));
                setItemcount(response.data.length);
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
                setItemcount(response.data.length);
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
                requestiID: requestiID,
                iID: iid
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
                                let address = "/img/" + list.photo;
                                return (
                                    <NavLink to={`/main/detail/${list.iid}`} style={{ textDecoration: "none", color: "black" }} >
                                        <div className="mychangelist_two_box">
                                            <div className="mychangelist_detailbox" key={list.item}>
                                                <div className="mychangelist_detail">
                                                    <div className="mychangelist_detail_photo">
                                                        <img src={address} />
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
                                    </NavLink>
                                )
                            })
                            : null
                    }

                </div>
                <div className="mychangelist_content_detail_two" >
                    {
                        responselists
                            ? responselists.map((list) => {
                                let address = "/img/" + list.photo;
                                return (
                                    <NavLink to={`/main/detail/${list.iid}`} style={{ textDecoration: "none", color: "black" }} >
                                        <div className="mychangelist_two_box">
                                            <div className="mychangelist_detailbox_two" key={list.item}>
                                                <div className="mychangelist_detail_two">
                                                    <div className="mychangelist_detail_photo_two">
                                                        <img src={address} />
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
                                                <div className="mychangelist_cancel_box_icon" onClick={() => CancelRequest(list.iid, list.requestiID)}>
                                                    <FaTimes className="mychangelist_cancel" />
                                                </div>
                                            </div>

                                        </div>
                                    </NavLink>
                                )
                            })
                            : null
                    }
                </div>
            </div>
            {
                itemcount == 0 ? null :
                    (itemcount / pages) > 1 ?
                        <div className="detailpost_plus_box" onClick={(e) => onClickPlusPage(e)}>
                            더보기
                        </div> :
                        <div className="mainlist_plus_box_not" >
                            더 이상 물품이 없습니다.
                        </div>
            }
        </div>
    );
};