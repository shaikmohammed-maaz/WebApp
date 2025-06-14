import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import {
  getTimeRemaining,
  formatTime,
  getRandomBonus,
  getStoredMiningState,
  setStoredMiningState,
  MS_IN_DAY
} from "./miningUtils";
import fireGif from "./assets/fire.gif";
import NewsList from "./NewsList.jsx";

// Popup Modal
function MiningModal({ open, onClose, onMine, isMining }) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Mining Completed!</h2>
        <button className="pickaxe-btn" onClick={onMine} disabled={isMining}>
          {isMining ? "Mining..." : "⛏️ Start Mining"}
        </button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// Main Mining Countdown Component
function MiningCountdown({ coins, setCoins, baseRate = 1 }) {
  const [target, setTarget] = useState(() => {
    const state = getStoredMiningState();
    return state?.target || Date.now() + MS_IN_DAY;
  });
  const [time, setTime] = useState(getTimeRemaining(target));
  const [showModal, setShowModal] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [animation, setAnimation] = useState(false);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeRemaining(target);
      setTime(t);
      if (t.total === 0) setShowModal(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  // Persist state
  useEffect(() => {
    setStoredMiningState({ target, coins });
  }, [target, coins]);

  // Mining action
  const handleMine = () => {
    setIsMining(true);
    setTimeout(() => {
      const bonus = getRandomBonus();
      const newCoins = coins + baseRate + bonus;
      setCoins(newCoins);
      setTarget(Date.now() + MS_IN_DAY);
      setShowModal(false);
      setIsMining(false);
      setAnimation(true);
      setTimeout(() => setAnimation(false), 1200);
    }, 1200);
  };

  // Progress for circle
  const progress = 1 - time.total / MS_IN_DAY;

  return (
    <div className="mining-center-section">
      <div className="coin-progress">
        <svg className="progress-ring" width="260" height="260">
          <circle
            className="progress-ring__circle-bg"
            stroke="#222"
            strokeWidth="10"
            fill="transparent"
            r="120"
            cx="130"
            cy="130"
          />
          <circle
            className="progress-ring__circle"
            stroke="#FFD600"
            strokeWidth="10"
            fill="transparent"
            r="120"
            cx="130"
            cy="130"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - progress)}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className={`coin-center${animation ? " coin-animate" : ""}`}>
          <div className="coin-icon">
            <img src={fireGif} alt="Mining" style={{ width: 64, height: 64, objectFit: "contain" }} />
          </div>
          <div className="coin-amount">{coins.toFixed(5)}</div>
          <div className="coin-usd">$ {(coins * 5.54).toFixed(5)}</div>
        </div>
      </div>
      <div className="mining-section">
        <div className="mining-icon">
          <span className="icon-pickaxe" />
        </div>
        <div className="mining-timer">{formatTime(time)}</div>
      </div>
      <MiningModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onMine={handleMine}
        isMining={isMining}
      />
    </div>
  );
}

const Home = () => {
  // Coin state
  const [coins, setCoins] = useState(() => {
    const state = getStoredMiningState();
    return state?.coins || 0;
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-title">
          <div className="logo-circle">N</div>
          <span className="logo-text">NexCoin</span>
        </div>
        <div className="header-icons">
          <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#ffe066', marginRight: 8 }}>emoji_events</span>
          <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#ffe066' }}>notifications</span>
        </div>
      </header>
      <main className="home-main">
        <MiningCountdown coins={coins} setCoins={setCoins} />
        <div className="invite-group">
          <div className="invite-icon">
            <span className="icon-group" />
          </div>
          <div className="invite-text">
            <div>Create a group with friends to increase performance by 10% for each member</div>
            <div className="invite-link">Invite your friend now</div>
          </div>
          <span className="icon-arrow" />
        </div>
                <NewsList />
      </main>
    </div>
  );
};

export default Home;
