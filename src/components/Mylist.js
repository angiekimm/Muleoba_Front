import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaRegHandPaper } from "react-icons/fa";
import "../css/Mypage.css";
import "../css/Mylist.css";
import { uID } from "../redux/idReducer";

export default function Mylist() {
  const uID = useSelector((state) => state.idReducer.uID);

  const [lists, setLists] = useState([]);
  const [pages, setPages] = useState(9);
  const [itemcount, setItemcount] = useState(0);

  useEffect(() => {
    getList();
  }, [uID, pages]);

  async function getList() {
    await axios
      .get("/muleoba/mylist", { params: { uID } })
      .then((response) => {
        setLists(response.data.slice(0, pages));
        setItemcount(response.data.length);
        console.log(pages);
        console.log(uID);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onClickPlusPage = (e) => {
    console.log(pages);
    setPages(pages + 9);
    getList();
  };

  return (
    <div className="mylist">
      <div className="mylist_content">
        {lists
          ? lists.map((list, index) => {
              let first_photo = list.photo.split(" ");
              let address = "/img/" + first_photo[0];
              return (
                <NavLink
                  to={`/main/detail/${list.iid}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="mylist_detailbox" key={list.item}>
                    <div className="mylist_detail">
                      <div className="mylist_detail_photo">
                        <img src={address} />
                      </div>
                      <div className="mylist_detail_text">
                        <div className="mylist_detail_cate">
                          {list.category}
                        </div>
                        <div className="mylist_detail_item">{list.item}</div>
                      </div>
                      <div className="mylist_detail_requestnum_box">
                        <div className="mylist_detail_requestnum">
                          <FaRegHandPaper className="mylist_detail_requesticon" />
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
      {itemcount == 0 ? null : itemcount / pages > 1 ? (
        <div
          className="detailpost_plus_box"
          onClick={(e) => onClickPlusPage(e)}
        >
          더보기
        </div>
      ) : (
        <div className="mainlist_plus_box_not">더 이상 물품이 없습니다.</div>
      )}
    </div>
  );
}
