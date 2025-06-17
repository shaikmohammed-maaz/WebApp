import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import newsData from "./news.json";
import newImg from "./assets/new.jpg";
import "./NewsList.css";

const NewsList = () => {
  const navigate = useNavigate();
  const feedRef = useRef(null);

  // Ripple effect handler
  const handleRipple = (e) => {
    const card = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(card.clientWidth, card.clientHeight);
    const radius = diameter / 2;
    circle.classList.add("ripple");
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - card.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - card.getBoundingClientRect().top - radius}px`;
    card.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  };

  return (
    <div className="news-feed-bg" ref={feedRef}>
      <header className="news-header">
        <h1 className="news-heading">News & Updates</h1>
        <div className="news-heading-divider" />
      </header>
      <div className="news-list" role="list" aria-label="Latest News">
        {newsData.map((article, idx) => (
          <div
            key={article.id}
            className="news-card news-card-modern"
            tabIndex={0}
            role="button"
            aria-label={article.title}
            style={{ animationDelay: `${idx * 60}ms` }}
            onClick={(e) => {
              handleRipple(e);
              setTimeout(() => navigate(`/news/${article.id}`), 180);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(`/news/${article.id}`);
              }
            }}
          >
            <div className="news-card-icon">
              <div className="news-icon-circle">
                <img src={newImg} alt="icon" className="news-icon-img" />
              </div>
            </div>
            <div className="news-content">
              <div className="news-title news-title-accent" title={article.title}>{article.title}</div>
              <div className="news-subtitle">Update</div>
              <div className="news-body" title={article.content}>{article.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
