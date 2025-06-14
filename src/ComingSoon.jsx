import React from "react";
import "./ComingSoon.css";

const ComingSoon = () => (
  <div className="comingsoon-container">
    <div className="comingsoon-logo">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" stroke="#FFD600" strokeWidth="4" fill="#222" />
        <text x="50%" y="54%" textAnchor="middle" fill="#FFD600" fontSize="22" fontWeight="bold" dy=".3em">⏳</text>
      </svg>
    </div>
    <div className="comingsoon-text">Coming Soon</div>
  </div>
);

export default ComingSoon;
