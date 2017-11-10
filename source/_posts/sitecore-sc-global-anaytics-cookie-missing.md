---
title:  Sitecore SC_ANALYTICS_GLOBAL_COOKIE missing
date:   2017-11-11 14:00:00
categories: sitecore
tags:
- xdb
- analytics
---
This is an uncommon issue and one that is easy to overlook if you've recently deployed Sitecore into production.

But you find that the persistant cookie "SC_ANALYTICS_GLOBAL_COOKIE" which Sitecore uses to track contacts across sessions in the xDB is missing. This causes a number of issues, but the main one being is that if a visitor returns to the website, a new contact is created as Sitecore cannot relate the two sessions using this unique visitor id.

The cookie you expect to see is:

![Sitcore global cookie](/images/sitecore-sc-global-anaytics-cookie-missing-1.jpg)

There are a number of reasons why this might not appear:

[1] Sitecore analytics has been disabled using the setting ""
[2] The "@Html.Sitecore().VisitorIdentification()" razor view helper is missing
[3] Your license is for CMS only and not xDB
[4] Failure to connect to MongoDB
[5] You have configured your site domain to a different one being used by external website visitors. This sometimes happens if you are using a load balancer or proxying. What you'll find is that the "Set-Cookie" response header is trying to set the cookie for the wrong domain which your browser will ignore and not store. See example below.

![Set Sitcore global cookie example](/images/sitecore-sc-global-anaytics-cookie-missing-2.jpg)

The final one being a tricky one to hunt down, so i thought i'd share the steps i went through to find the solution. I hope this saves someone else some time.