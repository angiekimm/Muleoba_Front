import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaRegHandPaper } from "react-icons/fa";
import "../css/Mypage.css";
import "../css/Detailpost.css";
import profile from "../image/profile.png";
import RequestModal from "../components/RequestModal";

export default function DetailPost() {
  const uID = useSelector((state) => state.idReducer.uID);

  const { iid } = useParams();
  console.log(iid);
  const [items, setItems] = useState([]);
  const [lists, setLists] = useState([]);
  const [itemcount, setItemcount] = useState(0);
  const [pages, setPages] = useState(6);
  const [openModal, setOpenModal] = useState(false);

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
        console.log(error);
      });
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
        console.log(error);
      });
  }

  async function onClickPostDelete() {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await axios
        .get("/muleoba/detail/request", { params: { iid } })
        .then((response) => {
          setLists(response.data.slice(0, pages));
          setItemcount(response.data.length);
          console.log(pages);
          console.log(response.data);
          console.log(response.data.length);
          alert("삭제완료");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("취소되었습니다.");
    }
  }

  const onClickPlusPage = (e) => {
    console.log(pages);
    setPages(pages + 6);
    getList();
  };

  //   console.log("items다!!!!", items);
  //   const photos = items.photo.split(" ");
  //   console.log(photos);
  //   let address = "/img/" + photos[0];
  
  let address = "/img/" + items.photo;
  return (
    <div className="detailpost_box">
      <div className="detailpost_item_box">
        <div className="detailpost_item_cate">■ {items.category}</div>
        <div className="detailpost_item_Photo">
          <img src={address} />
        </div>
        <div className="detailpost_item_Profile">
          <div className="detailpost_Profile_Photo">
            <img src={profile} className="detailpost_Profile_img" />
          </div>
          <div className="detailpost_item_Profile_text">
            <div className="detailpost_item_nickname">{items.nickName}님</div>
            <div className="detailpost_item_area">{items.address}</div>
          </div>
        </div>
        <hr />
        <div className="detailpost_item_title">{items.item}</div>
        <div className="detailpost_item_content">{items.content}</div>
        {items.itemUid == uID ? (
          <div className="detailpost_item_request_box">
            <NavLink
              to={`/main/item/${items.iid}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="detailpost_item_edit">수정</div>
            </NavLink>
            <div
              className="detailpost_item_delete"
              onClick={() => {
                onClickPostDelete();
              }}
            >
              삭제
            </div>
          </div>
        ) : (
          <div className="detailpost_item_request_box">
            <div className="detailpost_item_chat">채팅</div>
            <div
              className="detailpost_item_request"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <FaRegHandPaper className="detailpost_item_requesticon" />
              교환신청
            </div>
          </div>
        )}
      </div>

      <div className="detailpost">
        <div className="detailpost_detail_title">
          <div className="detailpost_detail_title_text">교환신청한 물품</div>
          <hr />
        </div>
        {lists.length == 0 ? (
          <div className="detailpost_notpost">
            교환을 신청한 물품이 없습니다.
          </div>
        ) : null}
        <div className="detailpost_content">
          {lists
            ? lists.map((list) => {
                let address = "/img/" + list.photo;
                return (
                  <NavLink
                    to={`/main/detail/${list.iid}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="detailpost_detailbox" key={list.item}>
                      <div className="detailpost_detail">
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
                        <div className="detailpost_detail_requestnum_box">
                          <div className="detailpost_detail_requestnum">
                            <FaRegHandPaper className="detailpost_detail_requesticon" />
                            {list.requestNum}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                );
              })
            : null}
        </div>
        {itemcount == 0 ? null : itemcount / pages >= 1 ? (
          <div
            className="detailpost_plus_box"
            onClick={(e) => onClickPlusPage(e)}
          >
            더보기
          </div>
        ) : null}
      </div>

      {openModal && <RequestModal closeModal={setOpenModal} />}
    </div>
  );
}
