import React, { useState } from "react";
import "./Profile.css";
import { getUserProfile, setUserProfile, ensureUserProfile } from './userUtils';

// Default user profile data
const defaultUser = {
  userId: "abc123",
  username: "cryptoMiner01",
  email: "user@example.com",
  phone: "+1234567890",
  passwordHash: "hashed_password_here",
  profilePicture: "/assets/avatar01.png",
  referralCode: "REF123ABC",
  referredBy: "REF987XYZ",
  wallet: {
    walletAddress: "0x1234abcd5678efgh9012ijkl",
    balance: 250.75,
    transactions: [
      {
        txId: "0xa1b2c3d4e5",
        type: "deposit",
        amount: 100,
        status: "confirmed",
        timestamp: "2025-06-10T15:30:00Z"
      },
      {
        txId: "0xf6e7d8c9b0",
        type: "withdrawal",
        amount: 50,
        status: "pending",
        timestamp: "2025-06-11T18:00:00Z"
      }
    ]
  },
  mining: {
    totalMined: 320.50,
    currentSession: {
      startTime: "2025-06-14T08:00:00Z",
      durationInMinutes: 120,
      coinsEarned: 5.25
    },
    streak: {
      daysActive: 14,
      lastActiveDate: "2025-06-13"
    },
    groupMining: {
      groupId: "group001",
      groupName: "BlockStorm",
      members: 5,
      boostPercent: 20
    }
  },
  achievements: {
    level: 5,
    badges: ["Early Miner", "Streak Master", "Community Builder"],
    rank: 37,
    dailyChallengesCompleted: 18
  },
  security: {
    twoFactorEnabled: true,
    lastLoginIP: "192.168.0.2",
    deviceId: "device-uuid-xyz",
    location: "New York, USA"
  },
  kyc: {
    status: "verified",
    fullName: "John Doe",
    dob: "1992-05-18",
    idType: "Passport",
    idNumber: "A1234567",
    documentImage: "/uploads/id/passport.png",
    selfieImage: "/uploads/selfies/user123.png",
    verifiedAt: "2025-06-12T14:00:00Z"
  },
  preferences: {
    language: "en",
    darkMode: true,
    notificationsEnabled: true
  },
  accountStatus: {
    createdAt: "2025-05-01T10:00:00Z",
    lastActive: "2025-06-13T22:45:00Z",
    isBanned: false,
    banReason: null
  }
};

ensureUserProfile(defaultUser);

