import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import './popup.css';
// import image from '../public/placeholder.png';

var port = chrome.runtime.connect({name: "popup"});

function Popup() {
  var total;
  chrome.storage.sync.get("points", (data) => {
    total = data.points;
  })

  const [countdown, setCountdown] = useState();
  const [button, setButton] = useState();
  const [points, setPoints] = useState();
  const [sessionTime, setSessionTime] = useState();
  const [timerMode, setTimerMode] = useState();

  useEffect(() => {
    setPoints(total)
    port.postMessage({cmd: "GET_TIMES"});
    port.postMessage({cmd: "GET_MODE"})
  }, [total])
   const toggleTimer = () => {
    if (button == "Start") startTimer();
    else if (button == "End") stopTimer();
  }
  const startTimer = () => {
    port.postMessage({cmd: "START_TIMER"});
    setButton("End");
  }
  const stopTimer = () => {
    port.postMessage({cmd: "STOP_TIMER"});
    setButton("Start");
  }
  port.onMessage.addListener(function(msg) {
    if (msg.countdown != undefined) {
      setCountdown(msg.countdown);
    }
    if (msg.points != undefined)
      setPoints(msg.points);
    if (msg.mode != undefined) {
      setButton(msg.mode)
    }
    if (msg.totalTime != undefined) {
      setSessionTime(msg.totalTime);
    }
    if (msg.timerMode != undefined) {
      setTimerMode(msg.timerMode)
    }
    if (msg.alert != undefined) {
      if (msg.alert == "break") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var currentTab = tabs[0];
          chrome.tabs.executeScript({tabId: currentTab.id}, function() {
            console.log("asf")
            window.alert("eafasd")
          })
        })
        return true;
      }
    }
    return true;
    // console.log(msg.points);
  })
  return (
    <div id="popup">
      <div id="header">
          <div id="header-name">Focus Zoo</div>
          <div id="header-points">{points}</div>
      </div>
      <div id="popup-image">
        <img id="popup-img" src={chrome.runtime.getURL('placeholder.png')}></img>
      </div>
      <div id="popup-mode">{timerMode}</div>
      <div id="countdown-timer">{countdown}</div>
      <div id="popup-footer">
        <div id="start-end-button" className="footer-item" onClick={() => toggleTimer()}>{button}</div>
        {/* <div></div> */}
        <div id="total-timer" className="footer-item">{sessionTime}</div>
      </div>
    </div>
  );
}
render(<Popup />, document.getElementById("popup"));
