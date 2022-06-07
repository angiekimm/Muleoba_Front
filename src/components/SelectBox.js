import React from "react";
import "../css/SelectBox.css";
import uuid from "react-uuid";

export default function SelectBox({
  address,
  defaultValue,
  handleChangeState,
  clickModalOutside,
}) {
  return (
    <select
      className="selectbox_container"
      key={uuid()}
      value={defaultValue}
      onChange={handleChangeState}
    >
      {address.map((item) => (
        <option
          key={item.value}
          value={item.value}
          defaultValue={defaultValue === item.value}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
}
