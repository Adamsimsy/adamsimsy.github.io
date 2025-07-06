---
layout: page
title: Categories
permalink: /categories/
---

<div class="categories-page">
  <h1>Categories</h1>
  
  {% assign categories = site.categories | sort %}
  
  <div class="categories-grid">
    {% for category in categories %}
      <div class="category-card">
        <h2 class="category-title">
          <a href="#{{ category[0] | slugify }}">{{ category[0] }}</a>
          <span class="post-count">{{ category[1].size }} posts</span>
        </h2>
      </div>
    {% endfor %}
  </div>
  
  <div class="category-posts">
    {% for category in categories %}
      <section class="category-section" id="{{ category[0] | slugify }}">
        <h2 class="category-header">{{ category[0] }} ({{ category[1].size }} posts)</h2>
        
        <div class="posts-list">
          {% for post in category[1] %}
            <article class="category-post">
              <div class="post-meta">
                <time>{{ post.date | date: "%b %d, %Y" }}</time>
              </div>
              <h3 class="post-title">
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>
              {% if post.excerpt %}
                <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
              {% endif %}
            </article>
          {% endfor %}
        </div>
      </section>
    {% endfor %}
  </div>
</div>

<style>
.categories-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.categories-page h1 {
  color: #4a90e2;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 50px;
}

.category-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-2px);
}

.category-title a {
  color: #4a90e2;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
}

.post-count {
  display: block;
  color: #999;
  font-size: 0.9rem;
  margin-top: 5px;
}

.category-section {
  margin-bottom: 50px;
}

.category-header {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #4a90e2;
}

.category-post {
  background: white;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-post .post-meta {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.category-post .post-title {
  margin: 0 0 15px 0;
  font-size: 1.3rem;
}

.category-post .post-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.category-post .post-title a:hover {
  color: #4a90e2;
}

.category-post .post-excerpt {
  color: #666;
  line-height: 1.6;
  margin: 0;
}
</style>
