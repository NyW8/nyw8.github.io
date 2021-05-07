$(function() {
	$('.terminal').on('click', function() {
  	$('#input').focus();
  });

  var currentDir = null;
  var loaderHTML = "<div id=\"loader-parent\"><div class=\"loader\"></div></div>";
  var baseUrl = "https://nyw8.github.io"

  $('#overlay').on('click', function() {
    setOverlay("none");
  });

  $('#info-icon').on('click', function() {
    setOverlay("flex");
  });

  var writeHistory = function(toWrite) {
    $('#history').append(toWrite + '<br/>');
    $('.terminal_half').scrollTop($('.terminal_half')[0].scrollHeight);
  };

  var clearInput = function() {
    $('#input').val('');
  };

  var setOverlay = function (displayValue) {
    $('#overlay').css("display", displayValue);
  };

  $('#input').on('keydown',function search(e) {
    setOverlay("none");
		if(e.keyCode == 13) {
      var inputString = $(this).val();
      clearInput();

      var arguments = inputString.split(" ");
      writeHistory(currentDir.pwd() + '&nbsp;>&nbsp;' + inputString);
      var cmd = arguments.shift();
      var preview_half = $('#preview_half');
      preview_half.css("display", "none");
      
      if(cmd === 'cd') {
        var path = arguments[0];
        var errMsg = "cd: " + path + ": No such directory";
        if (arguments.length < 1) {
          writeHistory("cd: Please specify a directory to move to");
          return;
        }
        var result = currentDir.cd(path);
        
        if (result == null) {
          writeHistory(errMsg);
          return;
        }

        currentDir = result;
        $('#path').html(currentDir.pwd()+'&nbsp;>&nbsp;');
      } else if (cmd === "pwd") {
        writeHistory(currentDir.pwd());
      } else if (cmd === "ls") {
        var path = arguments.length > 0 ? arguments[0] : ".";
        var errMsg = "ls: " + path + ": No such directory";
        var result = currentDir.cd(path);

        if (result == null) { 
          writeHistory(errMsg);
          return;
        }

        writeHistory(result.ls());
      } else if (cmd == "cat") {
        var path = arguments.length > 0 ? arguments[0] : ".";
        var errMsg = "cat: " + path + ": No such file or link";
        var splitPath = path.split("/");
        var result = currentDir.goToPath(splitPath, false);

        if (result == null || result.type == "dir") {
          writeHistory(errMsg);
          return;
        }

        writeHistory(result.cat());
        if (result.type == "file") {
          var elem = document.getElementById("preview_half");
          elem.innerHTML = loaderHTML;
          result.getContent(elem);
          preview_half.show();
        }
      } else if (arguments[0] == "clear") {
        $('#history').empty();
      } else {
        writeHistory(cmd + ": Command not recognized");
      }
    }
  });

  var parsePath = function(dir, splitPath) {
    splitPath = splitPath.filter(i => i !== ".");
    if (splitPath.length == 0)
      return dir;
    var oneLeft = (splitPath.length == 1); // only one file/dir down

    if (splitPath[0] === ".." && dir.parentDir != null) {
      if (oneLeft)
        return dir.parentDir;
      splitPath.shift();
      return parsePath(dir.parentDir, splitPath);
    } else if (splitPath[0] === "..") {
      return null;
    }
  
    var children = dir.children;
    for (var i = 0; i < dir.children.length; i++) {
      if (children[i].name == splitPath[0]) {
        splitPath.shift();
        return children[i].goToPath(splitPath, oneLeft);
      } 
    }
  }

  var getSubFolderEntries = function (parentDir, parentUrl) {
    /* Get projects and add them to the projects folder */
    $.ajax({
      url: parentUrl,
      type:'GET',
      success: function(data) {
        var sections = $(data).find(".chapter");
        for (var i = 0; i < sections.length; i++) {
          var currentSection = sections[i];
          var name = $(currentSection).find(".chapter_title")[0].innerHTML.toLowerCase().replaceAll(" ", "_");
          var url = baseUrl + $(currentSection).find("a").attr("href");
          var projectFile = new FileEntry(name, url, "inner_entry_content");
          parentDir.addChild(projectFile);
        }
      }
    });
  }
  
  var setupFileSystem = function () {
    // want to show folder for projects, coursework, files for each: about, resume, events, contact, "soft links" for gitlab, linkedin
    var root = new Dir("", null);
    var projectsFolder = new Dir("projects", root);
    var courseworkFolder = new Dir("coursework", root);
    getSubFolderEntries(projectsFolder, "https://nyw8.github.io/projects");
    getSubFolderEntries(courseworkFolder, "https://nyw8.github.io/coursework");

    var rootChildren = [projectsFolder, courseworkFolder,
      new FileEntry("about", baseUrl + "/about/", "about"), new FileEntry("resume", baseUrl + "/resume/", "resume"),
      new FileEntry("events", baseUrl + "/events/", "events"), new FileEntry("contact", baseUrl + "/contact/", "container_contact"),
      new Link("github", "https://github.com/NyW8"), new Link("linkedin", "https://www.linkedin.com/in/nyah-way/")];
    for (var i = 0; i < rootChildren.length; i++) {
      root.addChild(rootChildren[i]);
    }
    currentDir = root;
    $('#path').html(currentDir.pwd()+'&nbsp;>&nbsp;');
  }
  
  class Dir {
    constructor(name, parentDir) {
      this.name = name;
      this.parentDir = parentDir;
      this.children = [];
      this.type = "dir";
    }
  
    addChild (child) {
      this.children.push(child);
    }
  
    pwd () {
      if (this.parentDir == null) {
        return "/";
      }
      return this.parentDir.pwd() + this.name;
    }
  
    cd (path) {
      var location = parsePath(this, path.split('/'));
      if (location == null || location.type != "dir")
        return null;
      
      return location;
    }
  
    ls () {
      var output = this.parentDir == null ? "." : ".<br>..";
      for (var i = 0; i < this.children.length; i++) {
        output = output + "<br>" + this.children[i].name;
      }
      return output;
    }
  
    goToPath (splitPath, last) {
      return last ? this : parsePath(this, splitPath);
    }

    cat () {
      return null;
    }
  }
  
  class FileEntry {
    constructor (name, contentUrl, classToShow) {
      this.name = name + ".txt";
      this.contentUrl = contentUrl;
      this.classToShow = classToShow;
      this.type = "file";
    }
  
    goToPath(splitPath, last) {
      return last ? this : null;
    }
  
    cat () {
      return "View the requested content on the right >";
    }

    getContent(elem) {
      var classToShow = "." + this.classToShow;
      $.ajax({
        url: this.contentUrl,
        type:'GET',
        success: function(data) {
          var section = $(data).find(classToShow).parent();
          var htmlString = section.html();
          elem.innerHTML = htmlString;
        }
     });
    }
  }

  class Link {
    constructor (name, url) {
      this.name = name + ".ln";
      this.url = url;
      this.type = "link";
    }
  
    goToPath(splitPath, last) {
      return last ? this : null;
    }
  
    cat () {
      window.open(this.url, "_blank");
      return "Link opened in new tab";
    }
  }

  setupFileSystem();
});