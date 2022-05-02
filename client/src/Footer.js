import React from "react";

function Footer() {
  return (
    <div
      className="footer"
      style={{
        width: "100%",
        height: 60,
        position: "absolute",
        bottom: 0,
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: ".5vw",
        }}
      >
        Created by:{" "}
        <a
          href="https://www.linkedin.com/in/brian-arnold-98063468/"
          className="footer-link"
        >
          Brian Arnold
        </a>{" "}
        |{" "}
      </p>
    </div>
  );
}

export default Footer;
