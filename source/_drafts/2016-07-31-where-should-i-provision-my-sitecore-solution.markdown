---
layout: post
title:  "Where should i provision my Sitecore solution"
date:   2016-07-31 16:57:54
categories: cloud
---
Private or public cloud. Pros and cons for each. Some good ideas on http://event.on24.com/eventRegistration/console/EventConsoleApollo.jsp?&eventid=1215235&sessionid=1&username=&partnerref=&format=fhaudio&mobile=false&flashsupportedmobiledevice=false&helpcenter=false&key=0F90FAF8102CEF7E6247C50E8594EE7B&text_language_id=en&playerwidth=1000&playerheight=650&overwritelobby=y&eventuserid=146949431&contenttype=A&mediametricsessionid=116809219&mediametricid=1768239&usercd=146949431&mode=launch

# Key architecture options

- CM in private cloud and then CD in cloud
- Live mode in cloud
- All in cloud

Then AWS or Azure. Which cloud?

Pros for Azure.
Very close relationship between Sitecore and Microsoft teams. As Sitecore built on Microsoft technologies very aligned. Also many Azure features leveraged by the product.
Many vendors align to a provider and Sitecore are aligning to Azure.
MSSQL scalability on Azure.
XP3 is a common configuration.
If using Lucene need to be aware of disk performance. Advise using P20 which uses SSD. P30 disk for MSSQL for high read and write performance.

Scaling up and down considerations for Sitecore.

Azure SQL is not supported by Sitecore currently due to limiations.

If using Sitecore Azure module then it is support. But should stick with SQL IaaS.

Sitecore 8.1 which is IaaS only but there is also Sitecore Azure module.

Note. Sitecore 8.1 not offically supported to run as an Azure web app. Expected to be support in Sitecore 8.2.

Goal is to run it as PaaS, however not support in 8.1. Has to be IaaS.

It is possible to do PaaS with Sitecore XM as you don't need XP MongoDB. Could have both CM and CD as WebApp. But maybe a Hybrid where CM is run as IaaS in a hybrid.

Be aware of licenseing limitation (currently) for auto-scaling.

Discuss configuration for Zero downtime. Protect against region downtime and deployment downtime.

A challenge for multiple region was replication of the Core replication. Was expensive but now able to do SQL replication on all pricing tiers.

Check what the limitation is on Sitecore on Azure SQL.

Read about immutable infrastructure environments.

Something to consider and often gets forgotten when using Immutable architecture are logs.