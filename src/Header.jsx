import React from "react";
import logo from "./assets/logo.webp";

const Header = () => (
  <header className="main-header" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18px 0 0 0'}}>
    <img src={logo} alt="Collabria Nexus Logo" style={{height: 48, width: 48, marginRight: 12, borderRadius: 12, boxShadow: '0 0 8px #00ff41cc'}} />
    <span className="app-title" style={{fontSize: 28, fontWeight: 700, color: '#00ff41', textShadow: '0 0 8px #00ff41cc', letterSpacing: 1}}>Collabria Nexus</span>
  </header>
);

export default Header;
