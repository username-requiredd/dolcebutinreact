import React, { useState } from "react";
import "./button.css";

const ButtonGroup = ({ setPage }) => {
  const [activeButton, setActiveButton] = useState(70);

  const handleButtonClick = (value) => {
    setActiveButton(value);
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="app" className="w-100 p-4 mx-5">
      <div className="w-100">
        <div
          className={`button ${
            activeButton === 70 ? "active bg-primary" : "bg-secondary"
          }`}
          onClick={() => handleButtonClick(70)}
        ></div>
        <div
          className={`button ${
            activeButton === 50 ? "active bg-primary" : "bg-secondary"
          }`}
          onClick={() => handleButtonClick(50)}
        ></div>
        <div
          className={`button  ${
            activeButton === 40 ? "active bg-primary" : "bg-secondary"
          }`}
          onClick={() => handleButtonClick(40)}
        ></div>
        <div
          className={`button  ${
            activeButton === 60 ? "active bg-primary" : "bg-secondary"
          }`}
          onClick={() => handleButtonClick(60)}
        ></div>
      </div>
    </div>
  );
};

export default ButtonGroup;
