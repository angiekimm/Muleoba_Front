import React from "react";
import "../css/SelectBox.css";

export default function SelectBox({
  address,
  defaultValue,
  handleChangeState,
}) {
  return (
    <select className="selectbox_container" onChange={handleChangeState}>
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
