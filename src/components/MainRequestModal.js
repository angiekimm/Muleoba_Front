import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../image/muleoba_logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/RequestModal.css";


export default function MainRequestModal({ closeModal, iid}) {

  console.log(iid);
  const uID = useSelector((state) => state.idReducer.uID);

  const navigate = useNavigate();

  const [requestiid, setRequestiid] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getList();
  }, [uID]);

  async function getList() {
    await axios
      .get("/muleoba/mylist", { params: { uID } })
      .then((response) => {
        setLists(response.data);
        console.log(uID);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function onClickRequest() {
    await axios
      .get("/muleoba/requestmodal", { params: { uID, requestiid, iid } })
      .then((response) => {
        toast.success("신청 완료!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        window.setTimeout(() => {
          navigate("/main");
        }, 1000);
        console.log(uID);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onChangeCate = (e) => {
    setRequestiid(e.target.value === "전체" ? null : e.target.value);
    console.log("박스value"+e.target.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);
    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (e) => {
    var target = e.target;

    if (target == e.currentTarget.querySelector(".modal_background")) {
      closeModal(false);
      return;
    }
  };


  return (
    <div className="request_modal_background">
      <ToastContainer className="request_Toastify__toast-container" theme="dark" />
      <div className="request_modal_container">
        <div className="request_modal_closeBtn">
          <button onClick={() => { closeModal(false); }}>
            X
          </button>
        </div>
        <div className="request_modal_logo">
          <img src={logo} />
        </div>
        <div className="request_modal_title">
          <h2>교환신청할 아이템을 선택하세요.</h2>
        </div>
        <div className="request_modal_body">
          <select className="request_modal_cate" onChange={(e) => onChangeCate(e)}>
            <option>전체</option>
            {lists
              ? lists.map((list) => {
                return (
                  <option value={list.iid}>{list.item}</option>
                );
              })
              : null}
          </select>
        </div>
        <div onClick={() => onClickRequest()} className={!(requestiid) ? "request_modal_disabled" : "request_modal_btn"}>
          <button disabled={!(requestiid)}>
            교환신청
          </button>
        </div>
      </div>
    </div>
  );
}


