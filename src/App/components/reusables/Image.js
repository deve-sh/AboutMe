// Responsive image component

import React from "react";

const Image = props => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      title={props.title}
      className={`resimage ${props.className ? props.className : ""}`}
    />
  );
};

export default Image;
