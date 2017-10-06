---
layout: post
title: Running PowerShell on macOS
tags: Linux, Windows, PowerShell
image: /public/img/powershell.jpg
---
It's been a while I have been using macOS as my primary operating system, you can read about my expreince [here](http://sirwan.info/archive/2017/06/04/SQL-Server-on-Linux-in-Docker-on-a-Mac/).

Today I wanted to run a PowerShell script, I searched around and figured out Microsoft has made PowerShell [open source](https://github.com/PowerShell/PowerShell) open source and the good news is that PowerShell is now cross-platform! this means that you can also run PowerShell scripts on Linux, macOS.

Actually to get PowerShell to work all you need to do is installing it using Homebrew:
```
brew cask install powershell
```
*Before preceding, make sure you have already installed [Homebrew-Cask](https://caskroom.github.io/) on your machine.*
>Homebrew-Cask extends Homebrew and brings its elegance, simplicity, and speed to macOS applications and large binaries alike.
It only takes 1 line in your shell to reach 3759 Casks maintained by 4856 contributors.

<center><img width="900" src="/public/img/powershell_installation_on_mac.png"></center>

That's it, now `PowerShell` is installed, so you can use it in your terminal:
<center><img width="900" src="/public/img/powershell_foreach.png"></center>

There's also a great [VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) to write, debug PowerShell scripts:
<center><img width="900" src="/public/img/powershell_debugging_on_vscode.png"></center>
