import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/Item.css";
import SelectBox from "./SelectBox";
import data from "../db/data.json";
import { FaTrashAlt, FaCamera } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {uID} from "../redux/idReducer";

export default function Item() {
  const uID = useSelector((state) => state.idReducer.uID);

  const iID = "1";
  const naviate = useNavigate();

  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [content, setContent] = useState("");
  const [showImages, setShowImages] = useState([]);

  let formData = new FormData(); // formData 객체를 생성한다.

  // 이미지 업로드
  const handleAddImages = (e) => {
    const imageLists = e.target.files;
    let imageUrlLists = [];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }
    setShowImages(imageUrlLists);
  };

  // 게시물 등록
  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    // 이미지 저장
    let files = e.target.profile_files.files;
    const filesLength = files.length > 5 ? 5 : files.length;

    for (let i = 0; i < filesLength; i++) {
      formData.append("files", files[i]);
    }

    // 물품명, 카테고리, 글 저장
    let dataSet = {
      itemName: itemName,
      category: category,
      content: content,
      itemID: iID, // 수정할때
      // uId: uID,
    };
    formData.append(
      "data",
      new Blob([JSON.stringify(dataSet)], { type: "application/json" })
    ); // JSON 형식으로 파싱 후 추가

    for (let value of formData.values()) {
      console.log(value);
    }
    if (!iID) {
      const uploadItem = await axios({
        method: "POST",
        url: "/muleoba/uploadItem",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((response) => {
          console.log(response.data);
          toast.success("물품 등록 완료!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
          window.setTimeout(() => {
            naviate("/main/mypage/mylist");
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const updateItem = await axios({
        method: "POST",
        url: "/muleoba/updateItem",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((response) => {
          console.log(response.data);
          toast.success("물품 수정 완료!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
          window.setTimeout(() => {
            naviate("/main"); // 상세페이지로 이동
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // 카테고리 저장
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  // 카메라 이미지 클릭 시 파일 업로드 창 띄우기
  const selectFile = useRef("");

  // iId가 같이 넘어온다면 데이터 불러와서 보여주고, 없다면 등록페이지
  useEffect(() => {
    if (iID) {
      getItemInfo();
      // iId에 해당하는 사진, 내용을 불러오기
      async function getItemInfo() {
        await axios
          .get("/muleoba/getItem", {
            params: { iID },
          })
          .then((response) => {
            console.log(response.data);
            // 데이터 저장
            // setShowImages();
            setItemName(response.data.item);
            setCategory(response.data.category);
            setContent(response.data.content);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, []);
  useEffect(() => {
    console.log("category: ", category);
  }, []);

  return (
    <div className="item">
      <ToastContainer theme="dark" />
      <div className="item_container">
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          encType="multipart/form-data"
        >
          <div className="item_uploadContainer">
            <div
              className="item_upload"
              onClick={() => selectFile.current.click()}
            >
              <div className="item_uploadIcon">
                <FaCamera className="item_camera" />
                <input
                  type="file"
                  id="file"
                  name="profile_files"
                  multiple="multiple"
                  accept="image/*"
                  ref={selectFile}
                  onChange={handleAddImages}
                />
                <span>{showImages.length}/5</span>
              </div>
            </div>
            <div className="item_preview">
              {showImages.map((image, index) => (
                <div key={index}>
                  <img src={image} alt="item" className="item_previewImg" />
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="item_body">
            <div className="item_itemName">
              <div className="item_label">
                <label>물품명</label>
              </div>
              <input
                type="text"
                maxLength="30"
                autoFocus
                placeholder="물품명을 입력하세요."
                defaultValue={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
            </div>
            <hr />
            <div className="item_itemCategory">
              <div className="item_label">
                <label>카테고리 선택</label>
              </div>
              <SelectBox
                address={data.category}
                defaultValue={category}
                handleChangeState={handleChangeCategory}
              />
            </div>
            <hr />
            <div className="item_content">
              <div className="item_label">
                <label>글내용</label>
              </div>
              <textarea
                cols="5"
                rows="5"
                placeholder="물품에 대해 간단히 소개해주세요."
                defaultValue={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <hr />
          <div className="item_btn">
            <NavLink to="/main/mypage/mylist">
              <button className="item_cancelBtn">취소</button>
            </NavLink>
            <button type="submit" className="item_submitBtn">
              {iID ? "수정" : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
