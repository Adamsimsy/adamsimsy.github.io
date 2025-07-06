---
layout: post
title: "Publish a ASP.NET Core Web App to Azure using Github Actions"
date: 2020-03-29 12:37:38
categories: DevOps
tags: gitub-actions azure aspnetcore webapp
thumbnail: /images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/actions-opengraph.jpg
---
I've been working a lot with Azure DevOps to build and deploy many different types of applications to Azure Cloud, On-premise servers and handheld devices. But i thought it would be interesting to try and compare this to Github Actions which I believe is underpinned by Azure DevOps as it is owned by Microsoft.

![Github actions build](/images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/actions-opengraph.jpg)

<!-- more -->

## Create a Vanilla ASP.NET Core 3.1 web app

So the app i choose to build and deploy was a ASP.NET Core 3.1 template app. I created a clean Github repo which can be [found here](https://github.com/Adamsimsy/aspnetcore-github-actions-publish-to-azure).

To do this i used the following command and specified the netcoreapp Framework version as i had multiple installed:
{% highlight bash %}
dotnet new mvc -o Website --framework netcoreapp3.1
{% endhighlight %}

This should give you something like the following:
![aspnetcore source code](/images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/aspnetcore-source-code.jpg)

## Setup a new Github Actions Workflow

Whilst logged into Github, navigated to your repository and then click Actions. You have many workflow templates to choose from including a ".NET Core" example:
![Github actions templates](/images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/github-action-templates.jpg)

However, select "Set up a worflow yourself" which will give you the following:

![vanilla github actions workflow](/images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/vanilla-action-workflow.jpg)

Accept the default path and "main.yml" path in your repo.

Then paste in the following snippet which is also available from [here](https://github.com/Adamsimsy/aspnetcore-github-actions-publish-to-azure/blob/master/.github/workflows/main.yml):
{% highlight yaml %}
name: .NET Core

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
    
jobs:

  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2

    - name: Setup .NET Core
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 3.1.101

    - name: Publish
      run: dotnet publish source/Website/Website.csproj --configuration Release -o ./output/

    - name: deploy to azure web app
      uses: azure/webapps-deploy@v2
      with: 
        app-name: aspnetcore-github-actions-publish-to-azure
        publish-profile: ${ { secrets. } }
        package: ./output/
{% endhighlight %}

Optionally, if you want to attach the build as an artifact to the Github Action build, you can do this with the following snippet added to your "main.yml":
{% highlight yaml %}
    - name: Publish artifact
      uses: actions/upload-artifact@v1
      with:
        name: aspnetcore-webapp
        path: ./output/
{% endhighlight %}

You'll then see the artifact attached as follows:

![Github action artifact](/images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/action-artifact.jpg)

However, I don't believe at this time you can specify the artifact as the package path for the Azure deployment action. I tried several configurations, review the documentation and the code for the action on Github. Please comment if you work this part out!

## Create an Azure Web App and configure publishing profile in Github secrets
Next you'll need to create a new Azure Web App. I won't take you through these steps and there are many tutorials online. But if you are testing, i recommend setting up a Azure trial account and deploying a free Dev/Test App Service Plan on the F1 tier.

Once you have your web app, you'll then need to get your publishing profile. Do this by clicking "Get publish profile":

![Get web app publish profile](/images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/get-webapp-publish-profile.jpg)

This will give you an XML like the following:

{% highlight xml %}
<publishData><publishProfile profileName="test-github-action-webapp - Web Deploy" publishMethod="MSDeploy" />
...
</publishData>
{% endhighlight %}

Now you need to configure your secret in Github. In your repository click Settings > Secrets. Then create a new secret called "azureWebAppPublishProfile" and paste in the full XML from your publish profile from your Azure Web App. See the following example:

![Configure Github action secret](/images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/configure-github-action-sceret.jpg)

You'll also need to make sure the name of your web app (in my example "aspnetcore-github-actions-publish-to-azure") is reflected in your "main.yml" otherwise it won't deploy correctly.

## Now trigger a build to deploy your web app to Azure
You can either trigger a build manually in Github by re-running a previous job:

![Re-run workflow job](/images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/re-run-action.jpg)

Alternatively, just make a new commit to your master branch as per the branch trigger in the action workflow "main.yml" file.

## Your web app is now deployed to Azure using Github actions

You'll now be able to view your published Azure Web App that was built and deployed using Github actions. You can see my demo web app at [https://aspnetcore-github-actions-publish-to-azure.azurewebsites.net](https://aspnetcore-github-actions-publish-to-azure.azurewebsites.net).

I hope this article is helpful in getting you going with your first ASP.NET Core Web App deployed to Azure using Github Actions.

![The published website](/images/publish-a-aspnet-core-web-app-to-azure-using-github-actions/published-website.jpg)