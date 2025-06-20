import React from "react";
import { useNavigate } from "react-router-dom";
import newsData from "./news.json";
import "./HomeRedesign.css";

const NewsCard = ({ news }) => {
  const navigate = useNavigate();
  return (
    <div
      className="mining-card"
      style={{
        marginBottom: 20,
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 0,
        overflow: "hidden",
        minHeight: 120,
        maxWidth: 300,
        border : "1px solid rgba(255, 255, 255, 0.1)",
      }}
      tabIndex={0}
      onClick={() => navigate(`/news/${news.id}`)}
      aria-label={`Read news: ${news.title}`}
    >
      {news.bannerImageUrl && (
        <img
          src={news.bannerImageUrl}
          alt={news.title}
          style={{
            width: 110,
            height: 110,
            objectFit: "cover",
            borderRadius: "16px 0 0 16px",
            flexShrink: 0,
          }}
        />
      )}
      <div style={{ padding: "16px", flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: "var(--text-main)" }}>
          {news.title}
        </div>
        {/* <div className="text-secondary" style={{ fontSize: 11, marginBottom: 8 }}>
          {news.summary}
        </div> */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 10, paddingTop: 4 }}>
          <span style={{ fontWeight: 500, marginRight: 8 }}>{news.source}</span>
          <span className="news-date" style={{ color: "#888" , fontSize: 11 }}>
            {new Date(news.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

const NewsList = () => {
  return (
    <main
      style={{
        maxWidth: 540,
        margin: "0 auto",
        padding: "0 1.2rem 1.2rem 0rem",
        width: "100%",
      }}
    >
            <div className="divider"/>

      <h2 className="section-header" style={{ margin: "24px 0 16px 0",padding: "0 1.2rem" }}>
        News
      </h2>
      {newsData
        .filter((n) => n.published)
        .map((news) => (
          <NewsCard news={news} key={news.id} />
        ))}
    </main>
  );
};

export default NewsList;