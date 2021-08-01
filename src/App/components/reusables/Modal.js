// Reusable modal box component.

import React, { useEffect, useRef } from "react";

const Modal = props => {
  const modalRef = useRef(null);

  const checkToClose = event => {
    if (
      modalRef &&
      modalRef.current &&
      !modalRef.current.contains(event.target)
    )
      props.toggleModal();
  };

  useEffect(() => {
    // Add a listener for outside clicks.
    document.addEventListener("click", checkToClose);
    return () => document.removeEventListener("click", checkToClose);
  }, []);

  return (
    <div className={"modalbox-container"}>
      <div className={"modalbox"} ref={modalRef}>
        <div className={"head row"}>
          <div className={"heading col-9"}>{props.heading}</div>
          <div className={"col-3 closebuttoncontainer"}>
            <button
              className={"accessibility closebutton"}
              onClick={() => props.toggleModal()}
            >
              &times;
            </button>
          </div>
        </div>
        <div className={"contents"}>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
