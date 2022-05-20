import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import { useState } from "react";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div >
      {showLogin ? (
        <>
          <br />
          <br />
          <h1 id="login"
            style={{ display: "block", margin: "auto", width: "fit-content" }
          }
          >
            Vehicle Maintenance Manager
          </h1>
          <br />
          <LoginForm onLogin={onLogin} />
          <br />
          <div
            style={{ display: "block", margin: "auto", width: "50%" }}
          >
            <p>
              New user? &nbsp;
              <button color="secondary" onClick={() => setShowLogin(false)}>
                Sign Up
              </button>
            </p>
          </div>
        </>
      ) : 
      (
        <>
          <br />
          <br />
          <SignUpForm onLogin={onLogin} />
          <br />
          <div
            style={{ display: "block", margin: "auto", width: "20%" }}
          >
            <p>
              &nbsp;
              <button color="secondary" onClick={() => setShowLogin(true)}>
                Back to Login
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;