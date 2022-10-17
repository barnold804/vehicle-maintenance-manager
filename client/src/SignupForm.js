import React, { useState } from "react";

function SignupForm({ onLogin, user }) {
  const [name, setName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email_address, password }),
    }).then((r) => {
      console.log("Signup submit response")
      setIsLoading(false);
      console.log(r)
      if (r.ok) {
        r.json().then((user) => {
          console.log("User is")
          console.log(user)
          onLogin(user)
        });
      } else {
        r.json().then((err) => {
          console.log("Error is")
          console.log(err)
          setErrors(err.errors)
        });
      }
    }).catch((err) => console.log(err));
  }

  return (
    <div id="signup-form">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "auto",
          margin: "auto",
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email_address">Email Address</label>
        <input
          type="text"
          id="email_address"
          autoComplete="off"
          value={email_address}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <label> (Requirement: 8 or more characters, a digit, lower and upper case characters, and a symbol)</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit" style={{ marginTop: 10 }}>
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        {errors.map((err) => (

          <h3
            key={err}
            style={{
              display: "block",
              margin: "auto",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {err}
          </h3>

        ))}
      </form>
      <br />
    </div>
  );
}

export default SignupForm;
