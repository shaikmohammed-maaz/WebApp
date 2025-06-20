import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard.jsx";
import "./HomeRedesign.css";
import Header from "./Header.jsx";
import dummyBlogs from "./dummyblogs.json";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBlogs(dummyBlogs.filter((b) => b.published !== false));
  }, []);

  return (
    <div className="main-bg" style={{ paddingTop: 0, paddingBottom: 80, minHeight: "100vh" }}>
      {/* <Header /> */}
      <div className="divider" />
      <div style={{ width: '100%', maxWidth: 540, margin: '0 auto', padding: '0 1.2rem' }}>
        <div className="section-header" style={{ fontSize: '1.4rem', margin: '1.1rem 0 1.2rem 0', textAlign: 'center' }}>Blog</div>
      </div>
      <main style={{ width: "100%", maxWidth: 540, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} onClick={() => navigate(`/blog/${blog.id}`)} />
        ))}
      </main>
    </div>
  );
};

export default BlogList;
