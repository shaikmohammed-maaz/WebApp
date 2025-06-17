import React from "react";
import "./Wallet.css";
import walletImg from "./assets/wallet.png";
import Header from './Header.jsx'

const Wallet = () => {
  return (
    <div className="wallet-container">
      <Header />
      <main className="wallet-main">
        <h1 className="wallet-title" style={{color: '#00ff41', textShadow: '0 0 8px #00ff41cc'}}>E-Wallet Rubi</h1>
        <div className="wallet-desc" style={{color: '#00ff41', textShadow: '0 0 6px #00ff41cc'}}>Management and safety of all your digital assets.</div>
        <div className="wallet-image-circle" style={{border: '4px solid #00ff41', background: '#181f18', boxShadow: '0 0 12px #00ff41cc'}}>
          <img src={walletImg} alt="Wallet" className="wallet-image" />
        </div>
        <button className="wallet-btn" style={{background: '#00ff41', color: '#111', boxShadow: '0 0 8px #00ff41cc'}} onClick={() => console.log('Start creating a wallet')}>Start creating a wallet</button>
      </main>
    </div>
  );
};

export default Wallet;
