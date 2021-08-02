import React from "react";

const Icon = props => {
  return (
    <i
      className={`icon ${props.className ? props.className : ""}`}
      onClick={props.onClick}
      aria-hidden={true}
      title={props.title}
    />
  );
};

export default Icon;
