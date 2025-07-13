---
layout: post
title: "Reset Sitecore admin password and account"
date: 2017-11-25 00:17:54
categories: sitecore
tags: account
---
I recently managed to lock out my Sitecore local admin account when using the Sitecore PowerShell module. It did this without warning when the elevated privileges stopped working correctly.

Anyway from a few various sources I found some examples of how to reset the password. But what was required was to also to set IsLockedOut value. 

If you ever find your account locked out, try running the following.

<!-- more -->

{% highlight sql %}
UPDATE [aspnet_Membership] 
SET 
[Password]='qOvF8m8F2IcWMvfOBjJYHmfLABc=', 
[PasswordSalt]='OM5gu45RQuJ76itRvkSPFw==', 
[IsApproved] = '1', 
[IsLockedOut] = '0'
WHERE UserId IN (SELECT UserId FROM dbo.aspnet_Users WHERE UserName = 'sitecore\Admin') 
{% endhighlight %}

Enjoy!