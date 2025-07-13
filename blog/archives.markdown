---
layout: page
title: Archives
permalink: /archives/
---

<div class="archives-page">
  <h1>Archives</h1>
  
  <div class="archives-container">
    {% assign posts_by_year = site.posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}
    
    {% for year in posts_by_year %}
      <div class="archive-year">
        <h2 class="year-title">{{ year.name }}</h2>
        
        <div class="year-posts">
          {% for post in year.items %}
            <article class="archive-post">
              <div class="archive-post-meta">
                <time class="archive-date">{{ post.date | date: "%b %d" }}</time>
                {% if post.categories.size > 0 %}
                  <span class="archive-category">{{ post.categories.first }}</span>
                {% endif %}
              </div>
              <h3 class="archive-title">
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>
              {% if post.excerpt %}
                <p class="archive-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
              {% endif %}
            </article>
          {% endfor %}
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<style>
.archives-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.archives-page h1 {
  color: #4a90e2;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
}

.archive-year {
  margin-bottom: 50px;
}

.year-title {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #4a90e2;
}

.archive-post {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.archive-post:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.archive-post-meta {
  flex: 0 0 120px;
  text-align: center;
}

.archive-date {
  display: block;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.archive-category {
  background: #4a90e2;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.8rem;
}

.archive-title {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  line-height: 1.3;
}

.archive-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.archive-title a:hover {
  color: #4a90e2;
}

.archive-excerpt {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .archive-post {
    flex-direction: column;
    gap: 10px;
  }
  
  .archive-post-meta {
    flex: none;
    text-align: left;
  }
  
  .archives-page h1 {
    font-size: 2rem;
  }
  
  .year-title {
    font-size: 1.5rem;
  }
}
</style>
