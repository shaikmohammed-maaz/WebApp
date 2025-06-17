import React from "react";
import "./Home.css"; // Reuse Home styles for card layout, or create Mining.css later
import peopleImg from "./assets/people.png";
import myGroupImg from "./assets/myGroup.png";
import exploreImg from "./assets/explore.png";
import statisticsImg from "./assets/statistics.png";
import Header from './Header.jsx';

const groupCurrent = 7;
const groupMax = 17;

const cardData = [
  {
    key: "my-group",
    img: myGroupImg,
    title: "My group",
    subtitle: `${groupCurrent}/${groupMax}`,
    onClick: () => {}, // Placeholder for future navigation
  },
  {
    key: "statistics",
    img: statisticsImg,
    title: "Statistics",
    onClick: () => {},
  },
  {
    key: "explore",
    img: exploreImg,
    title: "Rubi Explore",
    onClick: () => {},
  },
];

export default function Mining() {
  return (
    <div className="mining-page" style={{ minHeight: "100vh", background: "#18120b" }}>
      <div className="mining-container">
        <Header />
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 32 }}>
          <img src={peopleImg} alt="People" style={{ width: 240, maxWidth: "90%" }} />
        </div>
        <div className="mining-cards" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          padding: "40px 24px 0 24px",
          maxWidth: 500,
          margin: "0 auto"
        }}>
          {cardData.map(card => (
            <div
              key={card.key}
              className="mining-card"
              style={{
                background: "rgba(255, 215, 0, 0.04)",
                borderRadius: 24,
                boxShadow: "0 2px 16px #000a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 32,
                cursor: "pointer",
                minHeight: 180
              }}
              onClick={card.onClick}
            >
              <img src={card.img} alt={card.title} style={{ width: 64, marginBottom: 16 }} />
              <div style={{ color: "#ffe066", fontSize: 22, fontWeight: 600, marginBottom: 6 }}>{card.title}</div>
              {card.subtitle && (
                <div style={{ color: "#ffe066", fontSize: 18, opacity: 0.7 }}>{card.subtitle}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
