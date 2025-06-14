import React from "react";
import "./Wallet.css";
import walletImg from "./assets/wallet.png";

const Wallet = () => {
  return (
    <div className="wallet-container">
      <main className="wallet-main">
        <h1 className="wallet-title">E-Wallet Rubi</h1>
        <div className="wallet-desc">Management and safety of all your digital assets.</div>
        <div className="wallet-image-circle">
          <img src={walletImg} alt="Wallet" className="wallet-image" />
        </div>
        <button className="wallet-btn" onClick={() => console.log('Start creating a wallet')}>Start creating a wallet</button>
      </main>
    </div>
  );
};

export default Wallet;
