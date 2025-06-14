import React from "react";
import { useNavigate } from "react-router-dom";
import newsData from "./news.json";
import "./Home.css";

const NewsList = () => {
  const navigate = useNavigate();

  return (
    <div className="news-list">
      {newsData.map((article) => (
        <div
          key={article.id}
          className="news-item"
          onClick={() => navigate(`/news/${article.id}`)}
        >
          <img src={article.imageUrl}
               alt={article.title}
               className="news-image" />
          <div className="news-title">{article.title}</div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
