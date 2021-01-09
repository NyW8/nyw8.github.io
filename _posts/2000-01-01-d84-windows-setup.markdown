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
   1. `gcc --version` <br>Example output should look something like <br>`gcc (Ubuntu 7.4.0-1ubuntu1~18.04.1) 7.4.0` <br>with lots more after it
   2. `g++ --version` <br>Example output should look something like <br>`g++ (Ubuntu 7.4.0-1ubuntu1~18.04.1) 7.4.0` <br>with lots more after it

## Part 3: Setting up OpenGL

1. Download and install <a href="https://sourceforge.net/projects/xming/" target="_blank">Xming X Server</a>. You can set it up however you want as long as you install both Xming and XLaunch.
2. Open your `bash` terminal
3. Enter `export DISPLAY=:0` this will have to be run whenever you have opened a new `bash` terminal and are planning on running an assignment
4. Note that you do not need to do anything else for Xming to set it up

## Part 4: Test Your Setup!
1. Download this <a href="https://utoronto-my.sharepoint.com/:u:/g/personal/n_way_mail_utoronto_ca/EXADc8jJQxVGtneawvmqjdQBw9OrIEyfy4Fy6YkO4GXRfQ?e=d3bu2A" target="_blank">script</a> and save it in your (nicely filed!) CSCD84 class folder 
2. Open your class folder in the `bash` terminal
3. (Don't forget to run `export DISPLAY=:0` if this is a newly opened `bash` terminal)
4. Compile with `gcc d84_setup_test.c -lm -lglut -lGL -lGLU -o d84_setup_test`
5. Run with `./d84_setup_test`
6. If no window pops up, something went wrong. Make sure you set the `DISPLAY` value on this terminal and retrace the steps on this page.

That's it! You're set up to run D84 assignments! Good luck!