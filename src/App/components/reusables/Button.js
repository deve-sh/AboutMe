import React from "react";

const Button = props => {
  return (
    <button
      type={props.buttonType}
      disabled={props.disabled}
      className={`button ${props.buttonClass ? props.buttonClass : ""}`}
      onClick={props.handleClick}
      title={props.buttonTitle}
    >
      {props.children
        ? props.children
        : props.buttonLabel
        ? props.buttonLabel
        : ""}
    </button>
  );
};

export default Button;
