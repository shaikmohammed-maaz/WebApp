import React from "react";
import "./HomeRedesign.css";

const Avatar = ({ name }) => {
  // Use initials if no avatar image
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

const BlogCard = ({ blog, onClick }) => (
  <div
    className="blog-card"
    tabIndex={0}
    role="button"
    aria-label={`Read blog: ${blog.title}`}
    onClick={onClick}
    onKeyDown={e => (e.key === "Enter" ? onClick() : undefined)}
    style={{ cursor: "pointer", marginBottom: 24, borderRadius: 18, boxShadow: "0 4px 24px rgba(44,255,5,0.10), 0 1.5px 4px rgba(0,0,0,0.08)", background: "rgba(30,34,38,0.92)", padding: 0, overflow: "hidden", transition: "transform 0.12s, box-shadow 0.18s", width : "350px"}}
    onMouseDown={e => {
      e.currentTarget.classList.add("card-tap");
    }}
    onMouseUp={e => {
      e.currentTarget.classList.remove("card-tap");
    }}
    onMouseLeave={e => {
      e.currentTarget.classList.remove("card-tap");
    }}
  >
    {blog.bannerImageUrl && (
      <img src={blog.bannerImageUrl} alt="banner" style={{ width: "100%", height: 140, objectFit: "cover" }} />
    )}
    <div style={{ padding: "1.1rem 1.2rem 1.2rem 1.2rem" }}>
      <div style={{ fontWeight: 700, fontSize: "1.18rem", color: "#2CFF05", marginBottom: 6 }}>{blog.title}</div>
      <div style={{ color: "#b6ffb6", fontSize: "0.98rem", marginBottom: 10 }}>{blog.summary}</div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <Avatar name={blog.authorName} />
        <span style={{ marginLeft: 8, color: "#fff", fontWeight: 600 }}>{blog.authorName}</span>
        <span style={{ marginLeft: 12, color: "#b6ffb6", fontSize: 13 }}>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {blog.tags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
    </div>
  </div>
);

export default BlogCard;
