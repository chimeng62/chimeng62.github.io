var kayApe = "AIzaSyDBYVgCATp-oO7PCaJLvg6wZyl3gmTDwz4";

//This variable is for requesting to the API
var videoID = '';
var videoIdArr = '';

//initialise the input output editors
setupInputEditor();
setupOutputEditor();

//Pre-request api to speed up the generating process
setTimeout(function() {
  loadClient();
}, 100);

// This function gets urls from the input editor
function getUrls() {
  var urls = [];

  //Get all lines from the input editor
  var lines = inputEditor.session.doc.getAllLines();

  var counter = 0;
  for (var c = 0; c < lines.length; c++) {
    //if line not empty, assign to urls array
    if (lines[c]) {
      urls[counter] = lines[c];
      counter++;
    }
  }

  videoIdArr = Array(urls.length);

  for (var i = 0; i < urls.length; i++) {
    videoID = videoID + ',' + youtube_parser(urls[i]);
    videoIdArr[i] = youtube_parser(urls[i]);
  }
}


//This function loads the API using the api key
function loadClient() {
  gapi.client.setApiKey(kayApe);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function() {},
      function(err) {
        console.error("Error loading GAPI client for API", err);
      });
}

// Make sure the client is loaded before calling this method.
function execute() {
  return gapi.client.youtube.videos.list({
      "part": "snippet,contentDetails",
      "id": videoID
    })
    .then(function(response) {

        //Clear output editor
        outputEditor.setValue("");

        var videoNumber = 0;

        outputEditor.session.insert(0, "<ol>");
        addEmptyLine();
        for (var i = 0; i < videoIdArr.length; i++) {
          var title = response.result.items[i].snippet.title;
          var duration = convertDuration(response.result.items[i].contentDetails.duration);
          var li = `<li><strong>Video #${++videoNumber} - ${title} (Duration: ${duration})</strong></li>`;
          outputEditor.session.insert(i, li);
          addEmptyLine();
        }
        outputEditor.session.insert(0, "</ol>");
        addEmptyLine();
        outputEditor.session.insert(0, "<p>");
        for (var k = 0; k < videoIdArr.length; k++) {

          var iframe = `<iframe width='120' height='120' src='https://www.youtube.com/embed/${videoIdArr[k]}?rel=0;showinfo=0' allow='autoplay; encrypted-media' frameborder='0' allowfullscreen=''></iframe>`;

          addEmptyLine();
          outputEditor.session.insert(k, iframe);

        }
        addEmptyLine();
        outputEditor.session.insert(0, "</p>");

      },
      function(err) {
        console.error("Execute error", err);
      });
}//end function

gapi.load("client");


//This function is called by the Generate button
async function generate() {
  console.log(inputEditor.session.getValue().length);
  //Only run if the char length if more than 29 chars
  if (inputEditor.session.getValue().length > 29) {
    getUrls();
    execute();
  }
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function setupInputEditor() {
  window.inputEditor = ace.edit("input");
  inputEditor.setTheme("ace/theme/tomorrow_night_eighties");
  inputEditor.getSession().setMode("ace/mode/text");
  inputEditor.on("input", updateInput);
  setTimeout(updateInput, 100);

  inputEditor.focus();

  inputEditor.setOptions({
    fontSize: "12pt",
    showLineNumbers: true,
    showGutter: true,
    vScrollBarAlwaysVisible: false,
    wrap: true
  });

  inputEditor.setShowPrintMargin(false);
  inputEditor.setBehavioursEnabled(false);
}

function updateInput() {
  var shouldShow = !inputEditor.session.getValue().length;
  var node = inputEditor.renderer.emptyMessageNode;
  if (!shouldShow && node) {
    inputEditor.renderer.scroller.removeChild(inputEditor.renderer.emptyMessageNode);
    inputEditor.renderer.emptyMessageNode = null;
  } else if (shouldShow && !node) {
    node = inputEditor.renderer.emptyMessageNode = document.createElement("div");
    node.textContent = "One Youtube url on one line and as many as you'd like."
    node.className = "emptyMessage"
    inputEditor.renderer.scroller.appendChild(node);
  }
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
function setupOutputEditor() {
  window.outputEditor = ace.edit("output");
  outputEditor.setTheme("ace/theme/tomorrow_night_eighties");
  outputEditor.getSession().setMode("ace/mode/html");
  outputEditor.on("change", updateOutput);
  setTimeout(updateOutput, 100);

  outputEditor.setOptions({
    fontSize: "10.5pt",
    showLineNumbers: true,
    showGutter: true,
    vScrollBarAlwaysVisible: false,
    wrap: true
  });

  outputEditor.setShowPrintMargin(false);
  outputEditor.setBehavioursEnabled(false);
}

function updateOutput() {
  var shouldShow = !outputEditor.session.getValue().length;
  var node = outputEditor.renderer.emptyMessageNode;
  if (!shouldShow && node) {
    outputEditor.renderer.scroller.removeChild(outputEditor.renderer.emptyMessageNode);
    outputEditor.renderer.emptyMessageNode = null;
  } else if (shouldShow && !node) {
    node = outputEditor.renderer.emptyMessageNode = document.createElement("div");
    node.textContent = "Output"
    node.className = "outputMessage"
    outputEditor.renderer.scroller.appendChild(node);
  }
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function copyOutput() {
  var copyTextarea = document.querySelector('#copiedText');
  copyTextarea.value = outputEditor.getValue();
  copyTextarea.select();
  document.execCommand('copy');
  // Reset textarea
  copyTextarea.value = "";
}



//This function adds an empty line to the output editor
function addEmptyLine(){
  outputEditor.session.insert({
      row: outputEditor.session.getLength(),
        column: 0
      }, "\n");
}



//This function extracts video id from youtube url
function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : false;
}

//This function converts ISO 8601 duration to HH:MM:SS format
function convertDuration(t) {
  //dividing period from time
  var x = t.split('T'),
    duration = '',
    time = {},
    period = {},
    //just shortcuts
    s = 'string',
    v = 'variables',
    l = 'letters',
    // store the information about ISO8601 duration format and the divided strings
    d = {
      period: {
        string: x[0].substring(1, x[0].length),
        len: 4,
        // years, months, weeks, days
        letters: ['Y', 'M', 'W', 'D'],
        variables: {}
      },
      time: {
        string: x[1],
        len: 3,
        // hours, minutes, seconds
        letters: ['H', 'M', 'S'],
        variables: {}
      }
    };
  //in case the duration is a multiple of one day
  if (!d.time.string) {
    d.time.string = '';
  }

  for (var i in d) {
    var len = d[i].len;
    for (var j = 0; j < len; j++) {
      d[i][s] = d[i][s].split(d[i][l][j]);
      if (d[i][s].length > 1) {
        d[i][v][d[i][l][j]] = parseInt(d[i][s][0], 10);
        d[i][s] = d[i][s][1];
      } else {
        d[i][v][d[i][l][j]] = 0;
        d[i][s] = d[i][s][0];
      }
    }
  }
  period = d.period.variables;
  time = d.time.variables;
  time.H += 24 * period.D +
    24 * 7 * period.W +
    24 * 7 * 4 * period.M +
    24 * 7 * 4 * 12 * period.Y;

  if (time.H) {
    duration = time.H + ':';
    if (time.M < 10) {
      time.M = '0' + time.M;
    }
  }

  if (time.S < 10) {
    time.S = '0' + time.S;
  }

  duration += time.M + ':' + time.S;
  return duration;
}
