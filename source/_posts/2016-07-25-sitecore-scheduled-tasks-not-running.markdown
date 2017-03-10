---
layout: post
title:  "Sitecore scheduled tasks not running"
date:   2016-07-25 16:57:54
categories: sitecore
---
Today i've been trying to understand why I couldn't configure a scheduled task to run a Sitecore Powershell script. I found many useful articles which explained the configuration options for Sitecore scheduled tasks.

One notable detailed article can be found on the [Sitecore Community Docs](http://sitecore-community.github.io/docs/documentation/Sitecore%20Fundamentals/Asynchronous%20Tasks/) which reconfirmed my understanding of what triggers the scheduled tasks to run and how often the agent checks what tasks to be run.

I played around with these settings and still couldn't get my scheduled task to run. I then read a post on [stack overflow](http://stackoverflow.com/questions/13506278/sitecore-schedule-task-not-running#new-answer) which gave me a good pointer.

I needed to check that the database agent was being initialised correctly, where you should see the following towards the start of the Sitecore logs:

{% codeblock log %}
9988 17:25:38 INFO  Scheduler - Adding agents
9988 17:25:38 INFO  Scheduler - Adding agent: Sitecore.Tasks.UrlAgent (interval: 00:15:00)
9988 17:25:38 INFO  Scheduler - Adding agent: Sitecore.Tasks.TaskDatabaseAgent (interval: 00:02:00)
{% codeblock %}

So i then looked back through my logs to see when this was last logged. I then looked at the tail of the file to see which configuration file was added or changed.

I found that i had added "Include/zzz/InitializeSpeedBooster.config" to speed up the startup of Sitecore. This is an optional config when creating a new Sitecore instance using [Sitecore SIM](https://marketplace.sitecore.net/en/Modules/Sitecore_Instance_Manager.aspx).

I opened this config and spotted the issue straight away. To fix the issue but using the other speed boosting configuration, you can comment out the following line:

{% codeblock xml %}
<processor type="Sitecore.Pipelines.Loader.InitializeScheduler, Sitecore.Kernel">
	<patch:delete />
</processor>
{% codeblock %}

This resolved my issue and now all Sitecore scheduled tasks and scheduled Powershell scripts now run, as per the schedule configuration.

I hope this post will save someone else with the same scenario some time in resolving.