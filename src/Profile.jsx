import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="logo-title">
          <div className="logo-circle">N</div>
          <span className="logo-text">NexCoin</span>
        </div>
      </header>
      <main className="profile-main">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            <span className="icon-avatar" />
          </div>
          <div className="profile-username">User</div>
        </div>
        <div className="profile-balance-section">
          <div className="profile-balance">38.14043</div>
          <div className="profile-group-count">17</div>
        </div>
        <div className="profile-invite-group" onClick={() => console.log('Invite your friend')}> 
          <div className="invite-icon">
            <span className="icon-group" />
          </div>
          <div className="invite-text">
            <div>Create a group with friends to increase performance by 10% for each member.</div>
            <div className="invite-link">Invite your friend now</div>
          </div>
          <span className="icon-arrow" />
        </div>
        <div className="profile-menu-list">
          <div className="profile-menu-item" onClick={() => console.log('Navigate to My information')}>
            <span className="icon-menu icon-user" />
            <span className="menu-label">My information</span>
            <span className="icon-arrow" />
          </div>
          <div className="profile-menu-item" onClick={() => console.log('Navigate to User verification')}>
            <span className="icon-menu icon-verify" />
            <span className="menu-label">User verification</span>
            <span className="icon-arrow" />
          </div>
          <div className="profile-menu-item" onClick={() => console.log('Navigate to Account & security')}>
            <span className="icon-menu icon-security" />
            <span className="menu-label">Account & security</span>
            <span className="icon-arrow" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
