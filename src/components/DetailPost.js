import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegHandPaper } from "react-icons/fa";
import "../css/Mypage.css";
import "../css/Detailpost.css";
import {uID} from "../redux/idReducer";

export default function DetailPost() {
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
                    <div className="detailpost_Photo">
                        
                    </div>
                </div>
            </div>












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
                                                <FaRegHandPaper className="detailpost_detail_requesticon"/>
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