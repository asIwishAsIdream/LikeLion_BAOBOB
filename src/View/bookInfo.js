import React, { useState } from "react";
import CategoryListLeft from "./LeftCategories";
import leftArrow from "../image/left_arrow_small_category.png";

function bookInfo() {
  return (
    <div style={{ display: "flex", minHeight: "1024px", width: "1920px" }}>
      <img
        src={leftArrow}
        alt="leftArrow"
        style={{ position: "absolute", left: 407, top: 108 }}
      />
      <div style={{}}></div>
    </div>
  );
}

export default bookInfo;
