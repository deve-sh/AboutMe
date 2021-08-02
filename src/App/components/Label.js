import React from "react";

const Label = props => {
  return (
    <label
      className={`label ${props.labelClass ? props.labelClass : ""}`}
      onClick={props.onClick}
    >
      {props.label}
    </label>
  );
};

export default Label;
