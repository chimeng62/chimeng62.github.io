//Import dependency
var urlParser = require("js-video-url-parser");


//Add click events to buttons
document.querySelector('#run').addEventListener('click', run);
document.querySelector('#copy').addEventListener('click', copyOutput);


//This variable is for requesting to the API
var apiKey = "AIzaSyDBYVgCATp-oO7PCaJLvg6wZyl3gmTDwz4";

//initialise the input output editors
setupInputEditor();
setupOutputEditor();

//Pre-connect to Youtube api to speed up the generating process
setTimeout(function() {
  loadYoutubeClient();
}, 500);

//This function is called by the Generate button
async function run() {
  //Only run if the input is more than 10 chars
  if (inputEditor.session.getValue().length > 10) {
    getUrls();
    await youtubeRequest();
    await vimeoRequest();
    printOutput();
  }
}

function printOutput() {
  printTitle();
  printIframe();
}

//This function prints out titles of the videos in li
function printTitle() {

  //Clear output editor
  outputEditor.setValue("");

  var videoNumber = 0;

  //Add <ol>
  outputEditor.session.insert(0, "<ol>");
  addEmptyLine();

  //Get the biggest array
  var arrSize = getBiggestArr(vimeoUrlArr, youtubeVideoIdArr);
  var vimeo = 0;
  var youtube = 0;
  for (var r = 0; r < arrSize; r++) {

    //Print vimeo titles
    if (vimeoUrlArr[r]) {
      var title = vimeoResponse[vimeo].title;
      var duration = convertVimeoDuration(vimeoResponse[vimeo].duration);
      var li = `  <li><strong>Video #${++videoNumber} ${title} (Duration: ${duration})</strong></li>`;
      outputEditor.session.insert(0, li);
      addEmptyLine();
      vimeo++;
    }

    //Print youtube titles
    if (youtubeVideoIdArr[r]) {
      var title = youtubeResponse.result.items[youtube].snippet.title;
      var duration = convertYoutubeDuration(youtubeResponse.result.items[youtube].contentDetails.duration);
      var li = `  <li><strong>Video #${++videoNumber} ${title} (Duration: ${duration})</strong></li>`;
      outputEditor.session.insert(0, li);
      addEmptyLine();
      youtube++;
    }
  }

  //Add </ol>
  outputEditor.session.insert(0, "</ol>");
  addEmptyLine();
} //end function


function printIframe() {
  outputEditor.session.insert(0, "<p>");
  //Get the biggest array
  var arrSize = getBiggestArr(vimeoUrlArr, youtubeVideoIdArr);
  var vimeo = 0;
  var youtube = 0;
  for (var r = 0; r < arrSize; r++) {
    addEmptyLine();
    //Print vimeo titles
    if (vimeoUrlArr[r]) {
      var videoId = vimeoResponse[vimeo].video_id;
      var iframe = `  <iframe width="120" height="120" src="https://player.vimeo.com/video/${videoId}?color=ffffff&amp;title=0&amp;byline=0&amp;portrait=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>`;
      outputEditor.session.insert(r, iframe);
      addEmptyLine();
      vimeo++;
    }

    //Print youtube titles
    if (youtubeVideoIdArr[r]) {
      var iframe = `  <iframe width='120' height='120' src='https://www.youtube.com/embed/${youtubeVideoIdArr[r]}?rel=0;showinfo=0' allow='autoplay; encrypted-media' frameborder='0' allowfullscreen=''></iframe>`;
      outputEditor.session.insert(0, iframe);
      addEmptyLine();
      youtube++;
    }
  }
  outputEditor.session.insert(0, "</p>");
}


//Find the biggest array between vimeoUrlArr and youtubeVideoIdArr
function getBiggestArr(arr1, arr2) {
  var arrSize = 0;
  if (arr1.length > arr2.length) {
    arrSize = arr1.length;
  } else if (arr1.length < arr2.length) {
    arrSize = arr2.length;
  } else {
    arrSize = arr1.length;
  }
  return arrSize;
}

//Variable for storing just the video id not the entire youtube url
//Youtube API only accept video ids not the full url
var youtubeVideoIdArr = [];
var youtubeVideoID = "";

//Vimeo accepts OEMBED so full url is accepted and no api key is needed
var vimeoUrlArr = [];

//This function loads the API using the api key
function loadYoutubeClient() {
  gapi.client.setApiKey(apiKey);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function() {},
      function(err) {
        console.error("Error loading GAPI client for API", err);
      });
}

//This function takes in a full Vimeo url
function vimeoFetch(url) {
  return fetch('https://vimeo.com/api/oembed.json?url=' + url) // return this promise
    .then((resp) => resp.json());
}

