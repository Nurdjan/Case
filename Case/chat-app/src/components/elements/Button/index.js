import React from "react";
import Style from "./style.module.scss";

const Button = ({ buttonName, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      className={`${Style.button} ${type === "primary" && Style.primary}`}
    >
      {buttonName}
    </button>
  );
};

export default Button;
