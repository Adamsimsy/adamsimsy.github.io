When asked to generate post, you need to create a new Jekyll blog post using the source content [content.html](../../docs/post-source/content.html) file.

Also to make sure that any functional or interactive parts of the source content page remain, you can Navigate to the page using #playwright MCP with the URL http://127.0.0.1:4000/post-source/content.html

Create the new post using [2025-07-13-post-template.md](../../docs/_drafts/2025-07-13-post-template.md) as a template.

Place the post in the _drafts folder.

Once you've created the post, you can preview and test it by navifgating to the home using #playwright MCP and URL http://127.0.0.1:4000/ and finding a link to the new draft blog post.

Compare the new post to the http://127.0.0.1:4000/generated-posts/content.html to ensure the function parts of the page and styles are maintained.

Each time you make a change to the content or styles, allow 20 seconds for the changes to be reflected in the browser. You can use #playwright to refresh the page and see the updates.