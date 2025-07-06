---
layout: page
title: Tags
permalink: /tags/
---

<div class="tags-page">
  <h1>Tags</h1>
  
  {% assign tags = site.tags | sort %}
  
  <div class="tag-cloud-section">
    <h2>Tag Cloud</h2>
    <div class="tag-cloud">
      {% for tag in tags %}
        <a href="#{{ tag[0] | slugify }}" class="tag-item" style="font-size: {{ tag[1].size | times: 0.2 | plus: 0.8 }}rem;">
          {{ tag[0] }} ({{ tag[1].size }})
        </a>
      {% endfor %}
    </div>
  </div>
  
  <div class="tag-posts">
    {% for tag in tags %}
      <section class="tag-section" id="{{ tag[0] | slugify }}">
        <h2 class="tag-header">#{{ tag[0] }} ({{ tag[1].size }} posts)</h2>
        
        <div class="posts-list">
          {% for post in tag[1] %}
            <article class="tag-post">
              <div class="post-meta">
                <time>{{ post.date | date: "%b %d, %Y" }}</time>
                {% if post.categories.size > 0 %}
                  <span class="category">{{ post.categories.first }}</span>
                {% endif %}
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
.tags-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.tags-page h1 {
  color: #4a90e2;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
}

.tag-cloud-section {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.tag-cloud-section h2 {
  color: #333;
  margin-bottom: 20px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.tag-item {
  background: #f5f5f5;
  color: #4a90e2;
  padding: 8px 12px;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tag-item:hover {
  background: #4a90e2;
  color: white;
  transform: scale(1.05);
}

.tag-section {
  margin-bottom: 50px;
}

.tag-header {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #4a90e2;
}

.tag-post {
  background: white;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tag-post .post-meta {
  display: flex;
  gap: 15px;
  align-items: center;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.tag-post .post-meta .category {
  background: #4a90e2;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.8rem;
}

.tag-post .post-title {
  margin: 0 0 15px 0;
  font-size: 1.3rem;
}

.tag-post .post-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.tag-post .post-title a:hover {
  color: #4a90e2;
}

.tag-post .post-excerpt {
  color: #666;
  line-height: 1.6;
  margin: 0;
}
</style>
