import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Item.css";
import SelectBox from "./SelectBox";
import data from "../db/data.json";
import { FaTrashAlt } from "react-icons/fa";

export default function Item() {
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

    //formData 확인하기
    for (let value of formData.values()) {
      console.log(value);
    }

    const postRegister = await axios({
      method: "POST",
      url: "",
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <h1>물품 등록 페이지</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="file" onChange={handleAddImages}>
          <input
            type="file"
            id="file"
            name="profile_files"
            multiple
            accept="image/*"
          />
          <span>사진추가</span>
        </label>
        <div className="item_preview">
          {showImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt="item" className="item_previewImg" />
              {/* <FaTrashAlt onClick={() => handleDeleteImage(index)} /> */}
            </div>
          ))}
        </div>
        <div>
          <label>물품명</label>
          <input
            type="text"
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
        </div>
        <div>
        <label>카테고리 선택</label>

          <SelectBox
            address={data.category}
            defaultValue="default"
            handleChangeState={handleChangeCategory}
          />
        </div>
        <div>
          <label>글내용</label>
          <input
            type="text"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <div>
          <button>취소</button>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}
