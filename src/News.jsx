import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import newsData from "./news.json";
import "./HomeRedesign.css";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsData.find((n) => n.id === id);

  if (!news) {
    return (
      <main style={{ maxWidth: 350, margin: "0 auto", padding: "2rem 1.2rem" }}>
        <div>News not found.</div>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: 350,
        margin: "0 auto",
        padding: "0 0 2rem 0",
        width: "100%",
        background: "transparent",
      }}
    >
      {/* Header with back and share */}
       <div
        className="main-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          maxWidth: 540,
          margin: "0 auto",
          padding: "0.7rem 0.7rem 0 0.7rem",
        }}
      >
        <button
          className="action-btn"
          style={{
            minWidth: 44,
            minHeight: 44,
            padding: 0,
            borderRadius: 12,
            marginRight: 8,
          }}
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          {/* Cross (close) icon */}
          <span className="icon-close">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </span>
        </button>
        <span
          className="app-title"
          style={{ flex: 1, textAlign: "center", fontWeight: 700, fontSize: 20 }}
        >
          News
        </span>
        <button
          className="action-btn"
          style={{
            minWidth: 44,
            minHeight: 44,
            padding: 0,
            borderRadius: 12,
            marginLeft: 8,
          }}
          aria-label="Share"
          onClick={() =>
            navigator.share
              ? navigator.share({
                  title: news.title,
                  text: news.summary,
                  url: window.location.href,
                })
              : window.open(window.location.href, "_blank")
          }
        >
          <span className="icon-group">
            {/* Share icon */}
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="17" cy="5" r="2" />
              <circle cx="5" cy="12" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M7 13.5l8 4M15 6.5l-8 4" />
            </svg>
          </span>
        </button>
      </div>
      {/* Banner */}
      {news.bannerImageUrl && (
        <img
          src={news.bannerImageUrl}
          alt={news.title}
          style={{
            width: "100%",
            maxHeight: 220,
            objectFit: "cover",
            borderRadius: 20,
            margin: "1.2rem 0 0.8rem 0",
          }}
        />
      )}
      {/* Title */}
      <div
        style={{
          fontWeight: 700,
          fontSize: 28,
          margin: "1.2rem 0 0.5rem 0",
          padding: "0 1.2rem",
          color: "var(--text-main)",
        }}
      >
        {news.title}
      </div>
      {/* Source and date */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 15,
          color: "#888",
          marginBottom: 12,
          padding: "0 1.2rem",
        }}
      >
        <span style={{ fontWeight: 500, marginRight: 8 }}>{news.source}</span>
        <span className="news-date">
          {new Date(news.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      {/* Body */}
      <div
        style={{
          fontSize: 17,
          lineHeight: 1.7,
          color: "var(--text-main)",
          padding: "0 1.2rem 1.2rem 0",
          marginBottom: 20,
        }}
      >
        {news.body}
      </div>
    </main>
  );
};

export default NewsDetail;