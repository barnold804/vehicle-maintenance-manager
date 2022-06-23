import React from "react";

function Footer() {
  return (
    <div
      className="footer"
      style={{
        width: "100%",
        height: 60,
        position: "relative",
        bottom: 0,
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: "1vw",
        }}
      >
        Created by:{" "}
        <a href="https://www.linkedin.com/in/brian-arnold-98063468/" target="_blank" rel="noopener noreferrer">
        Brian Arnold
      </a>
      </p>
    </div>
  );
}

export default Footer;
