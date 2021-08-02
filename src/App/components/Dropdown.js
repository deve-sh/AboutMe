import React from "react";

const Dropdown = props => {
  const opsAreObjects = props.opsAreObjects ? props.opsAreObjects : false;
  const opsField = opsAreObjects ? (props.opsField ? props.opsField : "name") : "name";

  return (
    <select
      className={`select ${props.className ? props.className : ""}`}
      onChange={props.handleChange}
      value={props.value}
      required={props.required}
      disabled={props.disabled}
    >
      {props.options
        ? props.options.map((option, index) => (
            <option key={index} value={option.id ? option.id : index}>
              {opsAreObjects ? option[opsField] : option}
            </option>
          ))
        : ""}
    </select>
  );
};

export default Dropdown;
