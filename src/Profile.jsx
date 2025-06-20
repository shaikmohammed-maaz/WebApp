import React, { useState, useEffect } from "react";
import "./ProfileRedesign.css";
import Header from './Header.jsx';
import MatrixBackground from './MatrixBackground.jsx';
import avatar from './assets/avatar.png';
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);
  const profileComplete = 0.8; // You can calculate this based on user fields
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.currentUser) return;
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUser(userDocSnap.data());
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      alert("Sign out failed. Please try again.");
    }
  };

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
              <button className="section-action-btn" onClick={handleSignOut}>Sign Out</button>
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
        <div className="section-header aligned-header">
          <span className="icon-section icon-section-info" />
          <span>My Information</span>
        </div>
        <div className="info-section">
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phone:</span>
            <span className="info-value">{user.phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Country:</span>
            <span className="info-value">-</span>
          </div>
          <div className="info-row">
            <span className="info-label">Address:</span>
            <span className="info-value">-</span>
          </div>
        </div>
      </div>
      <div className="section-card">
        <div className="section-header aligned-header">
          <span className="icon-section icon-section-verify" />
          <span>User Verification</span>
        </div>
        <div className="info-section">
          <div className="info-row">
            <span className="info-label">KYC Status:</span>
            <span className="info-value"><b style={{color:'#2CFF05'}}>{user.kyc.status}</b></span>
          </div>
          <div className="info-row">
            <span className="info-label">Full Name:</span>
            <span className="info-value">{user.kyc.fullName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">DOB:</span>
            <span className="info-value">{user.kyc.dob}</span>
          </div>
          <div className="info-row">
            <span className="info-label">ID:</span>
            <span className="info-value">{user.kyc.idType} {user.kyc.idNumber}</span>
          </div>
        </div>
      </div>
      <div className="section-card">
        <div className="section-header"><span className="icon-section icon-section-security" />Account & Security</div>
        {/* <div className="section-toggle-row">
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
        </div> */}
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
            <button className="section-action-btn" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
