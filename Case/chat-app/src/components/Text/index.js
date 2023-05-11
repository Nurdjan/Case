import React from "react";

const Text = ({ content, maxLength }) => {
  if (content.length > maxLength) {
    const shortText = content.substring(0, maxLength - 3) + "...";
    return <div>{shortText}</div>;
  } else {
    return <div>{content}</div>;
  }
};

export default Text;
