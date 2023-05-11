import React from "react";
import { ArrowDown, Settings } from "../elements/icons";
import Style from "./style.module.scss";
import UserList from "../UserList";

const LeftSideBar = ({ data }) => {
  return (
    <div className={Style.leftSideBar}>
      <div className={Style.header}>
        <div className={Style.headerItem}>
          <p className={Style.headText}>All Messages</p>
          <ArrowDown />
        </div>
        <Settings />
      </div>
      <UserList data={data} />
    </div>
  );
};

export default LeftSideBar;
