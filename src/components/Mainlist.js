import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../css/Mainlist.css";
import { FaRegHandPaper } from "react-icons/fa";

export default function Mainlist() {

    const uID = useSelector((state) => state.uID);

    const [lists, setLists] = useState([]);
    const [category, setCategory] = useState(null);
    const [user, setUser] = useState([]);

    useEffect(() => {
        getList();
        getUser();
    }, [uID, category]);

    async function getList() {
        await axios
            .get("/muleoba/mainList", { params: { uID, category } })
            .then((response) => {
                setLists(response.data);
                console.log(uID);
                console.log(category);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function getUser() {
        await axios
            .get("/muleoba/user", { params: { uID } })
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
                console.log(uID);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onChangeCate = (e) => {
        setCategory(
            e.target.value === '전체' ? null : e.target.value
        );
    };

    return (
        <div className="mainlist">
            <div className="mainlist_head">
                <div className="mainlist_head_title">
                    <div className="mainlist_head_text">
                        최신등록한 물품
                    </div>
                    <div className="mainlist_head_area">
                        {user.address}
                    </div>
                </div>
                <div className="mainlist_head_cate_box">
                    <select className="mainlist_head_cate" onChange={(e) => onChangeCate(e)}>
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
                    lists
                        ? lists.map((list) => {
                            return (
                                <div className="mainlist_detailbox" key={list.item}>
                                    <div className="mainlist_detail">
                                        <div className="mainlist_detail_photo">
                                        </div>
                                        <div className="mainlist_detail_text">
                                            <div className="mainlist_detail_cate">
                                                {list.category}
                                            </div>
                                            <div className="mainlist_detail_item">
                                                {list.item}
                                            </div>    
                                        </div>
                                        <div className="mainlist_detail_requestnum_box">
                                            <div className="mainlist_detail_requestnum">
                                                <FaRegHandPaper className="mainlist_detail_requesticon"/>
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
        </div>
    );
};