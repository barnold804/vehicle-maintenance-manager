import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, onLogout }) {
    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => onLogout());
    }
  
    return (
      <div style={{display: "flex", flexDirection: "row", margin: 10}}>
        {
          user ? (
            <React.Fragment>
              <p style={{display: "block", margin: "auto", marginLeft: 0}}> Welcome, {user.name}!</p>
              <Link to="/home" >Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/login" onClick={handleLogout}>Logout</Link>
            </React.Fragment>
          ) : (
            <Link to="/login" style={{display: "block", margin: "auto", marginRight: 0}}>Login</Link>
          )
        }
      </div>
    );
  }

export default NavBar;