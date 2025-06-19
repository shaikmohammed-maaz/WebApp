import React, { useState } from "react";
import "./ProfileRedesign.css";
import { getUserProfile, setUserProfile, ensureUserProfile } from './userUtils';
import Header from './Header.jsx';
import MatrixBackground from './MatrixBackground.jsx';

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
  const [copied, setCopied] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);
  const profileComplete = 0.8; // 80% complete, example
  if (!user) return <div>Loading...</div>;

  if (showEdit) {
    return (
      <div className="profile-bg">
        <MatrixBackground />
        <Header />
        <div className="profile-card">
          <div className="profile-avatar-glow">
            <span className="glow" />
            <div className="profile-avatar">
              <img src={user.profilePicture} alt="avatar" style={{width: 80, height: 80, borderRadius: '50%'}} />
            </div>
          </div>
          <div className="profile-username">{user.username}</div>
          <div className="profile-greeting">Welcome, {user.username}!</div>
          <div className="profile-complete-label">Profile completeness: {(profileComplete*100).toFixed(0)}%</div>
          <div className="profile-complete-bar">
            <div className="profile-complete-inner" style={{ width: `${profileComplete*100}%` }} />
          </div>
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
      </div>
    );
  }

  if (showConnections) {
    return (
      <div className="profile-bg">
        <MatrixBackground />
        <Header />
        <div className="section-card">
          <div className="section-header"><span className="icon-section icon-section-social" />Social Connections</div>
          <div className="section-content">eKYC: <b style={{color:'#2CFF05'}}>{user.kyc.status === 'verified' ? 'Verified' : 'Not verified'}</b></div>
          <div className="section-content" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Zalo connecting</b>: <span style={{color: '#39FF14', marginLeft: 12}}>No connection</span></div>
          <div className="section-content" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Facebook connecting</b>: <span style={{color: '#39FF14', marginLeft: 12}}>No connection</span></div>
          <div className="section-content" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Google connecting</b>: <span style={{color: '#39FF14', marginLeft: 12}}>No connection</span></div>
          <div className="section-content" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Tiktok connecting</b>: <span style={{color: '#39FF14', marginLeft: 12}}>No connection</span></div>
          <div className="section-content" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}><b>Telegram connecting</b>: <span style={{color: '#39FF14', marginLeft: 12}}>No connection</span></div>
        </div>
      </div>
    );
  }

  if (showSecurity) {
    return (
      <div className="profile-bg">
        <MatrixBackground />
        <Header />
        <div className="section-card">
          <div className="section-header"><span className="icon-section icon-section-security" />Account & Security</div>
          <div className="section-toggle-row">
            <span>Password</span>
            <button className="section-action-btn">Change</button>
          </div>
          <div className="section-toggle-row">
            <span>2FA</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={user.security.twoFactorEnabled} readOnly />
              <span className="toggle-slider" />
            </label>
          </div>
          <div className="section-toggle-row">
            <span>Touch ID</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={false} readOnly />
              <span className="toggle-slider" />
            </label>
          </div>
          <div className="section-actions">
            <button className="section-action-btn" style={{background:'#d00'}} onClick={()=>setShowDeleteDialog(true)}>Delete Account</button>
            <button className="section-action-btn" onClick={()=>setShowSignoutDialog(true)}>Sign Out</button>
          </div>
        </div>
        {showDeleteDialog && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Are you sure you want to delete your account?</h3>
              <button className="section-action-btn" style={{background:'#d00'}} onClick={()=>setShowDeleteDialog(false)}>Cancel</button>
              <button className="section-action-btn" onClick={()=>{/* handle delete */}}>Delete</button>
            </div>
          </div>
        )}
        {showSignoutDialog && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Sign out of your account?</h3>
              <button className="section-action-btn" onClick={()=>setShowSignoutDialog(false)}>Cancel</button>
              <button className="section-action-btn" onClick={()=>{/* handle signout */}}>Sign Out</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="profile-bg">
      <MatrixBackground />
      <Header />
      <div className="profile-card">
        <div className="profile-avatar-glow">
          <span className="glow" />
          <div className="profile-avatar">
            <img src={user.profilePicture} alt="avatar" style={{width: 80, height: 80, borderRadius: '50%'}} />
          </div>
        </div>
        <div className="profile-username">{user.username}</div>
        <div className="profile-greeting">Welcome, {user.username}!</div>
        <div className="profile-complete-label">Profile completeness: {(profileComplete*100).toFixed(0)}%</div>
        <div className="profile-complete-bar">
          <div className="profile-complete-inner" style={{ width: `${profileComplete*100}%` }} />
        </div>
      </div>
      <div className="balance-card">
        <div className="balance-row">
          <span className="profile-balance">{user.wallet.balance}</span>
          <span className="profile-group-count">Group: {user.mining.groupMining.groupName} ({user.mining.groupMining.members} members, Boost: {user.mining.groupMining.boostPercent}%)</span>
        </div>
        <div className="referral-row">
          <span className="referral-label">Referral:</span>
          <span className="referral-code">{user.referralCode}</span>
          <span className="icon-copy" onClick={()=>{navigator.clipboard.writeText(user.referralCode); setCopied(true); setTimeout(()=>setCopied(false), 1200);}} title="Copy" />
          <span className="icon-share" title="Share" />
          {copied && <span style={{color:'#2CFF05', fontSize:'0.98rem', marginLeft:8}}>Copied!</span>}
        </div>
        <div className="badge-row">
          <span className="badge-chip"><span className="icon-badge icon-badge-verified" /> Verified</span>
          <span className="badge-chip"><span className="icon-badge icon-badge-group" /> Group</span>
          {/* Add more badges as needed */}
        </div>
      </div>
      <div className="section-card">
        <div className="section-header"><span className="icon-section icon-section-info" />My Information</div>
        <div className="section-content">Email: {user.email}</div>
        <div className="section-content">Phone: {user.phone}</div>
        <div className="section-content">Country: -</div>
        <div className="section-content">Address: -</div>
      </div>
      <div className="section-card">
        <div className="section-header"><span className="icon-section icon-section-verify" />User Verification</div>
        <div className="section-content">KYC Status: <b style={{color:'#2CFF05'}}>{user.kyc.status}</b></div>
        <div className="section-content">Full Name: {user.kyc.fullName}</div>
        <div className="section-content">DOB: {user.kyc.dob}</div>
        <div className="section-content">ID: {user.kyc.idType} {user.kyc.idNumber}</div>
      </div>
      <div className="section-card">
        <div className="section-header"><span className="icon-section icon-section-security" />Account & Security</div>
        <div className="section-toggle-row">
          <span>2FA</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={user.security.twoFactorEnabled} readOnly />
            <span className="toggle-slider" />
          </label>
        </div>
        <div className="section-toggle-row">
          <span>Touch ID</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={false} readOnly />
            <span className="toggle-slider" />
          </label>
        </div>
        <div className="section-actions">
          <button className="section-action-btn" style={{background:'#d00'}} onClick={()=>setShowDeleteDialog(true)}>Delete Account</button>
          <button className="section-action-btn" onClick={()=>setShowSignoutDialog(true)}>Sign Out</button>
        </div>
      </div>
      {showDeleteDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete your account?</h3>
            <button className="section-action-btn" style={{background:'#d00'}} onClick={()=>setShowDeleteDialog(false)}>Cancel</button>
            <button className="section-action-btn" onClick={()=>{/* handle delete */}}>Delete</button>
          </div>
        </div>
      )}
      {showSignoutDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Sign out of your account?</h3>
            <button className="section-action-btn" onClick={()=>setShowSignoutDialog(false)}>Cancel</button>
            <button className="section-action-btn" onClick={()=>{/* handle signout */}}>Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
