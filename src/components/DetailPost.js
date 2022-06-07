import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegHandPaper } from "react-icons/fa";
import "../css/Mypage.css";
import "../css/Detailpost.css";
import { uID } from "../redux/idReducer";

export default function DetailPost() {
    const uID = useSelector((state) => state.idReducer.uID);

    const { iid } = useParams();
    console.log(iid);
    const [items, setItems] = useState([]);
    const [lists, setLists] = useState([]);
    const [pages, setPages] = useState(9);

    useEffect(() => {
        getList();
    }, [uID, pages]);


    useEffect(() => {
        getItem();
    }, []);

    async function getItem() {
        await axios
            .get("/muleoba/detail/" + iid)
            .then((response) => {
                setItems(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }


    async function getList() {
        await axios
            .get("/muleoba/mylist", { params: { uID } })
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
        <div>
            {
                items
                    ? items.map((item) => {
                        return (
                            <div>
                                <div className="detailpost_cate">
                                    ■ 생활가구
                                </div>
                                <div className="detailpost_Photo">

                                </div>
                                <div className="detailpost_Profile">
                                    <div className="detailpost_Profile_Photo">

                                    </div>
                                    <div className="detailpost_Profile_line">
                                        <div className="detailpost_nickname">
                                            옝꾸님
                                        </div>
                                        <div className="detailpost_area">
                                            경기도 의왕시
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="detailpost_title">

                                </div>
                                <div className="detailpost_content">

                                </div>
                            </div>
                        )
                    })
                    : null
            }










            <div className="detailpost">
                <div className="detailpost_content" >
                    {
                        lists
                            ? lists.map((list) => {
                                return (
                                    <div className="detailpost_detailbox" key={list.item}>
                                        <div className="detailpost_detail">
                                            <div className="detailpost_detail_photo">
                                            </div>
                                            <div className="detailpost_detail_text">
                                                <div className="detailpost_detail_cate">
                                                    {list.category}
                                                </div>
                                                <div className="detailpost_detail_item">
                                                    {list.item}
                                                </div>
                                            </div>
                                            <div className="detailpost_detail_requestnum_box">
                                                <div className="detailpost_detail_requestnum">
                                                    <FaRegHandPaper className="detailpost_detail_requesticon" />
                                                    {list.requestNum}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : null
                    }
                </div>
                <div className="detailpost_plus_box" onClick={(e) => onClickPlusPage(e)}>
                    더보기
                </div>
            </div>
        </div>
    );
};