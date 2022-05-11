import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({ user, onLogout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <div id="header">
      {
        user ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              margin: 10,
            }}
          >
            <Link
              to={"/login"}
              onClick={handleLogout}
              style={{ display: "block", margin: "auto", marginRight: 0 }}
            >
              Logout
            </Link>

            <p
              style={{
                display: "block",
                margin: "auto",
                marginLeft: 0,
              }}
            >
              Welcome, {user.name}!
            </p>
          </div>  

        ) : null
      }
    </div>
  );
}

export default Header;
