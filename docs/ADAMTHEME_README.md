# AdamTheme - Custom Jekyll Theme

A modern, clean Jekyll theme built specifically for your blog. AdamTheme features a professional design with excellent typography, mobile responsiveness, and enhanced functionality.

## Features

### Design & Typography
- **Modern Typography**: Uses Inter font for body text and JetBrains Mono for code
- **Clean Layout**: Minimalist design focused on readability
- **Responsive Design**: Looks great on all devices
- **Color Scheme**: Professional blue (#3498db) with dark grays for excellent contrast

### Enhanced Functionality
- **Reading Progress Bar**: Shows reading progress on blog posts
- **Copy to Clipboard**: Easy code copying with hover buttons
- **Mobile Navigation**: Smooth hamburger menu for mobile devices
- **Smooth Scrolling**: Enhanced navigation experience
- **Social Media Integration**: Built-in social media links

### SEO & Performance
- **SEO Optimized**: Built-in Jekyll SEO tag support
- **Fast Loading**: Optimized CSS and JavaScript
- **Accessible**: Proper ARIA labels and semantic HTML

## Installation

The theme is already installed in your Jekyll site. To use it:

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Start the development server:
   ```bash
   bundle exec jekyll serve
   ```

3. Visit `http://localhost:4000` to see your site

## Configuration

### Basic Settings
Edit `_config.yml` to customize your site:

```yaml
title: Your Site Title
email: your-email@example.com
description: Your site description
twitter_username: your_twitter
github_username: your_github

# AdamTheme settings
adamtheme:
  date_format: "%b %-d, %Y"
  social_links:
    twitter: your_twitter
    github: your_github
    linkedin: your_linkedin
    # Add more social links as needed
```

### Social Media Links
Supported social platforms:
- Twitter
- GitHub
- LinkedIn
- Facebook
- Instagram
- Dribbble

### Customization

#### Colors
Edit `_sass/_base.scss` to change the color scheme:

```scss
$brand-color: #3498db; // Primary brand color
$text-color: #2c3e50; // Main text color
$background-color: #ffffff; // Background color
```

#### Fonts
Edit `_sass/_base.scss` to change fonts:

```scss
$base-font-family: "Inter", sans-serif;
$code-font-family: "JetBrains Mono", monospace;
```

## File Structure

```
├── _includes/           # Reusable template components
│   ├── head.html       # HTML head section
│   ├── header.html     # Site header and navigation
│   ├── footer.html     # Site footer
│   └── social.html     # Social media links
├── _layouts/           # Page layout templates
│   ├── default.html    # Base layout
│   ├── home.html       # Homepage layout
│   ├── page.html       # Static page layout
│   └── post.html       # Blog post layout
├── _sass/              # Sass stylesheets
│   ├── _base.scss      # Variables and mixins
│   ├── _layout.scss    # Basic layout styles
│   ├── _adamtheme.scss # Theme-specific styles
│   └── _syntax-highlighting.scss # Code syntax highlighting
├── assets/
│   ├── css/
│   │   └── style.scss  # Main stylesheet
│   ├── js/
│   │   └── adamtheme.js # Theme JavaScript
│   └── adamtheme-social-icons.svg # Social media icons
```

## Writing Posts

Create new posts in the `_posts/` directory with the filename format:
```
YYYY-MM-DD-post-title.markdown
```

Example post front matter:
```yaml
---
layout: post
title: "Your Post Title"
date: 2025-07-05 12:00:00 +0000
categories: blog
---
```

## Advanced Features

### Reading Progress Bar
Automatically appears on blog posts to show reading progress.

### Code Block Copy Feature
Hover over code blocks to see a copy button that copies the code to clipboard.

### Mobile Navigation
Responsive hamburger menu that works smoothly on mobile devices.

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This theme is open source and available under the MIT License.

## Support

For questions or issues with the theme, please check the Jekyll documentation or create an issue in your repository.

---

**Happy blogging with AdamTheme!** 🎉
