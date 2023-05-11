import React from "react";
import Style from "./style.module.scss";
import Image from "next/image";
import Text from "../Text";

const UserListItem = ({ data }) => {
  const {
    avatar,
    nameAvatar,
    userName,
    lastMessage,
    userStatus,
    userTime,
    color,
    isActive,
    unread,
  } = data;
  const initials = userName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return (
    <div className={`${Style.userListItem} ${isActive && Style.itemActive}`}>
      {avatar ? (
        <div className={`${Style.userAvatar} ${Style.imageAvatar}`}>
          <Image src={avatar} width={30} height={27} alt="Avatar Image" />
        </div>
      ) : (
        <div className={Style.userAvatar} style={{ backgroundColor: color }}>
          {initials}
        </div>
      )}
      <div className={Style.userInfo}>
        <div className={Style.userHead}>
          {nameAvatar ? (
            <Image src={nameAvatar} width={60} height={13} alt="Avatar Image" />
          ) : (
            <div className={Style.user}>{userName}</div>
          )}
          {userStatus === "online" ? (
            <div className={Style.status}>{userStatus}</div>
          ) : (
            <div className={Style.lastSeen}>{userTime}</div>
          )}
        </div>
        <div className={`${Style.lastMessage} ${unread && Style.unread}`}>
          <Text content={lastMessage} maxLength={23} />
        </div>
      </div>
    </div>
  );
};

const UserList = ({ data }) => {
  return (
    <div className={Style.userList}>
      {data.map((item, index) => (
        <UserListItem data={item} key={index} />
      ))}
    </div>
  );
};

export default UserList;
