import React from "react";

const Input = props => {
  return (
    <input
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      title={props.title}
      id={props.id}
      onKeyUp={props.onKeyUp}
      className={`input ${props.className ? props.className : ""}`}
      autoFocus={props.autoFocus}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
      disabled={props.disabled}
      min={props.min}
      step={props.step}
      max={props.max}
      checked={props.checked}
    />
  );
};

export default Input;
