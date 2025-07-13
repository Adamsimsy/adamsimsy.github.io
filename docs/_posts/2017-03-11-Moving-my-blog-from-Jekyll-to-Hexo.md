---
layout: post
title: "Moving my blog from Jekyll to Hexo"
date: 2017-03-11 19:08:32
categories: General
tags: jekyll hexo github
thumbnail: /images/Moving-my-blog-from-Jekyll-to-Hexo_newblog.jpg
---

For some time I have been meaning to begin blogging about my Sitecore and development experiences to share with the community. 

Around a year ago i created a new blog using [GitHub pages and Jekyll](https://jekyllrb.com/docs/github-pages/) which was straight forward. I made a few posts but as it was a really simple and not attractive blog, I was never keen to share my posts or write new ones. The reason it was so simple was because there are limitations with Jekyll themes and plugins running on GitHub pages, which GitHub renders on the fly.

<!-- more -->

![My old Hexo blog](/images/Moving-my-blog-from-Jekyll-to-Hexo_oldblog.jpg)

So again, recently I decided I wanted to start blogging a lot more to engage with the Sitecore community. So, first thing first...I wanted to find a blogging engine that i was happy with. I considered the following and did some research into what others in the community were using:

* WordPress
* Blogger
* Ghost
* Medium

These I looked at and thought were good platforms, but I liked the power you had over your blog with Jekyll.

I then had bit of a chat with Kam about [his blog](https://kamsar.net/) and he suggested [Hexo](https://hexo.io/) which is a "A fast, simple & powerful blog framework" which can also run on GitHub. I was able to get a blog up and running very quickly by following the [Getting started guide for Hexo and GitHub pages](https://gist.github.com/btfak/18938572f5df000ebe06fbd1872e4e39).

Both Jekyll and Hexo use markdown format for posts which made it easy to keep my old posts. But for me the Hexo had the following advantages over Jekyll:

* Hexo uses NodeJS where Jekyll uses Ruby (less stuff to install and more familiar with Node)
* You generate Hexo blogs locally and then deploy them to your GitHub pages repo. Jekyll with GitHub renders on the fly which causes plugin and theme limitations
* Better [themes](https://hexo.io/plugins/) and [plugins](https://hexo.io/plugins/) for Hexo which are easy to install

Within a few hours I was able to deploy Hexo, understand how it works and to install and customise a theme as you can see below.

![My new Hexo blog and theme](/images/Moving-my-blog-from-Jekyll-to-Hexo_newblog.jpg)

I'm pretty happy with what I have and now looking forward to blogging regularly!