//These variable are for
var youtubeResponse = [];
var vimeoResponse = [];

//Send request to Vimeo
async function vimeoRequest() {
  var counter = 0;

  for (var o = 0; o < vimeoUrlArr.length; o++) {
    if (vimeoUrlArr[o]) {

      await vimeoFetch(vimeoUrlArr[o])
        .then(function(data) {
          vimeoResponse[counter] = data;
          counter++;
        });
    }
  } //end for loop
} //end function


// Sends request to Youtube
function youtubeRequest() {
  return gapi.client.youtube.videos.list({
      "part": "snippet,contentDetails",
      "id": youtubeVideoID
    })
    .then(function(response) {
        youtubeResponse = response;
      },
      function(err) {
        console.error("Execute error", err);
      });
} //end function

gapi.load("client");


// This function gets urls from the input editor
function getUrls() {
  //Reset arrays
  vimeoUrlArr = [];
  youtubeVideoIdArr = [];
  youtubeVideoID = "";

  //Get all lines from the input editor
  var urls = inputEditor.session.doc.getAllLines();
  var urlCounter = 0;


  for (var i = 0; i < urls.length; i++) {

    //parse each line, if returned 'undefined': not a correct url
    var parsedUrl = urlParser.parse(urls[i]);
    if (parsedUrl) {
      if (parsedUrl.provider == 'youtube') {

        //Replace both youtube_parser...
        youtubeVideoID = youtubeVideoID + ',' + parsedUrl.id;
        youtubeVideoIdArr[urlCounter] = parsedUrl.id;
        urlCounter++;
      }

      //if vimeo url, add the full url to vimeoUrlArr array
      if (parsedUrl.provider == 'vimeo') {

        //Use urlParser.prase(url[i]) and then create link using below
          var createdUrl= urlParser.create(
        {
            videoInfo: {
            provider: parsedUrl.provider,
            id:parsedUrl.id,
            mediaType:parsedUrl.mediaType,
            }
        })
        vimeoUrlArr[urlCounter] = createdUrl;
        urlCounter++;
      }
    } //end check returned value
  } //end for loop
} //end function


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function setupInputEditor() {
  window.inputEditor = ace.edit("input");
  inputEditor.setTheme("ace/theme/tomorrow_night_eighties");
  inputEditor.getSession().setMode("ace/mode/html");
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
  inputEditor.getSession().setUseWorker(false);
}

function updateInput() {
  var shouldShow = !inputEditor.session.getValue().length;
  var node = inputEditor.renderer.emptyMessageNode;
  if (!shouldShow && node) {
    inputEditor.renderer.scroller.removeChild(inputEditor.renderer.emptyMessageNode);
    inputEditor.renderer.emptyMessageNode = null;
  } else if (shouldShow && !node) {
    node = inputEditor.renderer.emptyMessageNode = document.createElement("div");
    node.textContent = "One Youtube/Vimeo link on one line."
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
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


function copyOutput() {
  if (outputEditor.session.getValue().length > 0) {
    var copyTextarea = document.querySelector('#copiedText');
    copyTextarea.value = outputEditor.getValue();
    copyTextarea.select();
    document.execCommand('copy');

    // Reset textarea
    copyTextarea.value = "";

    //Add flashStart class to overlay div to create a flash effect when copyOutput is called
    document.querySelector(".copyAlert").classList.add("flash");
    setTimeout(function() {
      document.querySelector(".copyAlert").classList.remove("flash");
    }, 500);
  }
}

//Create an overlay over outputEditor
copyAlertOverlay();

function copyAlertOverlay() {
  var node = document.createElement("div");
  node.className = "copyAlert"
  document.querySelector("#output .ace_scroller .ace_content").appendChild(node);
}


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//This function adds an empty line to the output editor
function addEmptyLine() {
  outputEditor.session.insert({
    row: outputEditor.session.getLength(),
    column: 0
  }, "\n");
}

//This function converts seconds to HH:MM::SS format
function convertVimeoDuration(Seconds) {
  var hours = Math.floor(Seconds / 3600);
  var minutes = Math.floor((Seconds - (hours * 3600)) / 60);
  var seconds = Seconds - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.round(seconds * 100) / 100;
  var result = "";

  if (hours > 0) {
    result += (hours < 10 ? +hours : hours);
    result += ":";
  }
  if (minutes > 0) {
    result += (minutes < 10 ? "0" + minutes : minutes);
  } else if (minutes < 1) {
    result += "0";
  }
  result += ":";
  result += (seconds < 10 ? "0" + seconds : seconds);
  return result;
}

//This function converts ISO 8601 duration to HH:MM:SS format
function convertYoutubeDuration(t) {
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