const Profile = () => {
  const user = getUserProfile();
  const [showEdit, setShowEdit] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  if (!user) return <div>Loading...</div>;

  if (showEdit) {
    return (
      <div className="profile-container">
        <header className="profile-header">
          <button className="back-btn" style={{position: 'absolute', top: 18, left: 18, background: 'none', border: 'none', color: '#FFD600', fontSize: 28, cursor: 'pointer', zIndex: 2, padding: 0}} onClick={() => setShowEdit(false)} aria-label="Back">
            <span style={{fontFamily: 'Material Symbols Outlined', fontWeight: 700}}>←</span>
          </button>
          <div className="logo-title">
            <div className="logo-circle">N</div>
            <span className="logo-text">NexCoin</span>
          </div>
        </header>
        <main className="profile-main" style={{alignItems: 'flex-start', background: '#181818', color: '#FFD600', borderRadius: 24, margin: 16, padding: 24, boxShadow: '0 2px 16px #0008'}}>
          <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16}}>
            <div style={{border: '4px solid #FFD600', borderRadius: '50%', width: 110, height: 110, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8}}>
              <img src={user.profilePicture} alt="avatar" style={{width: 90, height: 90, borderRadius: '50%', objectFit: 'cover'}} />
            </div>
            <div style={{fontSize: 28, fontWeight: 600, color: '#FFD600', marginBottom: 8}}>{user.username}</div>
          </div>
          <div style={{width: '100%', maxWidth: 340, margin: '0 auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '10px 0'}}><span>Lastname</span><span>{user.kyc.fullName.split(' ').slice(-1)[0]}</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '10px 0'}}><span>Firstname</span><span>{user.kyc.fullName.split(' ').slice(0, -1).join(' ')}</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '10px 0'}}><span>Gender</span><span>-</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '10px 0'}}><span>Date of birth</span><span>{user.kyc.dob}</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '10px 0'}}><span>Email</span><span>{user.email}</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '10px 0'}}><span>Phone number</span><span>{user.phone}</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '10px 0'}}><span>Country</span><span>-</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '10px 0'}}><span>Address</span><span>-</span></div>
          </div>
        </main>
      </div>
    );
  }

  if (showConnections) {
    return (
      <div className="profile-container">
        <header className="profile-header">
          <button className="back-btn" style={{position: 'absolute', top: 18, left: 18, background: 'none', border: 'none', color: '#FFD600', fontSize: 28, cursor: 'pointer', zIndex: 2, padding: 0}} onClick={() => setShowConnections(false)} aria-label="Back">
            <span style={{fontFamily: 'Material Symbols Outlined', fontWeight: 700}}>←</span>
          </button>
          <div className="logo-title">
            <div className="logo-circle">N</div>
            <span className="logo-text">NexCoin</span>
          </div>
        </header>
        <main className="profile-main" style={{background: '#181818', color: '#FFD600', borderRadius: 24, margin: 16, padding: 24, boxShadow: '0 2px 16px #0008'}}>
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img src={user.profilePicture} alt="avatar" style={{width: 80, height: 80, borderRadius: '50%'}} />
            </div>
            <div className="profile-username">{user.username}</div>
          </div>
          <div className="profile-info-list">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>eKYC</b>: <span style={{color: '#FFD600', marginLeft: 12}}>{user.kyc.status === 'verified' ? 'Verified' : 'Not verified'}</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Zalo connecting</b>: <span style={{color: '#FFD600', marginLeft: 12}}>No connection</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Facebook connecting</b>: <span style={{color: '#FFD600', marginLeft: 12}}>No connection</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Google connecting</b>: <span style={{color: '#FFD600', marginLeft: 12}}>No connection</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Tiktok connecting</b>: <span style={{color: '#FFD600', marginLeft: 12}}>No connection</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Telegram connecting</b>: <span style={{color: '#FFD600', marginLeft: 12}}>No connection</span></div>
          </div>
        </main>
      </div>
    );
  }

  if (showSecurity) {
    return (
      <div className="profile-container">
        <header className="profile-header">
          <button className="back-btn" style={{position: 'absolute', top: 18, left: 18, background: 'none', border: 'none', color: '#FFD600', fontSize: 28, cursor: 'pointer', zIndex: 2, padding: 0}} onClick={() => setShowSecurity(false)} aria-label="Back">
            <span style={{fontFamily: 'Material Symbols Outlined', fontWeight: 700}}>←</span>
          </button>
          <div className="logo-title">
            <div className="logo-circle">N</div>
            <span className="logo-text">NexCoin</span>
          </div>
        </header>
        <main className="profile-main" style={{background: '#181818', color: '#FFD600', borderRadius: 24, margin: 16, padding: 24, boxShadow: '0 2px 16px #0008'}}>
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img src={user.profilePicture} alt="avatar" style={{width: 80, height: 80, borderRadius: '50%'}} />
            </div>
            <div className="profile-username">{user.username}</div>
          </div>
          <div className="profile-info-list">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>First password</b>: <span style={{color: '#FFD600', marginLeft: 12, cursor: 'pointer'}}>Change</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Two factor authentication (2FA)</b>: <span style={{marginLeft: 12}}><input type="checkbox" checked={user.security.twoFactorEnabled} readOnly style={{marginLeft: 8}} /></span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Signin with Touch ID</b>: <span style={{marginLeft: 12}}><input type="checkbox" checked={false} readOnly style={{marginLeft: 8}} /></span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Remove your account</b>: <span style={{color: '#d00', marginLeft: 12}}>Delete</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Signout</b>: <span style={{color: '#FFD600', marginLeft: 12, cursor: 'pointer'}}>Signout</span></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="logo-title">
          <div className="logo-circle">N</div>
          <span className="logo-text">NexCoin</span>
        </div>
      </header>
      <main className="profile-main">
        <div className="profile-avatar-section" style={{position: 'relative'}}>
          <div className="profile-avatar">
            <img src={user.profilePicture} alt="avatar" style={{width: 80, height: 80, borderRadius: '50%'}} />
          </div>
          <div className="profile-username">{user.username}</div>
        </div>
        <div className="profile-balance-section">
          <div className="profile-balance">{user.wallet.balance}</div>
          <div className="profile-group-count">{user.mining.groupMining.members}</div>
        </div>
        <div className="profile-invite-group" onClick={() => navigator.clipboard.writeText(user.referralCode)}>
          <div className="invite-icon">
            <span className="icon-group" />
          </div>
          <div className="invite-text">
            <div>Group: {user.mining.groupMining.groupName} (Boost: {user.mining.groupMining.boostPercent}%)</div>
            <div className="invite-link">Copy Referral: {user.referralCode}</div>
          </div>
          <span className="icon-arrow" />
        </div>
        <div className="profile-menu-list">
          <div className="profile-menu-item" onClick={() => setShowEdit(true)}>
            <span className="icon-menu icon-user" />
            <span className="menu-label">My information</span>
            <span className="icon-arrow" />
          </div>
          <div className="profile-menu-item" onClick={() => setShowConnections(true)}>
            <span className="icon-menu icon-verify" />
            <span className="menu-label">User verification</span>
            <span className="icon-arrow" />
          </div>
          <div className="profile-menu-item" onClick={() => setShowSecurity(true)}>
            <span className="icon-menu icon-security" />
            <span className="menu-label">Account & security</span>
            <span className="icon-arrow" />
          </div>
        </div>
        <div style={{marginTop: 24, color: '#FFD600', fontSize: 16}}>
          <div>Level: {user.achievements.level} | Rank: {user.achievements.rank}</div>
          <div>Badges: {user.achievements.badges.join(', ')}</div>
          <div>Daily Challenges: {user.achievements.dailyChallengesCompleted}</div>
          <div>Streak: {user.mining.streak.daysActive} days</div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
