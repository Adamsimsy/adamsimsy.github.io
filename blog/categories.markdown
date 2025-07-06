---
layout: default
title: Categories
permalink: /categories
---

<div class="home">
  <div class="blog-container">
    <div class="main-content">
      <!-- Dynamic Category Header -->
      <div id="category-header" style="display: none;">
        <h1 id="category-title"></h1>
        <p id="category-description"></p>
      </div>
      
      <!-- All Categories Section (shown when no specific category is selected) -->
      <div id="all-categories-section">
        <h1>Categories</h1>
        
        <div class="category-grid-section">
          <h2>All Categories</h2>
          <div class="categories-grid">
            {% assign categories = site.categories | sort %}
            {% for category in categories %}
              <div class="category-card">
                <h2 class="category-title">
                  <a href="{{ '/categories' | relative_url }}?category={{ category[0] | slugify }}">{{ category[0] }}</a>
                  <span class="post-count">{{ category[1].size }} posts</span>
                </h2>
              </div>
            {% endfor %}
          </div>
        </div>
        
        <div class="category-posts">
          {% for category in categories %}
            <section class="category-section" id="{{ category[0] | slugify }}">
              <h2 class="category-header">#{{ category[0] }} ({{ category[1].size }} posts)</h2>
              
              <div class="posts-list">
                {% for post in category[1] %}
                  <article class="category-post">
                    <div class="post-meta">
                      <time>{{ post.date | date: "%b %d, %Y" }}</time>
                      {% if post.tags.size > 0 %}
                        <span class="tags">
                          {% for tag in post.tags %}
                            <span class="tag">#{{ tag }}</span>
                          {% endfor %}
                        </span>
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
      
      <!-- Filtered Posts (shown when a specific category is selected) -->
      <div id="filtered-posts" style="display: none;">
        {% for post in site.posts %}
        <article class="blog-post-card" data-categories="{{ post.categories | join: ',' | downcase }}">
          <header class="post-header">
            <h2 class="post-title">
              <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
            </h2>
            <div class="post-meta">
              <time class="post-date" datetime="{{ post.date | date_to_xmlschema }}">
                {{ post.date | date: "%b %d, %Y" }}
              </time>
              {%- if post.categories.size > 0 -%}
                {%- for category in post.categories -%}
                  <a href="{{ '/categories' | relative_url }}?category={{ category | slugify }}" class="category-link">{{ category }}</a>
                {%- endfor -%}
              {%- endif -%}
            </div>
          </header>
          
          <div class="post-content">
            {%- if post.excerpt -%}
              <div class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 50 }}</div>
            {%- endif -%}
            
            {%- if post.thumbnail or post.image -%}
              <div class="post-thumbnail">
                <img src="{{ post.thumbnail | default: post.image | relative_url }}" alt="{{ post.title }}" />
              </div>
            {%- endif -%}
            
            <div class="post-footer">
              <a href="{{ post.url | relative_url }}" class="read-more-link">Read More</a>
              
              {%- if post.tags.size > 0 -%}
                <div class="post-tags">
                  {%- for tag in post.tags -%}
                    <a href="{{ '/tags' | relative_url }}?tag={{ tag | slugify }}" class="tag-link">#{{ tag }}</a>
                  {%- endfor -%}
                </div>
              {%- endif -%}
            </div>
          </div>
        </article>
        {% endfor %}
      </div>
    </div>
    
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- Profile Section -->
      <div class="sidebar-widget profile-widget">
        {%- if site.author.image -%}
          <img src="{{ site.author.image | relative_url }}" alt="{{ site.author.name | default: site.title }}" class="profile-image" />
        {%- endif -%}
        <h3 class="widget-title">#{{ site.author.name | default: site.title | replace: ' ', '' }}</h3>
      </div>
      
      <!-- Links Section -->
      <div class="sidebar-widget links-widget">
        <h3 class="widget-title">#Links</h3>
        <ul class="widget-list">
          {%- if site.github_username -%}
            <li><a href="https://github.com/{{ site.github_username }}" target="_blank">{{ site.github_username }} github</a></li>
          {%- endif -%}
          <li><a href="https://community.sitecore.net/" target="_blank">Sitecore community</a></li>
          <li><a href="https://dev.sitecore.net/" target="_blank">Sitecore developer portal</a></li>
        </ul>
      </div>
      
      <!-- Categories Section -->
      <div class="sidebar-widget categories-widget">
        <h3 class="widget-title">#Categories</h3>
        <ul class="widget-list">
          {%- assign categories = site.categories | sort -%}
          {%- for category in categories -%}
            <li>
              <a href="{{ '/categories' | relative_url }}?category={{ category[0] | slugify }}">
                {{ category[0] }} 
                <span class="count">{{ category[1].size }}</span>
              </a>
            </li>
          {%- endfor -%}
        </ul>
      </div>
      
      <!-- Tags Section -->
      <div class="sidebar-widget tags-widget">
        <h3 class="widget-title">#Tags</h3>
        <div class="tag-cloud">
          {%- assign tags = site.tags | sort -%}
          {%- for tag in tags -%}
            <a href="{{ '/tags' | relative_url }}?tag={{ tag[0] | slugify }}" class="tag-cloud-item">{{ tag[0] }}</a>
          {%- endfor -%}
        </div>
      </div>
    </aside>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get the category parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get('category');
  
  if (selectedCategory) {
    // Hide the all categories section
    document.getElementById('all-categories-section').style.display = 'none';
    
    // Show the category header and filtered posts
    document.getElementById('category-header').style.display = 'block';
    document.getElementById('filtered-posts').style.display = 'block';
    
    // Update the category title (capitalize first letter and handle dashes)
    const categoryTitle = selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    document.getElementById('category-title').textContent = categoryTitle;
    
    // Filter posts by the selected category
    const allPosts = document.querySelectorAll('#filtered-posts .blog-post-card');
    let visibleCount = 0;
    
    allPosts.forEach(post => {
      const postCategories = post.getAttribute('data-categories').split(',');
      const hasCategory = postCategories.some(category => category.trim() === selectedCategory.toLowerCase());
      
      if (hasCategory) {
        post.style.display = 'block';
        visibleCount++;
      } else {
        post.style.display = 'none';
      }
    });
    
    // Update the description with post count
    document.getElementById('category-description').textContent = `A collection of ${visibleCount} post${visibleCount !== 1 ? 's' : ''}`;
    
    // Update page title
    document.title = `${categoryTitle} - Categories - {{ site.title }}`;
  } else {
    // Show all categories section
    document.getElementById('all-categories-section').style.display = 'block';
    document.getElementById('category-header').style.display = 'none';
    document.getElementById('filtered-posts').style.display = 'none';
  }
});
</script>

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

.category-grid-section {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.category-grid-section h2 {
  color: #333;
  margin-bottom: 20px;
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
  transition: color 0.3s ease;
}

.category-title a:hover {
  color: #2c5aa0;
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
  display: flex;
  gap: 15px;
  align-items: center;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.category-post .post-meta .tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.category-post .post-meta .tag {
  background: #4a90e2;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.8rem;
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
