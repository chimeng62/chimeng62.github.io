// Copyright for portions of YoutubeVimeoInfoGenerator are held by [Julian Hangstörfer, 2014] as part of project jsVideoUrlParser.
// All other copyright for project YoutubeVimeoInfoGenerator are held by [Chimeng Chhay, 2019].
//
// The MIT License (MIT)
//
// Copyright (c) 2019 Chimeng Chhay
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
!function(){return function e(t,r,i){function o(s,n){if(!r[s]){if(!t[s]){var p="function"==typeof require&&require;if(!n&&p)return p(s,!0);if(a)return a(s,!0);var d=new Error("Cannot find module '"+s+"'");throw d.code="MODULE_NOT_FOUND",d}var u=r[s]={exports:{}};t[s][0].call(u.exports,function(e){return o(t[s][1][e]||e)},u,u.exports,e,t,r,i)}return r[s].exports}for(var a="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}}()({1:[function(e,t,r){var i=e("js-video-url-parser");window.inputEditor=ace.edit("input"),inputEditor.setTheme("ace/theme/tomorrow_night_eighties"),inputEditor.getSession().setMode("ace/mode/html"),inputEditor.on("input",V),setTimeout(V,100),inputEditor.focus(),inputEditor.setOptions({fontSize:"10.5pt",showLineNumbers:!0,showGutter:!0,vScrollBarAlwaysVisible:!1,wrap:!0}),inputEditor.setShowPrintMargin(!1),inputEditor.setBehavioursEnabled(!1),inputEditor.getSession().setUseWorker(!1),window.outputEditor=ace.edit("output"),outputEditor.setTheme("ace/theme/tomorrow_night_eighties"),outputEditor.getSession().setMode("ace/mode/html"),outputEditor.setOptions({fontSize:"10.5pt",showLineNumbers:!0,showGutter:!0,vScrollBarAlwaysVisible:!1,wrap:!0}),outputEditor.setShowPrintMargin(!1),outputEditor.setBehavioursEnabled(!1),document.querySelector("#run").addEventListener("click",async function(){1==P&&(function(){c=[],u=[],l="",[],m="",h=[],s=0,b=0,E=0,a=!0,v="";for(var e=inputEditor.session.doc.getAllLines(),t=0,r=0;r<e.length;r++){var o=i.parse(e[r]);if(o&&("youtube"==o.provider&&(l=l+","+o.id,u[t]=o.id,t++,b++),"vimeo"==o.provider)){var n=i.create({videoInfo:{provider:o.provider,id:o.id,mediaType:o.mediaType}});c[t]=n,E++,t++}}}(),l&&(await gapi.client.youtube.videos.list({part:"snippet,contentDetails",id:l}).then(function(e){y=e},function(e){console.error("Execute error",e)}),s=y.result.pageInfo.totalResults,function(){for(let e=0;e<y.result.items.length;e++)h.push(y.result.items[e].id)}(),(e=u,t=h,r=[e,t].sort((e,t)=>e.length-t.length),o=new Set(r[0]),r[1].filter(e=>!o.has(e))).forEach(function(e){m+=`&bullet; ${e}</br>`})),await async function(){f=0;for(var e=0,t=0;t<c.length;t++)c[t]&&await g(c[t]).then(function(t){T[e]=t,e++})}(),0==a&&b==s?(outputEditor.setValue(""),p(".outputMessage1",`Error: ${f} of ${E} Vimeo links are broken or inaccessible through the API.`),p(".outputMessage2",`Broken Vimeo url(s): </br>${v}</br>\n      Reason: Uploaders can set the privacy setting of their Vimeo videos to "Embed only", therefore they can't be found anywhere else on the web.`)):1==a&&b!==s?(outputEditor.setValue(""),p(".outputMessage1",`Error: ${b-s} of ${b} Youtube links are broken. Please check.`),p(".outputMessage2",`Broken Youtube video ID(s): </br>${m}</br>`)):0==a&&b!==s?(outputEditor.setValue(""),p(".outputMessage1",`Error: ${b-s} of ${b} Youtube links are broken and </br>${f} of ${E}  Vimeo links are broken or inaccessible through the API.`),p(".outputMessage2",`Broken Vimeo url(s): </br>${v}</br>\n      Broken Youtube video ID(s): </br>${m}</br>\n      Reason: Uploaders can set the privacy setting of their Vimeo videos to "Embed only", therefore they can't be found anywhere else on the web.`)):(d(".outputMessage1"),d(".outputMessage2"),function(){outputEditor.setValue("");var e=0;outputEditor.session.insert(0,"<ol>"),C();for(var t=w(c,u),r=0,i=0,o=0;o<t;o++){if(c[o]){var a=T[r].title,s=O(T[r].duration),n=`  <li><strong>Video #${++e} ${a} (Duration: ${s})</strong></li>`;outputEditor.session.insert(0,n),C(),r++}if(u[o]){var a=y.result.items[i].snippet.title,s=k(y.result.items[i].contentDetails.duration),n=`  <li><strong>Video #${++e} ${a} (Duration: ${s})</strong></li>`;outputEditor.session.insert(0,n),C(),i++}}outputEditor.session.insert(0,"</ol>"),C()}(),function(){outputEditor.session.insert(0,"<p>");for(var e=w(c,u),t=0,r=0;r<e;r++){if(C(),c[r]){var i=T[t].video_id,o=`  <iframe width='120' height='120' src='https://player.vimeo.com/video/${i}?color=ffffff&amp;title=0&amp;byline=0&amp;portrait=0' frameborder='0' webkitallowfullscreen='' mozallowfullscreen='' allowfullscreen=''></iframe>`;outputEditor.session.insert(r,o),C(),t++}if(u[r]){var o=`  <iframe width='120' height='120' src='https://www.youtube.com/embed/${u[r]}?rel=0;showinfo=0' frameborder='0' allowfullscreen=''></iframe>`;outputEditor.session.insert(0,o),C()}}outputEditor.session.insert(0,"</p>")}()));var e,t,r,o}),document.querySelector("#copy").addEventListener("click",function(){if(outputEditor.session.getValue().length>0){var e=document.querySelector("#copiedText");e.value=outputEditor.getValue(),e.select(),document.execCommand("copy"),e.value="",document.querySelector(".copyAlert").classList.add("flash"),setTimeout(function(){document.querySelector(".copyAlert").classList.remove("flash")},500)}});var o="AIzaSyDBYVgCATp-oO7PCaJLvg6wZyl3gmTDwz4",a=!0;setTimeout(function(){gapi.client.setApiKey(o),gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function(){},function(e){console.error("Error loading GAPI client for API",e)})},500);var s="";var n=outputEditor.renderer.emptyMessageNode;(n=outputEditor.renderer.emptyMessageNode=document.createElement("div")).className="outputMessage1",outputEditor.renderer.scroller.appendChild(n);n=outputEditor.renderer.emptyMessageNode;function p(e,t){document.querySelector(e).innerHTML=t}function d(e){outputEditor.renderer.emptyMessageNode&&(document.querySelector(e).innerHTML="")}(n=outputEditor.renderer.emptyMessageNode=document.createElement("div")).className="outputMessage2",outputEditor.renderer.scroller.appendChild(n);var u=[],l="",c=[];var m="",h=[];var y=[];gapi.load("client");var f=0,v="";function g(e){return fetch("https://vimeo.com/api/oembed.json?url="+e).then(e=>e.json()).catch(t=>{a=!1,f++,v+=`&bullet; ${e}</br>`})}var T=[];var b=0,E=0;function w(e,t){return e.length>t.length?e.length:e.length<t.length?t.length:e.length}inputEditor.on("change",function(){P=!1,U=0,I=0;var e=inputEditor.session.doc.getAllLines();inputEditor.session.getValue().length<1&&(D=!1);for(var t=0;t<e.length;t++){var r=i.parse(e[t]);r?"youtube"===r.provider?(U++,P=!0,D=!0):"vimeo"===r.provider&&(I++,P=!0,D=!0):0==D&&(P=!1)}A.innerHTML=` ${I}`,L.innerHTML=` ${U}`,(U>S||U<S)&&(S=U,L.classList.add("youtubeCounterFlash"),setTimeout(function(){L.classList.remove("youtubeCounterFlash")},500));(I>M||I<M)&&(M=I,A.classList.add("vimeoCounterFlash"),setTimeout(function(){A.classList.remove("vimeoCounterFlash")},500))});var U=0,I=0,L=document.querySelector("#youtubeCounter"),A=document.querySelector("#vimeoCounter");L.innerHTML=` ${U}`,A.innerHTML=` ${I}`;var S=0,M=0,P=!1,D=!1;function V(){var e=!inputEditor.session.getValue().length,t=inputEditor.renderer.emptyMessageNode;!e&&t?(inputEditor.renderer.scroller.removeChild(inputEditor.renderer.emptyMessageNode),inputEditor.renderer.emptyMessageNode=null):e&&!t&&((t=inputEditor.renderer.emptyMessageNode=document.createElement("div")).textContent="Paste the whole HTML of an item and make sure there's only one link on each line",t.className="emptyMessage",inputEditor.renderer.scroller.appendChild(t))}function C(){outputEditor.session.insert({row:outputEditor.session.getLength(),column:0},"\n")}function O(e){var t=Math.floor(e/3600),r=Math.floor((e-3600*t)/60),i=e-3600*t-60*r,o="";return t>0&&(o+=t<10?+t:t,o+=":"),r>0?o+=r<10?"0"+r:r:r<1&&(o+="0"),o+=":",o+=(i=Math.round(100*i)/100)<10?"0"+i:i}function k(e){var t,r=e.split("T"),i="",o={},a="string",s="variables",n="letters",p={period:{string:r[0].substring(1,r[0].length),len:4,letters:["Y","M","W","D"],variables:{}},time:{string:r[1],len:3,letters:["H","M","S"],variables:{}}};for(var d in p.time.string||(p.time.string=""),p)for(var u=p[d].len,l=0;l<u;l++)p[d][a]=p[d][a].split(p[d][n][l]),p[d][a].length>1?(p[d][s][p[d][n][l]]=parseInt(p[d][a][0],10),p[d][a]=p[d][a][1]):(p[d][s][p[d][n][l]]=0,p[d][a]=p[d][a][0]);return t=p.period.variables,(o=p.time.variables).H+=24*t.D+168*t.W+672*t.M+8064*t.Y,o.H&&(i=o.H+":",o.M<10&&(o.M="0"+o.M)),o.S<10&&(o.S="0"+o.S),i+=o.M+":"+o.S}!function(){var e=document.createElement("div");e.className="copyAlert",document.querySelector("#output .ace_scroller .ace_content").appendChild(e)}()},{"js-video-url-parser":2}],2:[function(e,t,r){var i,o;i=this,o=function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}var t=function(t){if("object"!==e(t))return"";t.params=t.params||{};var r="",i=0,o=Object.keys(t.params);if(0===o.length)return"";for(o.sort(),t.hasParams||(r+="?"+o[0]+"="+t.params[o[0]],i+=1);i<o.length;i+=1)r+="&"+o[i]+"="+t.params[o[i]];return r},r=function(e){return void 0===e?0:e.match(/^(\d+[smhdw]?)+$/)?function(e){var t,r=0,i={s:1,m:60,h:3600,d:86400,w:604800};t=(e=e.replace(/([smhdw])/g," $1 ").trim()).split(" ");for(var o=0;o<t.length;o+=2)r+=parseInt(t[o],10)*i[t[o+1]||"s"];return r}(e):e.match(/^(\d+:?)+$/)?function(e){for(var t=0,r=[1,60,3600,86400,604800],i=e.split(":"),o=0;o<i.length;o++)t+=parseInt(i[o],10)*r[i.length-o-1];return t}(e):0},i=function(e){if("string"!=typeof e)return{};var t,r={},i=(e=e.split("+").join(" ")).match(/(?:[?](?:[^=]+)=(?:[^&#]*)(?:[&](?:[^=]+)=(?:[^&#]*))*(?:[#].*)?)|(?:[#].*)/);if(null===i)return{};t=i[0].substr(1).split(/[&#=]/);for(var o=0;o<t.length;o+=2)r[decodeURIComponent(t[o])]=decodeURIComponent(t[o+1]||"");return r};function o(){for(var e=["parseProvider","parse","bind","create"],t=0;t<e.length;t++){var r=e[t];this[r]=this[r].bind(this)}this.plugins={}}var a=o;o.prototype.parseProvider=function(e){var t=e.match(/(?:(?:https?:)?\/\/)?(?:[^.]+\.)?(\w+)\./i);return t?t[1]:void 0},o.prototype.parse=function(e){if(void 0!==e){var t,r=this.parseProvider(e),o=this.plugins[r];if(r&&o&&o.parse)return(t=o.parse.call(o,e,i(e)))&&((t=function(e){e.params&&0===Object.keys(e.params).length&&delete e.params;return e}(t)).provider=o.provider),t}},o.prototype.bind=function(e){if(this.plugins[e.provider]=e,e.alternatives)for(var t=0;t<e.alternatives.length;t+=1)this.plugins[e.alternatives[t]]=e},o.prototype.create=function(e){var t=e.videoInfo,r=e.params,i=this.plugins[t.provider];if(r="internal"===r?t.params:r||{},i&&(e.format=e.format||i.defaultFormat,i.formats.hasOwnProperty(e.format)))return i.formats[e.format].apply(i,[t,Object.assign({},r)])};var s=new a,n=t;function p(){this.provider="canalplus",this.defaultFormat="embed",this.formats={embed:this.createEmbedUrl},this.mediaTypes={VIDEO:"video"}}p.prototype.parseParameters=function(e){return delete e.vid,e},p.prototype.parse=function(e,t){var r={mediaType:this.mediaTypes.VIDEO,id:t.vid};if(r.params=this.parseParameters(t),r.id)return r},p.prototype.createEmbedUrl=function(e,t){var r="http://player.canalplus.fr/embed/";return t.vid=e.id,r+=n({params:t})},s.bind(new p);var d=t;function u(){this.provider="coub",this.defaultFormat="long",this.formats={long:this.createLongUrl,embed:this.createEmbedUrl},this.mediaTypes={VIDEO:"video"}}u.prototype.parseUrl=function(e){var t=e.match(/(?:embed|view)\/([a-zA-Z\d]+)/i);return t?t[1]:void 0},u.prototype.parse=function(e,t){var r={mediaType:this.mediaTypes.VIDEO,params:t,id:this.parseUrl(e)};if(r.id)return r},u.prototype.createUrl=function(e,t,r){var i=e+t.id;return i+=d({params:r})},u.prototype.createLongUrl=function(e,t){return this.createUrl("https://coub.com/view/",e,t)},u.prototype.createEmbedUrl=function(e,t){return this.createUrl("//coub.com/embed/",e,t)},s.bind(new u);var l=t,c=r;function m(){this.provider="dailymotion",this.alternatives=["dai"],this.defaultFormat="long",this.formats={short:this.createShortUrl,long:this.createLongUrl,embed:this.createEmbedUrl,image:this.createImageUrl},this.mediaTypes={VIDEO:"video"}}m.prototype.parseParameters=function(e){return this.parseTime(e)},m.prototype.parseTime=function(e){return e.start&&(e.start=c(e.start)),e},m.prototype.parseUrl=function(e){var t=e.match(/(?:\/video|ly)\/([A-Za-z0-9]+)/i);return t?t[1]:void 0},m.prototype.parse=function(e,t){var r={mediaType:this.mediaTypes.VIDEO,params:this.parseParameters(t),id:this.parseUrl(e)};return r.id?r:void 0},m.prototype.createUrl=function(e,t,r){return e+t.id+l({params:r})},m.prototype.createShortUrl=function(e,t){return this.createUrl("https://dai.ly/",e,t)},m.prototype.createLongUrl=function(e,t){return this.createUrl("https://dailymotion.com/video/",e,t)},m.prototype.createEmbedUrl=function(e,t){return this.createUrl("https://www.dailymotion.com/embed/video/",e,t)},m.prototype.createImageUrl=function(e,t){return delete t.start,this.createUrl("https://www.dailymotion.com/thumbnail/video/",e,t)},s.bind(new m);var h=t,y=r;function f(){this.provider="twitch",this.defaultFormat="long",this.formats={long:this.createLongUrl,embed:this.createEmbedUrl},this.mediaTypes={VIDEO:"video",STREAM:"stream",CLIP:"clip"}}f.prototype.seperateId=function(e){return{pre:e[0],id:e.substr(1)}},f.prototype.parseChannel=function(e,t){var r=t.channel||t.utm_content||e.channel;return delete t.utm_content,delete t.channel,r},f.prototype.parseUrl=function(e,t,r){var i;return(i=e.match(/(clips\.)?twitch\.tv\/(?:(?:videos\/(\d+))|(\w+)(?:\/clip\/(\w+))?)/i))&&i[2]?t.id="v"+i[2]:r.video?(t.id=r.video,delete r.video):r.clip?(t.id=r.clip,t.isClip=!0,delete r.clip):i&&i[1]&&i[3]?(t.id=i[3],t.isClip=!0):i&&i[3]&&i[4]?(t.channel=i[3],t.id=i[4],t.isClip=!0):i&&i[3]&&(t.channel=i[3]),t},f.prototype.parseMediaType=function(e){var t;return e.id?e.isClip?(t=this.mediaTypes.CLIP,delete e.isClip):t=this.mediaTypes.VIDEO:e.channel&&(t=this.mediaTypes.STREAM),t},f.prototype.parseParameters=function(e){return e.t&&(e.start=y(e.t),delete e.t),e},f.prototype.parse=function(e,t){var r={};return(r=this.parseUrl(e,r,t)).channel=this.parseChannel(r,t),r.mediaType=this.parseMediaType(r),r.params=this.parseParameters(t),r.channel||r.id?r:void 0},f.prototype.createLongUrl=function(e,t){var r="";(e.mediaType===this.mediaTypes.STREAM&&(r="https://twitch.tv/"+e.channel),e.mediaType===this.mediaTypes.VIDEO)&&(r="https://twitch.tv/videos/"+this.seperateId(e.id).id,t.start&&(t.t=t.start+"s",delete t.start));return e.mediaType===this.mediaTypes.CLIP&&(r=e.channel?"https://www.twitch.tv/"+e.channel+"/clip/"+e.id:"https://clips.twitch.tv/"+e.id),r+=h({params:t})},f.prototype.createEmbedUrl=function(e,t){var r="https://player.twitch.tv/";return e.mediaType===this.mediaTypes.STREAM&&(t.channel=e.channel),e.mediaType===this.mediaTypes.VIDEO&&(t.video=e.id,t.start&&(t.t=t.start+"s",delete t.start)),e.mediaType===this.mediaTypes.CLIP&&(r="https://clips.twitch.tv/embed",t.clip=e.id),r+=h({params:t})},s.bind(new f);var v=t,g=r;function T(){this.provider="vimeo",this.alternatives=["vimeopro","vimeocdn"],this.defaultFormat="long",this.formats={long:this.createLongUrl,embed:this.createEmbedUrl,image:this.createImageUrl},this.mediaTypes={VIDEO:"video"}}T.prototype.parseUrl=function(e,t){var r=e.match(/(vimeo(?:cdn|pro)?)\.com\/(?:(?:channels\/[\w]+|(?:(?:album\/\d+|groups\/[\w]+|staff\/frame)\/)?videos?)\/)?(\d+)(?:_(\d+)(?:x(\d+))?)?(\.\w+)?/i);return r?(t.id=r[2],"vimeocdn"===r[1]&&(r[3]&&(t.imageWidth=parseInt(r[3]),r[4]&&(t.imageHeight=parseInt(r[4]))),t.imageExtension=r[5]),t):t},T.prototype.parseParameters=function(e){return this.parseTime(e)},T.prototype.parseTime=function(e){return e.t&&(e.start=g(e.t),delete e.t),e},T.prototype.parse=function(e,t){var r={mediaType:this.mediaTypes.VIDEO,params:this.parseParameters(t)};return(r=this.parseUrl(e,r)).id?r:void 0},T.prototype.createUrl=function(e,t,r){var i=e+t.id,o=r.start;return delete r.start,i+=v({params:r}),o&&(i+="#t="+o),i},T.prototype.createLongUrl=function(e,t){return this.createUrl("https://vimeo.com/",e,t)},T.prototype.createEmbedUrl=function(e,t){return this.createUrl("//player.vimeo.com/video/",e,t)},T.prototype.createImageUrl=function(e,t){var r="https://i.vimeocdn.com/video/"+e.id;return e.imageWidth&&e.imageHeight?r+="_"+e.imageWidth+"x"+e.imageHeight:e.imageWidth&&(r+="_"+e.imageWidth),void 0===e.imageExtension&&(e.imageExtension=".webp"),r+=e.imageExtension,delete e.imageExtension,r+=v({params:t})},s.bind(new T);var b=t,E=r;function w(){this.provider="wistia",this.alternatives=[],this.defaultFormat="long",this.formats={long:this.createLongUrl,embed:this.createEmbedUrl,embedjsonp:this.createEmbedJsonpUrl},this.mediaTypes={VIDEO:"video",EMBEDVIDEO:"embedvideo"}}w.prototype.parseUrl=function(e){var t=e.match(/(?:(?:medias|iframe)\/|wvideo=)([\w-]+)/);return t?t[1]:void 0},w.prototype.parseChannel=function(e){var t=e.match(/(?:(?:https?:)?\/\/)?([^.]*)\.wistia\./),r=t?t[1]:void 0;if("fast"!==r&&"content"!==r)return r},w.prototype.parseParameters=function(e,t){return e.wtime&&(e.start=E(e.wtime),delete e.wtime),e.wvideo===t.id&&delete e.wvideo,e},w.prototype.parseMediaType=function(e){return e.id&&e.channel?this.mediaTypes.VIDEO:e.id?(delete e.channel,this.mediaTypes.EMBEDVIDEO):void 0},w.prototype.parse=function(e,t){var r={id:this.parseUrl(e),channel:this.parseChannel(e)};if(r.params=this.parseParameters(t,r),r.mediaType=this.parseMediaType(r),r.id)return r},w.prototype.createUrl=function(e,t,r){return t.start&&(t.wtime=t.start,delete t.start),r+=b({params:t})},w.prototype.createLongUrl=function(e,t){if(e.mediaType!==this.mediaTypes.VIDEO)return"";var r="https://"+e.channel+".wistia.com/medias/"+e.id;return this.createUrl(e,t,r)},w.prototype.createEmbedUrl=function(e,t){var r="https://fast.wistia.com/embed/iframe/"+e.id;return this.createUrl(e,t,r)},w.prototype.createEmbedJsonpUrl=function(e){return"https://fast.wistia.com/embed/medias/"+e.id+".jsonp"},s.bind(new w);var U=t;function I(){this.provider="youku",this.defaultFormat="long",this.formats={embed:this.createEmbedUrl,long:this.createLongUrl,flash:this.createFlashUrl,static:this.createStaticUrl},this.mediaTypes={VIDEO:"video"}}I.prototype.parseUrl=function(e){var t=e.match(/(?:(?:embed|sid)\/|v_show\/id_|VideoIDS=)([a-zA-Z0-9]+)/);return t?t[1]:void 0},I.prototype.parseParameters=function(e){return e.VideoIDS&&delete e.VideoIDS,e},I.prototype.parse=function(e,t){var r={mediaType:this.mediaTypes.VIDEO,id:this.parseUrl(e),params:this.parseParameters(t)};if(r.id)return r},I.prototype.createUrl=function(e,t,r){var i=e+t.id;return i+=U({params:r})},I.prototype.createEmbedUrl=function(e,t){return this.createUrl("http://player.youku.com/embed/",e,t)},I.prototype.createLongUrl=function(e,t){return this.createUrl("http://v.youku.com/v_show/id_",e,t)},I.prototype.createStaticUrl=function(e,t){return this.createUrl("http://static.youku.com/v1.0.0638/v/swf/loader.swf?VideoIDS=",e,t)},I.prototype.createFlashUrl=function(e,t){var r="http://player.youku.com/player.php/sid/"+e.id+"/v.swf";return r+=U({params:t})},s.bind(new I);var L=t,A=r;function S(){this.provider="youtube",this.alternatives=["youtu","ytimg"],this.defaultFormat="long",this.formats={short:this.createShortUrl,long:this.createLongUrl,embed:this.createEmbedUrl,shortImage:this.createShortImageUrl,longImage:this.createLongImageUrl},this.imageQualities={0:"0",1:"1",2:"2",3:"3",DEFAULT:"default",HQDEFAULT:"hqdefault",SDDEFAULT:"sddefault",MQDEFAULT:"mqdefault",MAXRESDEFAULT:"maxresdefault"},this.defaultImageQuality=this.imageQualities.HQDEFAULT,this.mediaTypes={VIDEO:"video",PLAYLIST:"playlist",SHARE:"share",CHANNEL:"channel"}}S.prototype.parseVideoUrl=function(e){var t=e.match(/(?:(?:v|vi|be|videos|embed)\/(?!videoseries)|(?:v|ci)=)([\w-]{11})/i);return t?t[1]:void 0},S.prototype.parseChannelUrl=function(e){var t=e.match(/\/channel\/([\w-]+)/);return t?{id:t[1],mediaType:this.mediaTypes.CHANNEL}:(t=e.match(/\/(?:c|user)\/([\w-]+)/))?{name:t[1],mediaType:this.mediaTypes.CHANNEL}:void 0},S.prototype.parseParameters=function(e,t){return(e.start||e.t)&&(e.start=A(e.start||e.t),delete e.t),e.v===t.id&&delete e.v,e.list===t.id&&delete e.list,e},S.prototype.parseMediaType=function(e){if(e.params.list&&(e.list=e.params.list,delete e.params.list),e.id&&!e.params.ci)e.mediaType=this.mediaTypes.VIDEO;else if(e.list)delete e.id,e.mediaType=this.mediaTypes.PLAYLIST;else{if(!e.params.ci)return;delete e.params.ci,e.mediaType=this.mediaTypes.SHARE}return e},S.prototype.parse=function(e,t){var r=this.parseChannelUrl(e);if(r)return r;var i={params:t,id:this.parseVideoUrl(e)};return i.params=this.parseParameters(t,i),i=this.parseMediaType(i)},S.prototype.createShortUrl=function(e,t){var r="https://youtu.be/"+e.id;return t.start&&(r+="#t="+t.start),r},S.prototype.createLongUrl=function(e,t){var r="",i=t.start;return delete t.start,e.mediaType===this.mediaTypes.CHANNEL&&(e.id?r+="https://www.youtube.com/channel/"+e.id:e.name&&(r+="https://www.youtube.com/c/"+e.name)),e.mediaType===this.mediaTypes.PLAYLIST&&(t.feature="share",r+="https://www.youtube.com/playlist"),e.mediaType===this.mediaTypes.VIDEO&&(t.v=e.id,r+="https://www.youtube.com/watch"),e.mediaType===this.mediaTypes.SHARE&&(t.ci=e.id,r+="https://www.youtube.com/shared"),e.list&&(t.list=e.list),r+=L({params:t}),e.mediaType!==this.mediaTypes.PLAYLIST&&i&&(r+="#t="+i),r},S.prototype.createEmbedUrl=function(e,t){var r="https://www.youtube.com/embed";return e.mediaType===this.mediaTypes.PLAYLIST?t.listType="playlist":(r+="/"+e.id,"1"===t.loop&&(t.playlist=e.id)),e.list&&(t.list=e.list),r+=L({params:t})},S.prototype.createImageUrl=function(e,t,r){return e+t.id+"/"+(r.imageQuality||this.defaultImageQuality)+".jpg"},S.prototype.createShortImageUrl=function(e,t){return this.createImageUrl("https://i.ytimg.com/vi/",e,t)},S.prototype.createLongImageUrl=function(e,t){return this.createImageUrl("https://img.youtube.com/vi/",e,t)},s.bind(new S);var M=t,P=r;function D(){this.provider="soundcloud",this.defaultFormat="long",this.formats={long:this.createLongUrl,embed:this.createEmbedUrl},this.mediaTypes={TRACK:"track",PLAYLIST:"playlist",APITRACK:"apitrack",APIPLAYLIST:"apiplaylist"}}return D.prototype.parseUrl=function(e,t){var r=e.match(/soundcloud\.com\/(?:([\w-]+)\/(sets\/)?)([\w-]+)/i);return r?(t.channel=r[1],"playlists"===r[1]||r[2]?t.list=r[3]:t.id=r[3],t):t},D.prototype.parseParameters=function(e){return e.t&&(e.start=P(e.t),delete e.t),e},D.prototype.parseMediaType=function(e){return e.id&&("tracks"===e.channel?(delete e.channel,delete e.params.url,e.mediaType=this.mediaTypes.APITRACK):e.mediaType=this.mediaTypes.TRACK),e.list&&("playlists"===e.channel?(delete e.channel,delete e.params.url,e.mediaType=this.mediaTypes.APIPLAYLIST):e.mediaType=this.mediaTypes.PLAYLIST),e},D.prototype.parse=function(e,t){var r={};if((r=this.parseUrl(e,r)).params=this.parseParameters(t),(r=this.parseMediaType(r)).id||r.list)return r},D.prototype.createLongUrl=function(e,t){var r="",i=t.start;return delete t.start,e.mediaType===this.mediaTypes.TRACK&&(r="https://soundcloud.com/"+e.channel+"/"+e.id),e.mediaType===this.mediaTypes.PLAYLIST&&(r="https://soundcloud.com/"+e.channel+"/sets/"+e.list),e.mediaType===this.mediaTypes.APITRACK&&(r="https://api.soundcloud.com/tracks/"+e.id),e.mediaType===this.mediaTypes.APIPLAYLIST&&(r="https://api.soundcloud.com/playlists/"+e.list),r+=M({params:t}),i&&(r+="#t="+i),r},D.prototype.createEmbedUrl=function(e,t){var r="https://w.soundcloud.com/player/";return delete t.start,e.mediaType===this.mediaTypes.APITRACK&&(t.url="https%3A//api.soundcloud.com/tracks/"+e.id),e.mediaType===this.mediaTypes.APIPLAYLIST&&(t.url="https%3A//api.soundcloud.com/playlists/"+e.list),r+=M({params:t})},s.bind(new D),s},"object"==typeof r&&void 0!==t?t.exports=o():"function"==typeof define&&define.amd?define(o):i.urlParser=o()},{}]},{},[1]);
