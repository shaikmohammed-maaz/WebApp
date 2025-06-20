import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import "./HomeRedesign.css";
import "./Login.css";
import logo from "./assets/logo.webp";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !pw || !pw2) {
      setError("Please fill all fields.");
      return;
    }
    if (pw !== pw2) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, pw);
      localStorage.setItem("nexcoin_logged_in", "1");
      navigate("/WebApp", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem("nexcoin_logged_in", "1");
      navigate("/WebApp", { replace: true });
    } catch (err) {
      setError("Google signup failed.");
    }
  };

  return (
    <div className="main-bg login-bg">
      <div className="login-center-container">
        <div className="login-card">
          <div className="login-logo-wrap">
            <img src={logo} alt="CollabriaNexus Logo" className="login-logo" />
            <div className="login-welcome neon-green">
              Create your CollabriaNexus account
            </div>
          </div>
          
          <form
            className="login-form"
            onSubmit={handleSignup}
            autoComplete="off"
          >
            <label className="login-label" htmlFor="signup-email">
              Email
            </label>
            <input
              id="signup-email"
              className="login-input"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <label className="login-label" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              className="login-input"
              type="password"
              autoComplete="new-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter your password"
            />
            <label className="login-label" htmlFor="signup-password2">
              Confirm Password
            </label>
            <input
              id="signup-password2"
              className="login-input"
              type="password"
              autoComplete="new-password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              placeholder="Confirm your password"
            />
            {error && <div className="login-error neon-green">{error}</div>}
            <button
              className="login-btn neon-green-btn"
              type="submit"
              tabIndex={0}
              aria-label="Sign up"
              onMouseDown={(e) => {
                // Green ripple effect
                const btn = e.currentTarget;
                const circle = document.createElement("span");
                const diameter = Math.max(btn.clientWidth, btn.clientHeight);
                const radius = diameter / 2;
                circle.classList.add("ripple");
                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${
                  e.clientX - btn.getBoundingClientRect().left - radius
                }px`;
                circle.style.top = `${
                  e.clientY - btn.getBoundingClientRect().top - radius
                }px`;
                btn.appendChild(circle);
                circle.addEventListener("animationend", () => circle.remove());
              }}
            >
              Sign up
            </button>
          </form>
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignup}
            aria-label="Sign up with Google"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="google-icon"
            />
            <span>Sign up with Google</span>
          </button>
          <div className="login-links">
            <a
              href="#"
              className="login-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Already have an account? Login
            </a>
          </div>
        </div>
        <footer className="login-footer">
          <span className="footer-text">@CollabriaNexusBot</span>
        </footer>
      </div>
    </div>
  );
};

export default Signup;