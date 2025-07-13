---
layout: post
title: "Sitecore content and components missing after layout change"
date: 2017-11-25 00:23:54
categories: sitecore
tags: powershell
thumbnail: /images/sitecore-content-and-components-missing-after-layout- change-1.jpg
---
I came across this issue recently after some changes were made to Sitecore layouts and placeholder names. A change was made to switch a template called 'General page' to use a new layout container which we had taken from Habitat. We switched from 'ArticleAsideRight.cshtml' to '1 Column.cshtml'.

<!-- more -->

After changing, the developer working with me found that the authored content was missing for the 'General page' so he changed the placeholder on '1 Column.cshtml':

{% highlight csharp %}
From
@Html.Sitecore().DynamicPlaceholder("col-huge", Model.Rendering.GetUseStaticPlaceholderNames())
To
@Html.Sitecore().DynamicPlaceholder("col-wide-1", Model.Rendering.GetUseStaticPlaceholderNames())
{% endhighlight %}

This worked great, except we had another template called 'Landing page' using this layout and the original placeholder. This would have been fine for any new content or content which hadn't had components added, as we updated the standard values for the template.

However our authors had already been adding content and component renderings with datasources and placeholders which referred to the old placeholder name 'col-huge'.

![Example of old col-huge placeholder for component in final layout](/images/sitecore-content-and-components-missing-after-layout- change-1.jpg)

We found a few solutions:

[1] Ask the authors to add components again and point for the datasources they added - Not an option for us and the authors.
[2] Add the placeholder definition for both to the same layout. This was a quick fix but we'd have a mix of placeholders in 'Final Renderings' and would make maintaining presentation details and placeholders in the future tricky.
[3] Update the 'Final Renderings' field to use the new placeholder name using PowerShell

We went for the final option and used the code snippet that can be found on my [Sitecore PowerShell Examples GIST](https://gist.github.com/Adamsimsy/30dc60df837c1400e6fccd814b3dc752#file-sitecore-powershell-update-item-presentation-final-layout-ps1).

Beware! Make sure you test this script thoroughly before running against content editors content as they'll be more upset with you than if you asked then to add their components again. Ohh and make sure you take a backup first! :)
