import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import newsData from "./news.json";
import newImg from "./assets/new.jpg";
import "./NewsList.css";

const News = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = newsData.find((a) => String(a.id) === String(id));

  if (!article) {
    return (
      <div className="news-feed-bg">
        <header className="news-header">
          <h1 className="news-heading">News & Updates</h1>
          <div className="news-heading-divider" />
        </header>
        <div style={{ color: '#fff', fontSize: '1.2rem', margin: '2rem auto', textAlign: 'center' }}>Article not found.</div>
      </div>
    );
  }

  return (
    <div className="news-feed-bg">
      <header className="news-header">
        <h1 className="news-heading">News & Updates</h1>
        <div className="news-heading-divider" />
      </header>
      <div className="news-detail-card">
        <button className="news-back-btn" onClick={() => navigate(-1)}>&larr; Back</button>
        <img src={newImg} alt={article.title} className="news-detail-image" />
        <div className="news-detail-title">{article.title}</div>
        <div className="news-detail-subtitle">Update</div>
        <div className="news-detail-content">{article.content}</div>
      </div>
    </div>
  );
};

export default News;
