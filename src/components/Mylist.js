import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegHandPaper } from "react-icons/fa";
import "../css/Mypage.css";
import "../css/Mylist.css";
import {uID} from "../redux/idReducer";

export default function Mylist() {
    const uID = useSelector((state) => state.idReducer.uID);

    const [lists, setLists] = useState([]);
    const [pages, setPages] = useState(9);

    useEffect(() => {
        getList();
    }, [uID,pages]);

    async function getList() {
        await axios
            .get("/muleoba/mylist", { params: { uID } })
            .then((response) => {
                setLists(response.data.slice(0,pages));
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
        <div className="mylist">
            <div className="mylist_content" >
                {
                    lists
                        ? lists.map((list) => {
                            return (
                                <div className="mylist_detailbox" key={list.item}>
                                    <div className="mylist_detail">
                                        <div className="mylist_detail_photo">
                                        </div>
                                        <div className="mylist_detail_text">
                                            <div className="mylist_detail_cate">
                                                {list.category}
                                            </div>
                                            <div className="mylist_detail_item">
                                                {list.item}
                                            </div>    
                                        </div>
                                        <div className="mylist_detail_requestnum_box">
                                            <div className="mylist_detail_requestnum">
                                                <FaRegHandPaper className="mylist_detail_requesticon"/>
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
            <div className="mylist_plus_box" onClick={(e) => onClickPlusPage(e)}>
                더보기
            </div>
        </div>
    );
};