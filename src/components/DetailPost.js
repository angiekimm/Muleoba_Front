import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaRegHandPaper } from "react-icons/fa";
import "../css/Mypage.css";
import "../css/Detailpost.css";
import profile from "../image/profile.png";
import RequestModal from "../components/RequestModal";

export default function DetailPost() {

    const uID = useSelector((state) => state.idReducer.uID);

    const { iid } = useParams();
    console.log(iid);
    const [urliid, setUrliid] = useState(iid);
    console.log(urliid);
    const [items, setItems] = useState([]);
    const [lists, setLists] = useState([]);
    const [itemcount, setItemcount] = useState(0);
    const [pages, setPages] = useState(6);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getList();
        getItem();
    }, [uID, pages]);


    async function getItem() {
        await axios
            .get("/muleoba/detail", { params: { iid } })
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
            .get("/muleoba/detail/request", { params: { iid } })
            .then((response) => {
                setLists(response.data.slice(0, pages));
                setItemcount(response.data.length);
                console.log(pages);
                console.log(response.data);
                console.log(response.data.length);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function onClickPostDelete() {
        
            if(window.confirm('게시글을 삭제하시겠습니까?')){
                await axios
                .get("/muleoba/detail/deletepost", { params: { iid } })
                .then((response) => {
                console.log(response.data);
                alert("삭제완료");
                window.setTimeout(() => {
                    navigate("/main");
                }, 2000);
            })
            .catch((error) => {
                console.log(error)
            })
        
            }else{
                alert("취소되었습니다.");
            }
    }

    async function onClickAccept(iid) {
        console.log(iid);
        console.log(urliid);
        await axios
            .get("/muleoba/detail/accept", { params: { iid , urliid} })
            .then((response) => {
                console.log(response.data);
                alert("교환이 완료되었습니다.");
                window.setTimeout(() => {
                    navigate("/main/mypage/successlist");
                }, 1000);
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const onClickPlusPage = (e) => {
        console.log(pages);
        setPages(pages + 6);
        getList();
    };

    let address = "/img/" + items.photo;
    return (
        <div className="detailpost_box">
            <div className="detailpost_item_box">
                <div className="detailpost_item_cate">
                    ■ {items.category}
                </div>
                <div className="detailpost_item_Photo">
                    <img src={address} />
                </div>
                <div className="detailpost_item_Profile">
                    <div className="detailpost_Profile_Photo">
                        <img src={profile} className="detailpost_Profile_img" />
                    </div>
                    <div className="detailpost_item_Profile_text">
                        <div className="detailpost_item_nickname">
                            {items.nickName}님
                        </div>
                        <div className="detailpost_item_area">
                            {items.address}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="detailpost_item_title">
                    {items.item}
                </div>
                <div className="detailpost_item_content">
                    {items.content}
                </div>
                {
                    items.itemUid == uID ?
                        <div className="detailpost_item_request_box" >
                            <NavLink to={`/main/item/${items.iid}`} style={{ textDecoration: "none", color: "black" }} >
                                <div className="detailpost_item_edit">
                                    수정
                                </div>
                            </NavLink>
                            <div className="detailpost_item_delete" onClick={() => { onClickPostDelete() }}>
                                삭제
                            </div>
                        </div>
                        :
                        <div className="detailpost_item_request_box" >
                            <div className="detailpost_item_chat">
                                채팅
                            </div>
                            <div className="detailpost_item_request" onClick={() => { setOpenModal(true) }}>
                                <FaRegHandPaper className="detailpost_item_requesticon" />
                                교환신청
                            </div>
                        </div>
                }

            </div>


            <div className="detailpost">
                <div className="detailpost_detail_title">
                    <div className="detailpost_detail_title_text">
                        교환신청한 물품
                    </div>
                    <hr />
                </div>
                {lists.length == 0 ? <div className="detailpost_notpost">교환을 신청한 물품이 없습니다.</div> : null}
                <div className="detailpost_content" >
                    {
                        lists
                            ? lists.map((list) => {
                                let address = "/img/" + list.photo;
                                return (
                                    <div className="detailpost_detailbox" key={list.item}>
                                            <div className="detailpost_detail">
                                            <NavLink to={`/main/detail/${list.iid}`} style={{ textDecoration: "none", color: "black" }} >
                                                <div className="detailpost_detail_photo">
                                                    <img src={address} />
                                                </div>
                                                <div className="detailpost_detail_text">
                                                    <div className="detailpost_detail_cate">
                                                        {list.category}
                                                    </div>
                                                    <div className="detailpost_detail_item">
                                                        {list.item}
                                                    </div>
                                                </div>
                                                </NavLink>
                                                    {
                                                        items.itemUid == uID ? 
                                                        <div className="detailpost_detail_requestnum_box">
                                                        <div className="detailpost_detail_requestnum_uid">
                                                        <FaRegHandPaper className="detailpost_detail_requesticon_uid" />
                                                        {list.requestNum}
                                                        </div> 
                                                        <div className="detailpost_item_ok" onClick={() => { onClickAccept(list.iid) }}>
                                                            수 락
                                                        </div>
                                                        </div>
                                                        : 
                                                        <div className="detailpost_detail_requestnum_box">
                                                            <div className="detailpost_detail_requestnum">
                                                                <FaRegHandPaper className="detailpost_detail_requesticon" />
                                                                {list.requestNum}
                                                            </div>
                                                        </div>
                                                    }    
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
                            </div> : null
                }

            </div>


            {openModal && (
                <RequestModal closeModal={setOpenModal} />
            )}
        </div>
    );
};