Steps to setup on Windows Jekyll

Import-Module $env:ChocolateyInstall\helpers\chocolateyProfile.psm1
choco install ruby --params '"/InstallDevKit"' -y
choco install ruby -y; refreshenv;
ridk install <!-- Select option 3 "MSYS2 and MINGW development toolchain" -->
gem install jekyll bundler

<!-- to run -->
bundle exec jekyll serve
