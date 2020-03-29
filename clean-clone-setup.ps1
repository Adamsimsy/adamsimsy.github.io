#Install node if required http://nodejs.org/

git clone git@github.com:Adamsimsy/adamsimsy.github.io.git
git checkout -b source origin/source
git submodule update --init --recursive --remote
npm install

#might be needed on new pc
npm install hexo-cli -g
npm install hexo-server --save
set-executionpolicy remotesigned
npm i -S hexo-generator-search hexo-generator-feed hexo-renderer-less hexo-autoprefixer hexo-generator-json-content

#start server
hexo server