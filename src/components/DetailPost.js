import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaRegHandPaper } from "react-icons/fa";
import "../css/Mypage.css";
import "../css/Detailpost.css";

export default function DetailPost() {
  const uID = useSelector((state) => state.idReducer.uID);

  const { iid } = useParams();
  console.log(iid);
  const [items, setItems] = useState([]);
  const [lists, setLists] = useState([]);
  const [pages, setPages] = useState(6);

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
        console.log(pages);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onClickPlusPage = (e) => {
    console.log(pages);
    setPages(pages + 6);
    getList();
  };

  return (
    <div>
      <div className="detailpost_cate">■ {items.category}</div>
      <div className="detailpost_item_Photo"></div>
      <div className="detailpost_Profile">
        <div className="detailpost_Profile_Photo"></div>
        <div className="detailpost_Profile_line">
          <div className="detailpost_item_nickname">{items.nickName}</div>
          <div className="detailpost_item_area">{items.address}</div>
        </div>
      </div>
      <hr />
      <div className="detailpost_item_title">{items.item}</div>
      <div className="detailpost_item_content">{items.content}</div>

      <button>
        <NavLink
          to={{
            pathname: "/main/item",
            state: { iid: `${items.iid}` },
          }}
        >
          {items.iid}
        </NavLink>
      </button>

      <div className="detailpost">
        <div className="detailpost_content">
          {lists
            ? lists.map((list) => {
                return (
                  <div className="detailpost_detailbox" key={list.item}>
                    <div className="detailpost_detail">
                      <div className="detailpost_detail_photo"></div>
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
                );
              })
            : null}
        </div>
        <div
          className="detailpost_plus_box"
          onClick={(e) => onClickPlusPage(e)}
        >
          더보기
        </div>
      </div>
    </div>
  );
}
