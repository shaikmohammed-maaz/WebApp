import React, { useState, useEffect } from "react";
import "./HomeRedesign.css";
import {
  getTimeRemaining,
  formatTime,
  getRandomBonus,
  getStoredMiningState,
  setStoredMiningState,
  MS_IN_DAY
} from "./miningUtils";
import NewsList from "./NewsList.jsx";
import Header from './Header.jsx';
import rotatingImg from "./assets/rotatingImg.png";
import "./GroupMembers.css";
import { fetchHomePageDataWithGroupProfiles, completeMiningSession } from "./database"; // <-- Make sure this import is correct

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

// Group Members Render Function
export function renderGroupMembers(members) {
  if (!Array.isArray(members) || members.length === 0) {
    return (
      <div style={{ padding: "18px 0", color: "#aaa", textAlign: "left", fontSize: "1rem" }}>
        <b>No group members yet.</b> Invite friends to start your group and boost your mining rate!
      </div>
    );
  }
  return (
    <>
      <div style={{ fontWeight: 600, margin: "10px 0 6px 2px", color: "#2cff05", textAlign: "left" }}>
        Group Members
      </div>
      <div
        className="group-members-list"
        aria-label="Group Members"
        style={{ justifyContent: "flex-start" }} // ensures left alignment
      >
        {members.map((m) => (
          <div className="group-member-item" key={m.userId}>
            <div style={{ position: "relative" }}>
              <img
                src={m.profilePicture}
                alt={m.userName}
                className="group-member-avatar"
                loading="lazy"
              />
              {m.isMining && <span className="group-member-dot" />}
            </div>
            <div className="group-member-name">{m.userName}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// MiningCountdown with neumorphic card, pulse, streak, and greeting
function MiningCountdown({ coins, setCoins, baseRate = 1, userName = "User", streak, setStreak, miningActive, handleMine, time, progress, streakProgress, showModal }) {
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
        onClick={handleMine}
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
  const [coins, setCoins] = useState(0);
  const [userName, setUserName] = useState("User");
  const [streak, setStreak] = useState(1);
  const [target, setTarget] = useState(Date.now() + MS_IN_DAY);
  const [time, setTime] = useState(getTimeRemaining(target));
  const [showModal, setShowModal] = useState(false);
  const [groupMining, setGroupMining] = useState({
    groupName: "",
    groupMembersCount: 0,
    groupBoost: 0,
    groupMembersList: []
  });

  // Fetch all data on mount
  useEffect(() => {
    async function fetchData() {
      const data = await fetchHomePageDataWithGroupProfiles();
      if (data?.userProfile) {
        setUserName(data.userProfile.userName || "User");
        setCoins(data.userProfile.wallet?.balance ?? 0);
        setStreak(data.userProfile.mining?.streak?.daysActive ?? 1);
        setTarget(data.userProfile.mining?.currentSession?.target ?? (Date.now() + MS_IN_DAY));
      }
      if (data?.groupMining) {
        console.log("Group mining data:", data.groupMining);
        setGroupMining(data.groupMining);
      }
    }
    fetchData();
  }, []);

  // Timer for mining countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeRemaining(target);
      setTime(t);
      if (t.total === 0) setShowModal(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  // Mining logic
  const miningActive = time.total > 0;
  const progress = 1 - time.total / MS_IN_DAY;
  const streakProgress = Math.min(streak % 7, 7) / 7;

  const handleMine = async () => {
    if (miningActive) return;
    const bonus = getRandomBonus();
    const minedAmount = 1 + bonus;
    const newCoins = coins + minedAmount;
    setCoins(newCoins);
    setTarget(Date.now() + MS_IN_DAY);
    setShowModal(false);
    setStreak((s) => s + 1);

    // Call Firestore update function to persist mining results
    try {
      await completeMiningSession({
        minedAmount,
        newBalance: newCoins,
        newTarget: Date.now() + MS_IN_DAY,
        newStreak: streak + 1,
      });
    } catch (err) {
      // Optionally handle error (show toast, etc)
      console.error("Failed to complete mining session:", err);
    }
  };

  return (
    <div className="main-bg">
      <Header />
      <div className="divider" />
      <main style={{ width: '100%', maxWidth: 540, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MiningCountdown
          coins={coins}
          setCoins={setCoins}
          userName={userName}
          streak={streak}
          setStreak={setStreak}
          miningActive={miningActive}
          handleMine={handleMine}
          time={time}
          progress={progress}
          streakProgress={streakProgress}
          showModal={showModal}
        />
        {/* Group mining section */}
        <div className="referral-card" style={{ width: "100%", marginTop: 24 }}>
          <div className="referral-title" style={{ marginBottom: 8 }}>
            Group Mining Boost
          </div>
          <div className="referral-desc">
            Invite friends to your group and increase your mining rate by 10% for each member!
          </div>
          <div className="group-progress-label">
            Group Boost: {(groupMining.groupBoost * 100).toFixed(0)}%
          </div>
          <div className="group-progress-bar" aria-label="Group Mining Progress">
            <div className="group-progress-inner" style={{ width: `${groupMining.groupBoost * 100}%` }} />
          </div>
          <button className="invite-btn" style={{ margin: "16px 0" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, verticalAlign: 'middle' }}>
              group_add
            </span>
            <span className="btn-text">Invite your friends now</span>
          </button>
          {/* Horizontal group members list */}
          <div className="group-members-section">
            {renderGroupMembers(groupMining.groupMembersList)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
