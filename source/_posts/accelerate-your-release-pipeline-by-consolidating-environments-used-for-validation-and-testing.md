---
title: >-
  Accelerate your release pipeline by consolidating environments used for validation and testing
date: 2018-06-19 08:27:56
categories: deployment
tags: 
- continuous delivery 
- testing 
- continuous deployment 
- release pipeline
- infrastructure
thumbnail: /images/testing-workshop/testing-workshop-open-graph.jpg
---
Today, all agile teams are trying to deliver their features into production faster to keep up with rapidly changing customer and business demands. 

A big contributing factor to feature delivery time is the release pipeline and the number of environments that the feature has to be deployed to. Typical environments being:

* Development
* Integration or SIT
* Test
* UAT
* Pre-production
* Production

Each environment taking time to deploy, execute testing, management of data and coordination between teams.

<!-- more -->

## A workshop approach to environment consolidation

An organisation I have been working with has been investing in optimizing their release pipeline. Striving to be able to deploy multiple times a day and reduce the feature lead time into production.

We felt that we could consolidate the environments in the release pipeline to accelerate our delivery. The problem was that it was difficult to agree which environments could be removed. Especially with multiple teams, responsible for multiple systems, which required environment alignment for validation of system integrations.

So we started with the question… __"What validation or testing do we need to get a release into production?"__

To answer this question, we decided to run a workshop with 3 key steps:

1. List all the types of the testing
2. Agree on the ubiquitous (testing) language
3. Organizing the testing groups

We started the workshop by placing cards up on a wall and I'll take you through each step so that you might be able to run a similar exercise with your team.

![Testing workshop approach](/images/testing-workshop/testing-workshop-approach.jpg)

### Workshop step 1 - List all the types of testing and validation

The first step began by equipping everyone with everyone's favorite agile tools.

![Testing workshop equiqment](/images/testing-workshop/testing-workshop-equipment.jpg)

Then each of us took 5 minutes to write all the types of validation or testing we felt was required to get a feature from development to production. We then stuck all of these on a wall.

![Testing workshop step 1](/images/testing-workshop/testing-workshop-step1.jpg)

We soon had a very interesting collection from a diverse set of skills and teams who are involved and responsible in getting a feature to production including developers, production owners, business analysts, testers, operations and release managers.

### Workshop step 2 - Ubiquitous (testing) language

We took a short break to grab some coffee before reconvening to agree on a common set of language for testing. Our Ubiquitous (testing) language.

This was the most challenging and interesting part of the workshop. 

We began organizing the tickets into groups as a team. Picking one ticket at a time and asking the person who wrote the ticket what the type of testing meant to them. We then discussed and agreed which group it should sit in.

It was difficult to get going, but as we discussed more tickets, we began to quickly gain a consensus on what we meant by each type of testing.

After we had grouped the types of testing, we agreed on a name for the type of testing or our ubiquitous (testing) language. The result can be seen below.

![Testing workshop step 2](/images/testing-workshop/testing-workshop-step2.jpg)

The most interesting question and discussion during the exercise was "What do we mean by User Acceptance Testing (UAT)?". After we had finished we had a good understanding of what UAT was and wasn't to us as we had our types of testing in categories. 

The consensus was, UAT was acceptance testing of a feature on an integrated environment, which was the responsibility of the team or squad that produced the feature.

### Workshop step 3 - Organizing the testing groups

After lunch, we met again to begin the final step of the workshop, organizing our validation and testing into a logical order and where we felt they could be executed together.

We tried to avoid naming these groups at first but naturally found we had some of the original environments in our delivery pipeline. The result can be seen below.

![Testing workshop step 3](/images/testing-workshop/testing-workshop-step3.jpg)

Some key points from this step and what we had agreed on above:

* __DEV environment__
  * Where teams or squads would carryout acceptance testing before changes are merged into the main source control trunk and continuously delivered into our pipeline
* __Build server__
  * Would continue to execute unit tests and code analysis on code commit. Failing a build or deployment with any regression
* __The Pipeline__
  * Our pipeline shrunk down to INT, TST and PRD and continuous deploying features merged into the main trunk to INT
* __INT environment__
  * All automated tests would run here after a deployment
* __TST environment__
  * Where the bulk of our testing would happen including any current manual validation. With the aim to automate moving forward.
  * The environment would be an exact replica of production with automated roll back of non-sensitive data, removing the need for a pre-production environment
* __PRD environment__
  * continuous health checks, synthetics and monitoring. Where possible any types of automated testing executed on earlier environments

What was key to this step and enabled us to consolidate environments, was challenging the need for traditional environments and where the testing was executed. Trying to utilize our consolidated environments and make better use of TST which would be a full replica of production.
	
## Conclusion

From running through this exercise in 3 discrete steps or sessions, as a team we were able to gain a consensus on the types of testing we required to get features into production. This was an important step for us as some people had slightly different but valid ideas about what a type of testing would validate, who would be responsible to execute it, what data was required and where it could run.

This enabled us to then consolidated where validation and testing would be executed to move from 6 to 4 environments (not including Build) which would have significant savings in:

* Time to release
* Effort and cost to provision and manage the environments
* Possible license or service savings

We're now busy putting this into action and changing our deployment pipeline, infrastructure as code environment provisioning and development practices.

It might not be possible to do this in every organization as there may be strict governance, control gates and specialized teams dedicated to testing in certain environments. Banks for example you'd have a hard time making any radical changes to established processes and controls in the release process. But you could focus on other factors to enable faster delivery such as trunk based development, componentization and feature flags. More on this hopefully in future blog posts.

But if you feel there is an opportunity to consolidate the number environments, with your team start with the questions __"what validation or testing do we need to get a release into production?"__ and __"can the testing be grouped and executed on a smaller number of environments?"__ which might be provisioned differently.



