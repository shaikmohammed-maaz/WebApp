import React, { useState, useEffect, useRef } from "react";
import "./HomeRedesign.css";
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
import Header from './Header.jsx';
import rotatingImg from "./assets/rotatingImg.png";

// Mining Modal (now just a message)
function MiningModal({ open }) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Mining Completed!</h2>
      </div>
    </div>
  );
}

// MiningCountdown with neumorphic card, pulse, streak, and greeting
function MiningCountdown({ coins, setCoins, baseRate = 1, userName = "User" }) {
  const [target, setTarget] = useState(() => {
    const state = getStoredMiningState();
    return state?.target || Date.now() + MS_IN_DAY;
  });
  const [time, setTime] = useState(getTimeRemaining(target));
  const [showModal, setShowModal] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [streak, setStreak] = useState(() => {
    const state = getStoredMiningState();
    return state?.streak || 1;
  });
  const miningActive = time.total > 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeRemaining(target);
      setTime(t);
      if (t.total === 0) setShowModal(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  useEffect(() => {
    setStoredMiningState({ target, coins, streak });
  }, [target, coins, streak]);

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
      setStreak((s) => s + 1);
      setTimeout(() => setAnimation(false), 1200);
    }, 1200);
  };

  // Progress for ring and streak bar
  const progress = 1 - time.total / MS_IN_DAY;
  const streakProgress = Math.min(streak % 7, 7) / 7; // 7-day streak

  return (
    <div className="mining-card" tabIndex={0} aria-label="Mining Card">
      <div className="greeting">Welcome back, {userName}!</div>
      <div className="mining-ring">
        {miningActive && <span className="pulse" />}
        <div className="mining-icon" style={{background: 'none', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img
            src={rotatingImg}
            alt="Mining Triangle"
            className={miningActive ? "rotating-triangle-animate" : ""}
            style={{ width: 64, height: 64, objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 0 8px #2CFF05)' }}
          />
        </div>
      </div>
      <div className="balance">{coins.toFixed(5)}</div>
      <div className="usd">$ {(coins * 5.54).toFixed(5)}</div>
      <div className="streak-label">Daily Streak: {streak} days</div>
      <div className="streak-bar" aria-label="Streak Progress">
        <div className="streak-bar-inner" style={{ width: `${streakProgress * 100}%` }} />
      </div>
      <div className="mining-progress-bar" aria-label="Mining Progress">
        <div className="mining-progress-inner" style={{ width: `${Math.max(0, Math.min(progress * 100, 100))}%` }} />
      </div>
      <div className="mining-timer">{formatTime(time)}</div>
      <button
        className="action-btn"
        style={{ marginTop: '1.1rem' , padding: '0.7rem 1.2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={(e) => {
          // Ripple effect
          const btn = e.currentTarget;
          const circle = document.createElement("span");
          const diameter = Math.max(btn.clientWidth, btn.clientHeight);
          const radius = diameter / 2;
          circle.classList.add("ripple");
          circle.style.width = circle.style.height = `${diameter}px`;
          circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
          circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
          btn.appendChild(circle);
          circle.addEventListener('animationend', () => circle.remove());
          if (!miningActive) handleMine();
        }}
        disabled={miningActive}
        tabIndex={0}
        aria-label={miningActive ? "Mining in progress" : "Start Mining"}
      >
        <span className="icon-play" />
        {miningActive ? "Mining..." : "Start Mining"}
      </button>
      <MiningModal open={showModal} />
    </div>
  );
}

const Home = () => {
  // Coin state
  const [coins, setCoins] = useState(() => {
    const state = getStoredMiningState();
    return state?.coins || 0;
  });
  // Example user name (replace with real user data if available)
  const userName = "Alex";
  // Example group mining progress (replace with real data)
  const groupBoost = 0.4; // 40% boost, e.g. 4/10 members

  return (
    <div className="main-bg">
      {/* <MatrixBackground /> removed, now global */}
      <Header />
      <div className="divider" />
      <main style={{ width: '100%', maxWidth: 540, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MiningCountdown coins={coins} setCoins={setCoins} userName={userName} />
        <div className="referral-card" tabIndex={0} aria-label="Referral Group Card">
          <div className="avatar-cluster">
            <div className="avatar">A</div>
            <div className="avatar">B</div>
            <div className="avatar">C</div>
            <div className="avatar">+</div>
          </div>
          <div className="referral-title">Group Mining Boost</div>
          <div className="referral-desc">Invite friends to your group and increase your mining rate by 10% for each member!</div>
          <div className="group-progress-label">Group Boost: {(groupBoost * 100).toFixed(0)}%</div>
          <div className="group-progress-bar" aria-label="Group Mining Progress">
            <div className="group-progress-inner" style={{ width: `${groupBoost * 100}%` }} />
          </div>
          <button className="invite-btn">
  <span className="material-symbols-outlined" style={{ fontSize: 24, verticalAlign: 'middle' }}>
    group_add
  </span>
  <span className="btn-text">Invite your friends now</span>
</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
