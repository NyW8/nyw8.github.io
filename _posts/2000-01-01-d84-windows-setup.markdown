---
layout: page
title: "D84 Windows Setup"
img: d84-setup-banner.jfif
date: 2000-01-01 12:00:00 +0300
description: Windows setup for assignments for CSCD84
tag: [pages]
category: pages
---

Hello D84-ers! This is a quick tutorial of how to set up your Windows machine to be able to run your assignments. If anything doesn't work, or something is confusing to you, please let me know so I can improve it for the next person!

If you have already set up an Ubuntu WSL on your Windows machine, you can skip down to [Part 2](#part-2-setting-up-the-c-compiler). 

Note that there are many possible ways to set up your environment, and this only covers one of them.

## Part 1: Setting up WSL (Windows Subsystem for Linux)

Note that for WSL, you must have a 64-bit OS. I have also seen issues where WSL could not be installed on certain laptops bought in China, so try the steps below but you may need to use some other method to set up your computer.
1. From the search bar, search for and open "Turn Windows Features On or Off"
2. At the bottom, make sure "Windows Subsystem for Linux" is checked off.
3. Click OK, it should begin downloading and may ask you to restart
4. After restarting, open up the Windows Store and download (and open!) the "Ubuntu" app
   1. Note: Shouldn't matter which version of Ubuntu you download
5. Once opened, it will take a while to install. If it takes longer than 40 minutes, start hitting a key every once in a while to help it realize it's done.
6. Follow the prompts to create a UNIX user account. Your password will be asked for whenever you use `sudo`
7. To check that everything is working properly:
   1. Open Windows Command Prompt (can type `cmd` from the search bar)
   2. In the command prompt, type in `bash` and hit enter, this should open up your Linux terminal in the same folder that command prompt was opened in, and should see something like `user@DESKTOP-JDLSD30:/mnt/c/whatever/folder/you/were/in$` as the new prompt.

## Part 2: Setting up the C compiler
1. Open Windows Command Prompt and type in `bash` to enter Ubuntu
2. Enter `sudo apt-get update`
3. Enter `sudo apt install build-essential`
4. Check that the required compilers have been installed by running:
   1. `gcc --version`
   2. `g++ --version`

## Part 3: Setting up OpenGL

1. Download and install [Xming X Server](https://sourceforge.net/projects/xming/). You can set it up however you want as long as you install both Xming and XLaunch.
2. Open your `bash` terminal
3. Enter `export DISPLAY=:0`

That's it! You're set up to run D84 assignments! Good luck!