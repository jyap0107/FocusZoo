var currentPomodoro = 1500;
var totalSessionTime = 0;
var pomodoroInterval;
var popupPort;
var buttonMode = "Start";
var timerMode = "Stop";
var blocked = ["www.youtube.com"];
var visitedBlocked = false;


/* TODO:
- Alerts with content script when: idle, break soon, start soon, blocked site.
- Options page
*/
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.idle.setDetectionInterval(60*5);
  if (details.reason == "install") {
    chrome.storage.sync.set({"points": 0}, function() {
      console.log("New points");
    })
    chrome.storage.sync.set({"collection":[]}, function() {
      console.log("New collections");
    })
    chrome.storage.sync.set({"image": ""}, function() {
      console.log("New image");
    })
    chrome.storage.sync.set({"blocked":[]}, function() {
      console.log("New blocked");
    })
    chrome.storage.sync.set({"current-tabs":[]});
  }
  // Blocked sites
  if (details.reason == "update") {
    if (timerMode == "Work") {
      chrome.tabs.query({}, function(tabs) {
        for (const tab of tabs) {
          var domain = getDomain(tab);
          if (blocked.includes(domain)) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {msg: "BLOCKED_SITE"});
            })
          }
        }
      })
    }
  }
})
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url.includes('http')) {
      chrome.scripting.executeScript({target: {tabId: tabId}, files: ['./inject_foreground.js']}, function () {
          chrome.scripting.executeScript({target: {tabId: tabId}, files: ['./foreground.bundle.js']}, function () {
              console.log('INJECTED AND EXECUTED');
              var domain = getDomain(tab);
              if (tab.url != undefined && changeInfo.status == "complete" && blocked.includes(domain) && !visitedBlocked && timerMode == "Work") { 
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  chrome.tabs.sendMessage(tabs[0].id, {msg: "BLOCKED_SITE"});
                  console.log("New tab blocked site")
                  visitedBlocked = true;
                })
              }
          });
      });
  }
});


chrome.runtime.onStartup.addListener(function() {
  console.log("Started!");
  chrome.storage.sync.set({"time":0});
  
})
// If state becomes idle, reset the Pomodoro
chrome.idle.onStateChanged.addListener(function(state) {
  if (state == "idle" && timerMode == "Work") {
    console.log("Reset");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {msg: "IDLE"});
    })
    clearInterval(pomodoroInterval);
    buttonMode = "Start"
    currentPomodoro = 1500;
    totalSessionTime = 0;
    timerMode = "Work;"
    popupPort.postMessage({countdown: "00:25:00", totalTime: "00:00:00", mode: buttonMode, timerMode: timerMode})
    
  }
})
// chrome.storage.onChanged.addListener(function(changes, areaName) {
//   console.log((changes))
// })
// Connection for communication of buttons and time changes
chrome.runtime.onConnect.addListener(function(port) {
  popupPort = port;
  port.onMessage.addListener(function(msg) {
    if (msg.cmd == "START_TIMER") {
      currentPomodoro = 1500;
      totalSessionTime = 0;
      timerMode = "Work";
      buttonMode = "End";
      popupPort.postMessage({countdown: "00:25:00", totalTime: "00:00:00", mode: buttonMode, timerMode: timerMode})
      pomodoroInterval = setInterval(incrementTimer, 1000);
    }
    if (msg.cmd == "STOP_TIMER") {
      clearInterval(pomodoroInterval)
      timerMode = "Stop"
      buttonMode = "Start";
    }
    if (msg.cmd == "GET_TIMES") {
      var countdownTimer = secToTimer(currentPomodoro);
      var sessionTimer = secToTimer(totalSessionTime);
      popupPort.postMessage({countdown: countdownTimer, totalTime: sessionTimer, timerMode: timerMode})
    }
    if (msg.cmd == "GET_MODE") {
      popupPort.postMessage({mode: buttonMode});
    }
  })
})
const getDomain = (tab) => {
  var url = tab.url;
  var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];
  return domain;
}
const incrementTimer = () => {
  currentPomodoro = currentPomodoro - 1;
  totalSessionTime = totalSessionTime + 1;
  var pts = 0;
  if (currentPomodoro % 5 == 0) pts = 10;
  chrome.storage.sync.get("points", (data) => {
    var total = data.points + pts
    chrome.storage.sync.set({"points": total});
    var countdownTimer = secToTimer(currentPomodoro);
    var sessionTimer = secToTimer(totalSessionTime);
    popupPort.postMessage({countdown: countdownTimer, totalTime: sessionTimer, points: total})
  })
  // console.log(currentPomodoro)
 
  if (currentPomodoro <= 0) {
    if (timerMode == "Work") {
      timerMode = "Break";
      currentPomodoro = 300;
      popupPort.postMessage({countdown: "00:05:00", timerMode: timerMode});
    }
    else if (timerMode == "Break") {
      timerMode = "Work";
      currentPomodoro = 1500;
      popupPort.postMessage({countdown: "00:25:00", timerMode: timerMode});
    }
  }
  if (currentPomodoro == 60) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (timerMode == "Work") {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "BREAK_SOON"})
      }
      if (timerMode == "Break") {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "WORK_SOON"})
      }
    })
  }
}
const secToTimer = (timeMetric) => {
  var hours = Math.floor((timeMetric % (60 * 60 * 24))/(60 * 60));
  var minutes = Math.floor((timeMetric % (60 * 60)) / (60));
  var seconds = Math.floor((timeMetric % (60)));
  var h = hours > 9 ? "" + hours : "0" + hours;
  var m = minutes > 9 ? "" + minutes : "0" + minutes;
  var s = seconds > 9 ? "" + seconds : "0" + seconds;
  var timer = (h + ":" + m + ":" + s);
  return timer;
}
