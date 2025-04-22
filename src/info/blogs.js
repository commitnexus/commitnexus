import React from "react";
import "./BloggerPage.css";
import Head from "../homepage/header";
import Footer from "../homepage/footer";
import image1  from "../homepage/images/ChatGPT Image Apr 14, 2025, 04_02_55 PM.png"

const blogPosts = [
    {
      id: 1,
      title: "Welcome to Our Blog!",
      date: "April 14, 2025",
      description: "Discover updates, tips, and insights about our journey and features of our platform.",
    },
    {
      id: 2,
      title: "How to Upload and Share Folders Easily",
      date: "April 10, 2025",
      description: "A step-by-step guide on uploading folders, subfolders, and files using our app.",
    },
    {
      id: 3,
      title: "AI File Restoration: How It Works",
      date: "April 6, 2025",
      description: "Learn how our AI restores deleted files and automatically organizes your data for efficiency.",
    },
    {
      id: 4,
      title: "Understanding Your Secure Cloud Vault",
      date: "April 2, 2025",
      description: "An inside look into our encryption methods and how we keep your files safe in the cloud.",
    },
    {
      id: 5,
      title: "Using QR Codes to Share Folders Instantly",
      date: "March 30, 2025",
      description: "Explore how you can share folders using QR codes and make collaboration seamless.",
    },
    {
      id: 6,
      title: "CommitNexus Behind the Scenes: Building the Future of File Management",
      date: "March 25, 2025",
      description: "A sneak peek into the development journey, challenges, and vision that shaped CommitNexus.",
    },
    {
      id: 7,
      title: "Top 5 Tips to Maximize Productivity with CommitNexus",
      date: "March 20, 2025",
      description: "Boost your workflow using these powerful features built right into the platform.",
    },
    {
      id: 8,
      title: "Auto File Adding: What It Does and Why You’ll Love It",
      date: "March 18, 2025",
      description: "Discover how CommitNexus intelligently handles new files and keeps your folders organized.",
    },
    {
      id: 9,
      title: "The Power of Seamless Data Sharing Across Devices",
      date: "March 15, 2025",
      description: "Learn how CommitNexus connects your devices for uninterrupted file transfers anytime, anywhere.",
    },
    {
      id: 10,
      title: "Getting Started with CommitNexus: A Beginner’s Guide",
      date: "March 10, 2025",
      description: "New to CommitNexus? This guide walks you through everything you need to get started fast.",
    }
  ];
  

const BloggerPage = () => {
  return (
    <div className="blogger-page-wrapper">
      <Head />

      <section className="blogger-hero">
        <div className="hero-content">
          <h1>Explore Insights, Updates & Stories</h1>
          <p>Stay informed with our latest blog posts and development updates.</p>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="blog-cards-container">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card-alt">
              <div className="blog-thumbnail">
                <img src={image1} alt={post.title} />
              </div>
              <div className="blog-card-body">
                <p className="blog-post-date">{post.date}</p>
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-post-description">{post.description}</p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BloggerPage;
