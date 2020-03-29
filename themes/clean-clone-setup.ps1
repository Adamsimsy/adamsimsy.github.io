#Install node if required http://nodejs.org/

npm install
npm install hexo-cli -g
npm install hexo-server --save
set-executionpolicy remotesigned

#setup theme - also have a fork of this.
npm i -S hexo-generator-search hexo-generator-feed hexo-renderer-less hexo-autoprefixer hexo-generator-json-content
git clone https://github.com/stkevintan/hexo-theme-material-flow themes/hexo-theme-material-flow

#start server
hexo server