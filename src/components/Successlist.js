import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegHandPaper } from "react-icons/fa";
import logo from "../image/muleoba_success_logo.png";
import "../css/Mypage.css";
import "../css/Successlist.css";
import { uID } from "../redux/idReducer";

export default function Successlist() {
    const uID = useSelector((state) => state.idReducer.uID);

    const [lists, setLists] = useState([]);
    const [pages, setPages] = useState(9);
    const [itemcount, setItemcount] = useState(0);

    useEffect(() => {
        getList();
    }, [uID, pages]);

    async function getList() {
        await axios
            .get("/muleoba/successlist", { params: { uID } })
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
                            let first_photo = list.photo.split(" ");
                            let address = "/img/" + first_photo[0];
                            return (
                                <div className="successlist_detailbox" key={list.item}>
                                    <div className="successlist_detail">
                                        <div className="successlist_detail_photo">
                                            <img src={address} />
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