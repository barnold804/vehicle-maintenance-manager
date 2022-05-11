import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Links } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Profile from "./Profile";
import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState("");

  // Fetch User // This should depend on a session existing
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogout() {
    setUser("");
  }

  function loginUser(user) {
    setUser(user);
  }

  return (
    <div className="App">
      <NavBar user={user} onLogout={handleLogout} />
      <main id="main-window">
        <Routes>
          {
            user ? (
              <React.Fragment>
                <Route path="/home/" element={<Home user={user} />} />
                <Route path="/profile/" element={<Profile user={user} />} />
              </React.Fragment>
            ) : (
              <Route path="/Login" element={<Login onLogin={loginUser}/>} />
            )
          }
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
