import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import newsData from "./news.json";
import "./Home.css";

const News = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = newsData.find((a) => String(a.id) === String(id));

  if (!article) return <div>Article not found.</div>;

  return (
    <div className="news-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <h2>{article.title}</h2>
      <img src={article.imageUrl.replace('./assets/', '/src/assets/')}
           alt={article.title}
           className="news-detail-image" />
      <div className="news-content">{article.content}</div>
    </div>
  );
};

export default News;
