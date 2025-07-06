---
layout: default
title: Tags
permalink: /tags
---

<div class="home">
  <div class="blog-container">
    <div class="main-content">
      <!-- Dynamic Tag Header -->
      <div id="tag-header" style="display: none;">
        <h1 id="tag-title"></h1>
        <p id="tag-description"></p>
      </div>
      
      <!-- All Tags Section (shown when no specific tag is selected) -->
      <div id="all-tags-section">
        <h1>Tags</h1>
        
        <div class="tag-cloud-section">
          <h2>Tag Cloud</h2>
          <div class="tag-cloud">
            {% assign tags = site.tags | sort %}
            {% for tag in tags %}
              <a href="{{ '/tags' | relative_url }}?tag={{ tag[0] | slugify }}" class="tag-item" style="font-size: {{ tag[1].size | times: 0.2 | plus: 0.8 }}rem;">
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
      
      <!-- Filtered Posts (shown when a specific tag is selected) -->
      <div id="filtered-posts" style="display: none;">
        {% for post in site.posts %}
        <article class="blog-post-card" data-tags="{{ post.tags | join: ',' | downcase }}">
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
                  <a href="{{ '/categories/' | append: category | relative_url }}" class="category-link">{{ category }}</a>
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
              <a href="{{ '/categories/' | append: category[0] | relative_url }}">
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
  // Get the tag parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const selectedTag = urlParams.get('tag');
  
  if (selectedTag) {
    // Hide the all tags section
    document.getElementById('all-tags-section').style.display = 'none';
    
    // Show the tag header and filtered posts
    document.getElementById('tag-header').style.display = 'block';
    document.getElementById('filtered-posts').style.display = 'block';
    
    // Update the tag title (capitalize first letter and handle dashes)
    const tagTitle = selectedTag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    document.getElementById('tag-title').textContent = tagTitle;
    
    // Filter posts by the selected tag
    const allPosts = document.querySelectorAll('#filtered-posts .blog-post-card');
    let visibleCount = 0;
    
    allPosts.forEach(post => {
      const postTags = post.getAttribute('data-tags').split(',');
      const hasTag = postTags.some(tag => tag.trim() === selectedTag.toLowerCase());
      
      if (hasTag) {
        post.style.display = 'block';
        visibleCount++;
      } else {
        post.style.display = 'none';
      }
    });
    
    // Update the description with post count
    document.getElementById('tag-description').textContent = `A collection of ${visibleCount} post${visibleCount !== 1 ? 's' : ''}`;
    
    // Update page title
    document.title = `${tagTitle} - Tags - {{ site.title }}`;
  } else {
    // Show all tags section
    document.getElementById('all-tags-section').style.display = 'block';
    document.getElementById('tag-header').style.display = 'none';
    document.getElementById('filtered-posts').style.display = 'none';
  }
});
</script>

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
