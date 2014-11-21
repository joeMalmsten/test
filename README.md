[![Build Status](http://strider.aws.paperg.com/5270535ffc0c55a91e000050/paperg/placelocal/badge)](http://strider.aws.paperg.com/paperg/placelocal/)

# Placelocal

Placelocal is the flagship product for Paperg. It is a `php` app with several associated services. We use `composer` to manage `php` dependencies, `bower` for `js` dependencies and `grunt` for building the frontend components.<br/>

All of these tools have to be installed before you can use them to run the app.<br/><br/>
[node.js](http://nodejs.org/download/) **Note:** npm command can be used once node.js is installed.<br/>
[git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git) **Note:** npm can install git, however I prefer downloading from thier website though.<br/><br/>
**Note:** If you're new to git, view [Git Primer and Workflow](https://paperg.atlassian.net/wiki/pages/viewpage.action?pageId=2490418) and [Christian's Git Tutorial](https://paperg.atlassian.net/wiki/display/EN/Christian%27s+Git+Tutorial).
Bower:
```bash
"npm install -g bower"
```
Grunt: 
```bash
"npm install -g grunt-cli"
```

-g on npm causes the package to be installed globally.<br/>

## Setup
**Note for Windows users:** Before you download the repo make sure you have told `git` not to change line endings unsing this command in the bash/git prompt:

```bash
git config --global core.autocrlf false
```
So fork the repo, clone it to your machine and lets get started!

```bash
git clone https://github.com/YOURUSERNAMEHERE/placelocal.git
```

Lastly `cd ` into your placelocal repo for the next section.


## Installation
This section will go over the steps to install the dependencies for each platform.

### Windows


1. Install php on [Windows](http://www.microsoft.com/web/platform/phponwindows.aspx) <br/>**Note: This version will only be used to install and run composer. It is not the same as our production version of `php`** <br/>
**Note: Composer install requires a newer version of php so you may want to install XAMPP for windows instead  https://www.apachefriends.org/download.html** 

2. Download and install [composer](https://getcomposer.org/):
 ```bash
 php -r "readfile('https://getcomposer.org/installer');" | php
```
3. Install 

### OSX
```bash
brew tap josegonzalez/php
brew tap homebrew/dupes
brew install php php54-mcrypt composer node
```

### Linux
Assuming apt package manager. If you have something else then you know what you're doing.
```bash
sudo apt-get update
sudo apt-get install php php5-mcrypt nodejs vagrant
php -r "readfile('https://getcomposer.org/installer');" | php && sudo mv composer.phar /usr/local/bin/composer
```

### All
This will all happen in your bash (or equivalent) terminal.

1. `composer install`<br/>
This will populate your `vendor/` directory with our third-party dependencies.<br/>
If you get any errors then most likely you have to install some individual packages due to some questionable dependency tracing.

2. `npm install -g grunt-cli bower` <br/>
	This installs some globally needed packages, **only do this if you didn't do it in the earlier steps.**
3. `npm install`<br/>
   This will install all of the front-end dependencies
4. `grunt`<br/>
   This will build the app so it's ready for using

Now the app is built and ready for you to work on it and test. Inorder to replicate the production environment for testing and hacking we have implemented a `Vagrant` box. Now on to setting up and running that.

## DevBox

1. Install [Vagrant](http://www.vagrantup.com/)<br/>
   **Not needed for Linux**

2. Install [VirtualBox](https://www.virtualbox.org/)

3. Add entries to your [hosts file](http://en.wikipedia.org/wiki/Hosts_%28file%29).
   
   ### Windows
	* Go to `C:\Windows`
	* Right click the System32 folder and uncheck "read only"
	* Hit 'Ignore All' when prompted
	* Open Notepad as an administrator
 	* Open `C:/Windows/System32/Drivers/etc` in Notepad
 
   ### Linux/OSX
	I use [vim](http://vimdoc.sourceforge.net/) below but use your editor of choice. Note: vim is powerful but different from most editors, here's a [hotkey cheatsheet](http://www.glump.net/files/2012/08/vi-vim-cheat-sheet-and-tutorial.pdf) if you want to check it out!
	```bash
    sudo vim /etc/hosts
   ```

4. Add the following lines to your host file:

	```
	10.0.0.10   www.placelocal-dev.com
	10.0.0.10   api.placelocal-dev.com
	10.0.0.10   tracking.placelocal-dev.com
	10.0.0.10   nytimespub.placelocal-dev.com
	10.0.0.10   assets.placelocal-dev.com
	10.0.0.10   images.placelocal-dev.com
	```

5. With your terminal in the placelocal root, run `vagrant up`

	After vagrant finishes up, you will be able to use 
	```
	www.placelocal-dev.com.
	```

	In order to see creatives you will need to run templatem.sh from the /vagrant/services/templatem directory
6. To do this you will need to ssh into your vagrant box, from the local repo source directory run:

	```bash
	vagrant ssh
	```
	So long as your vagrant up was successful you should be able to enter your box no problem. Once inside go to this directory.

	```bash
	cd /vagrant/services/templatem/
	```

	Inside this directory you should only see a 'update.sh' file. **Note: the leading '/' in 'cd /vagrant/services/templatem/' is required otherwise you will not see the path.**

7. Run 
	```bash
	sh update.sh
	```

	This will populate the folder with the files
	```
	templatem.config.properties
	templatem.sh
	templatem.jar
	log4j.properties
	```

8. Run 
	```bash
	sh templatem.sh resettemplates
	```

	If you get a path error running this command you will need to go into 'template.config.properties' file on your local machine(vagrant shares folders with the local machine so changes made to local update the vagrant box) and update:
	```
	vagrant.files.translateFile
	vagrant.files.templateFolder
	``` 

	The local path to this file relative to repo source will be 'repo/services/templatem/'. 
	'vagrant.files.translateFile' has to point to the path location of the 'vagrant.files.translateFile' relative to your vagrant box.
	'vagrant.files.templateFolder' has to point to the path location of the folder that contains the templates relative to your vagrant box.
	Here are what my updated values look like: 
	```
	vagrant.files.translateFile = /vagrant/public_html/v3/v3framework/config/templatem.translate.json
	vagrant.files.templateFolder = /vagrant/public_html/v3/v3framework/adtemplates
	```

	you can do this for your local machine as well, you will probably NOT have a local database setup though so I would not worry about this unless specifically required to work locally instead of through the Devbox. For completeness sake here are my updated variables for the local machine:
	```
	local.files.translateFile = ../../public_html/v3/v3framework/config/templatem.translate.json
	local.files.templateFolder = ../../public_html/v3/v3framework/adtemplates
	```

9. Once 'sh templatem.sh resettemplates' works you need to process the templates with the command
	```bash
	sh templatem.sh process
	```
	Once this is finished you should be able to access the ad creator and see the templates.
	You will need to perform the templatem steps any time we update templates! 

#### Notes
 * The VM logs are in `/logs`
 * Read the [Vagrant documentation](http://docs.vagrantup.com/v2/getting-started/)

#### Known DevBox Issues
 * Php errors looking like this: <some files>.so, not found on line 0. See here for fix: https://gist.github.com/habahut/f0a3472638d5833a50b3
 * No aliases for viewing logs
 * Crawling is very slow
 * File changes sometimes don't sync on Linux. [Ticket](https://www.virtualbox.org/ticket/9069) and [Fix](http://stackoverflow.com/questions/6298933/shared-folder-in-virtualbox-for-apache)
 * If you are running into educoder/pest or mcrypt issues using composer to install dependencies see here: https://gist.github.com/habahut/764d824f71e2056879a9
