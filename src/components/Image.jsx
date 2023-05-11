/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { ASSETS_URL } from "../utilities";

const AppImage = ({ path }) => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <img
        style={{ maxWidth: "100px", maxHeight: "80px" }}
        src={`${ASSETS_URL}/${path}`}
        alt="No Image"
        className="img-thumbnail"
      />
    </div>
  );
};

export default AppImage;
