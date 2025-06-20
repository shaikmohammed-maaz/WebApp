import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createUserIfNotExists } from "./database"; // Ensure this function exists to handle user creation
import { auth } from "./firebase";
import "./HomeRedesign.css"; // Reuse home styles for background, fonts, etc.
import "./Login.css"; // Add new styles for login-specific tweaks
import logo from "./assets/logo.webp"; // Replace with your actual logo path

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pw) {
      setError("Please enter both fields.");
      return;
    }
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      localStorage.setItem("nexcoin_logged_in", "1"); // Optional: for your RequireAuth logic
      navigate("/WebApp", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

const handleGoogleLogin = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const referral = localStorage.getItem("referralCode") || "";
      await createUserIfNotExists({
        ...result.user,
        referralCodeInput: referral.trim() || null,
      });
      navigate("/WebApp", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="main-bg login-bg">
      <div className="login-center-container">
        {/* <div className="login-logo-wrap">
          <img src={logo} alt="NexCoin Logo" className="login-logo" />
          <div className="login-app-name neon-green">CollabriaNexus</div>
        </div> */}
        <div className="login-card">
          <div className="login-logo-wrap">
            <img src={logo} alt="CollabriaNexus Logo" className="login-logo" />
            <div className="login-welcome neon-green">
              Welcome to CollabriaNexus!
            </div>
          </div>

          <form
            className="login-form"
            onSubmit={handleLogin}
            autoComplete="off"
          >
            <label className="login-label" htmlFor="email">
              Email or Username
            </label>
            <input
              id="email"
              className="login-input"
              type="text"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
            />
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="login-input"
              type="password"
              autoComplete="current-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter your password"
            />
            {error && <div className="login-error neon-green">{error}</div>}
            <button
              className="login-btn neon-green-btn"
              type="submit"
              tabIndex={0}
              aria-label="Login"
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
              Login
            </button>
          </form>
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
            aria-label="Sign in with Google"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="google-icon"
            />
            <span>Sign in with Google</span>
          </button>
          <div className="login-links">
            <a href="#" className="login-link neon-green">
              Forgot password?
            </a>
            <span className="login-divider" />
            <Link to="/signup" className="login-link">
              Sign up
            </Link>
          </div>
        </div>
        <footer className="login-footer">
          <span className="footer-text">@CollabriaNexusBot</span>
        </footer>
      </div>
    </div>
  );
};

export default Login;
