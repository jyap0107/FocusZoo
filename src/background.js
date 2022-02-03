var currentPomodoro = 1500;
var totalSessionTime = 0;
var pomodoroInterval;
var popupPort;
var navbarPort;
var settingsPort;
var blockedPagePort;
var buttonMode = "Start";
var timerMode = "Stop";

var blocked = [];
chrome.storage.sync.get("blocked", (data) => {
  blocked = data.blocked;
})
var visitedBlocked = false;

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
    chrome.storage.sync.set({"defaultBlocked":false})
    chrome.storage.sync.set({"workTime":30})
    chrome.storage.sync.set({"breakTime":5})
    chrome.storage.sync.set({"blockAlert":false})
    chrome.storage.sync.set({"currentAnimalsCount":0})
    chrome.storage.sync.set({"currentAnimals": []})
    chrome.storage.sync.set({"oneStarAnimals": []})
    chrome.storage.sync.set({"twoStarAnimals": []})
    chrome.storage.sync.set({"threeStarAnimals": []})
  }
  chrome.storage.sync.set({"totalAnimals":10})
  chrome.storage.sync.set({"totalAnimals":10})
  // Blocked sites
  if (details.reason == "update") {
    if (timerMode == "Work") {
      chrome.tabs.query({}, function(tabs) {
        for (const tab of tabs) {
          var domain = getDomain(tab);
          if (blocked.includes(domain)) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {msg: "BLOCKED_SITE"});
              console.log("STARTED blocked site")
              if (popupPort != undefined) popupPort.postMessage({disabled: true})
              visitedBlocked = true;
            })
          }
        }
      })
    }
  }
})
/*
FOUR CASES: (Could be good to have an indicator on the popup)
1. Started timer when blocked site is open
2. Started timer then opened a blocked site in separate tab
3. Started timer then opened blocked site in this tab
4. Break => Work and blocked site is open

*/
chrome.tabs.query({}, function(tabs) {
  for (var i = 0; i < tabs.length; i++) {
    var tabId = tabs[i].id;
    chrome.scripting.executeScript({target: {tabId: tabId}, files: ['./inject_foreground.js']}, function () {
      chrome.scripting.executeScript({target: {tabId: tabId}, files: ['./foreground.bundle.js']}, function () {
          console.log('INJECTED AND EXECUTED');
          
      });
  });
  }
})
// Opened a block site in this tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url.includes('http')) {
      chrome.scripting.executeScript({target: {tabId: tabId}, files: ['./inject_foreground.js']}, function () {
          chrome.scripting.executeScript({target: {tabId: tabId}, files: ['./foreground.bundle.js']}, function () {
              var domain = getDomain(tab);
              if (tab.url != undefined && changeInfo.status == "complete" && blocked.includes(domain) && !visitedBlocked && timerMode == "Work") { 
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  chrome.tabs.sendMessage(tabs[0].id, {msg: "BLOCKED_SITE"});
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
    totalSessionTime = 0;
    timerMode = "Work;"
    visitedBlocked = false;
    chrome.storage.sync.get("workTime", function(data) {
      var work = data.workTime
      currentPomodoro = 60 * work;
      var countdown = secToTimer(work * 60)
      popupPort.postMessage({countdown: countdown, totalTime: "00:00:00", mode: buttonMode, timerMode: timerMode})
    })
    
  }
})
// chrome.storage.onChanged.addListener(function(changes, areaName) {
//   console.log((changes))
// })
// Connection for communication of buttons and time changes
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name == "blockedPage") console.log(port.name)
  if (port.name == "popup") popupPort = port;
  if (port.name == "navbar") navbarPort = port;
  if (port.name == "settings") settingsPort = port;
  if (port.name == "blockedPage") blockedPagePort = port;
  if (popupPort != undefined) {
    popupPort.onMessage.addListener(function(msg) {
      console.log("Started")
      if (msg.cmd == "START_TIMER") {
        visitedBlocked = false;
        totalSessionTime = 0;
        timerMode = "Work";
        buttonMode = "End";
        chrome.storage.sync.get(["workTime", "breakTime"], function(data) {
          var work = data.workTime
          currentPomodoro = 60 * work;
          // var countdown = work / 60 >= 1 ? "0" + work/60 : "00";
          // countdown += ":";
          // work = work % 60
          // countdown = work >= 10 ? countdown + work + ":00" : countdown + "0" + work + ":00"
          var countdown = secToTimer(work * 60)
          popupPort.postMessage({countdown: countdown, totalTime: "00:00:00", mode: buttonMode, timerMode: timerMode, disabled: visitedBlocked})
          pomodoroInterval = setInterval(incrementTimer, 1000);
          if (settingsPort != undefined) settingsPort.postMessage({active: true})
          if (blockedPagePort != undefined) blockedPagePort.postMessage({active: true})
          chrome.tabs.query({}, function(tabs) {
            for (const tab of tabs) {
              var domain = getDomain(tab);
              if (blocked.includes(domain)) {
                console.log(domain)
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs2) {
                  console.log(tabs2[0].id)
                  chrome.tabs.sendMessage(tabs2[0].id, {msg: "BLOCKED_SITE"});
                  console.log("interval blocked site")
                  if (popupPort != undefined) popupPort.postMessage({disabled: true})
                  visitedBlocked = true;
                  if (settingsPort != undefined) settingsPort.postMessage({active: false})
                  if (blockedPagePort != undefined) blockedPagePort.postMessage({active: false})
                })
              }
            }
          })
        })
        // cleanup disconnect ports so you dont send msgs to disconnected ports
      }
      if (msg.cmd == "STOP_TIMER") {
        clearInterval(pomodoroInterval)
        timerMode = "Stop"
        buttonMode = "Start";
        visitedBlocked = false;
        if (settingsPort != undefined) settingsPort.postMessage({active: false})
        if (blockedPagePort != undefined) blockedPagePort.postMessage({active: false})
      }
      if (msg.cmd == "GET_TIMES") {
        chrome.storage.sync.get("workTime", function(data) {
    
          var countdownTimer = buttonMode == "Start" ? secToTimer(data.workTime * 60) : secToTimer(currentPomodoro)
          var sessionTimer = secToTimer(totalSessionTime);
          popupPort.postMessage({countdown: countdownTimer, totalTime: sessionTimer, timerMode: timerMode})
        })
      }
      if (msg.cmd == "GET_MODE") {
        popupPort.postMessage({mode: buttonMode});
      }
      if (msg.cmd == "GET_DISABLED") {
        popupPort.postMessage({disabled: visitedBlocked})
      }
    })
  }
  if (settingsPort != undefined) {
    settingsPort.onMessage.addListener(function(msg) {
      if (msg.cmd == "GET_ACTIVE") {
        var active = buttonMode == "End" ? true : false;
        settingsPort.postMessage({active: active})
        if (blockedPagePort != undefined) blockedPagePort.postMessage({active: active})
      }
    })
  }
  if (blockedPagePort != undefined) {
    blockedPagePort.onMessage.addListener(function(msg) {
        if (msg.cmd == "GET_ACTIVE") {
          console.log("message sent")
        var active = buttonMode == "End" ? true : false;
        blockedPagePort.postMessage({active: active})
      }
    })
  }
  port.onDisconnect.addListener(function() {
    if (port.name == "popup") popupPort = undefined;
    if (port.name == "settings") settingsPort = undefined;
    if (port.name == "navbar") navbarPort = undefined;
    return true;
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
    // if (!visitedBlocked) {
      var total = data.points + pts
      chrome.storage.sync.set({"points": total});
    // }
    var countdownTimer = secToTimer(currentPomodoro);
    var sessionTimer = secToTimer(totalSessionTime);
    if (popupPort != undefined) popupPort.postMessage({countdown: countdownTimer, totalTime: sessionTimer, points: total})
    if (navbarPort != undefined) navbarPort.postMessage({points: total})
  })
 
  if (currentPomodoro <= 0) {
    chrome.storage.sync.get(["workTime", "breakTime"], function(data) {
      if (timerMode == "Work") {
        var brk = data.breakTime
        timerMode = "Break";
        currentPomodoro = brk * 60;
        var countdown = secToTimer(brk * 60)
        if (popupPort != undefined) popupPort.postMessage({countdown: countdown, timerMode: timerMode});
      }
      else if (timerMode == "Break") {
        var work = data.workTime;
        timerMode = "Work";
        currentPomodoro = 60 * work;
        var countdown = secToTimer(work * 60)
        if (popupPort != undefined) popupPort.postMessage({countdown: countdown, timerMode: timerMode});
      }
    })
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
