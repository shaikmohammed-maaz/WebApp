import React from "react";
import "./HomeRedesign.css";
import Header from "./Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import dummyBlogs from "./dummyblogs.json";

const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="avatar" style={{ width: 32, height: 32, fontSize: 16, background: "#008000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {initials}
    </div>
  );
};

const Tag = ({ tag }) => (
  <span className="badge-chip" style={{ marginRight: 6, marginBottom: 2 }}>{tag}</span>
);

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = dummyBlogs.find((b) => b.id === id);
  if (!blog) return <div className="main-bg">Not found</div>;
  return (
    <div className="main-bg" style={{ minHeight: "100vh" }}>
      <div className="main-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "90%", maxWidth: 540, margin: "0 auto", padding: "0.7rem 0.7rem 0 0.7rem" }}>
        <button className="action-btn" style={{ minWidth: 44, minHeight: 44, padding: 0, borderRadius: 12, marginRight: 8 }} onClick={() => navigate(-1)} aria-label="Back">
          <span className="icon-close" />
        </button>
        <span className="app-title" style={{ flex: 1, textAlign: "center" }}>Blog</span>
        <button className="action-btn" style={{ minWidth: 44, minHeight: 44, padding: 0, borderRadius: 12, marginLeft: 8 }} aria-label="Share" onClick={() => navigator.share ? navigator.share({ title: blog.title, text: blog.summary, url: window.location.href }) : undefined}>
          <span className="icon-group" />
        </button>
      </div>
      {blog.bannerImageUrl && (
        <img src={blog.bannerImageUrl} alt="banner" style={{ width: "90%", maxHeight: 350, objectFit: "cover", borderRadius: 18, margin: "1.1rem 0 0.7rem 0" }} />
      )}
      <div style={{ width: "100%", maxWidth: 350, margin: "0 auto", padding: "0 1.2rem" }}>
        <div style={{ fontWeight: 700, fontSize: "1.5rem", color: "#2CFF05", marginBottom: 8 }}>{blog.title}</div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
          <Avatar name={blog.authorName} />
          <span style={{ marginLeft: 8, color: "#fff", fontWeight: 600 }}>{blog.authorName}</span>
          <span style={{ marginLeft: 12, color: "#b6ffb6", fontSize: 13 }}>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 12 }}>
          {blog.tags.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
        <div className="text-main" style={{ fontSize: "1.08rem", lineHeight: 1.7, marginBottom: 32 }}>
          {blog.body}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
