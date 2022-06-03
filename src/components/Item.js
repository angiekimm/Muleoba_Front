import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/Item.css";
import SelectBox from "./SelectBox";
import data from "../db/data.json";
import { FaTrashAlt, FaCamera } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Item() {
  const uID = useSelector((state) => state.uID);

  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [content, setContent] = useState("");
  const [showImages, setShowImages] = useState([]);

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

  // const handleDeleteImage = (index) => {
  //   setShowImages(showImages.filter((_, id) => id !== index));
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    // 이미지 저장
    let files = e.target.file.files;
    let formData = new FormData(); // formData 객체를 생성한다.
    const filesLength = files.length > 5 ? 5 : files.length;

    for (let i = 0; i < filesLength; i++) {
      formData.append("files", files[i]);
    }

    // 물품명, 카테고리, 글 저장
    let dataSet = {
      itemName: itemName,
      category: category,
      content: content,
    };
    formData.append("data", JSON.stringify(dataSet));

    async function uploadItem() {
      //formData 확인하기
      for (let value of formData.values()) {
        console.log(value);
      }

      await axios
        .post(
          "/muleoba/uploadItem",
          {
            formData: formData,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    uploadItem();

    // const uploadItem = await axios({
    //   method: "POST",
    //   url: "/muleoba/uploadItem",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: formData,
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const selectFile = useRef("");

  return (
    <div className="item">
      <div className="item_container">
        <form onSubmit={onSubmit} encType="multipart/form-data">
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
                  multiple
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
                  {/* <FaTrashAlt onClick={() => handleDeleteImage(index)} /> */}
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
                defaultValue="default"
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
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
