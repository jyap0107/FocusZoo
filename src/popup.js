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
  
    return true;
    // console.log(msg.points);
  })
  return (
    <div id="popup" className="flex flex-col mx-2 mt-1 font-sans shrink-0 grow-0">
      <div id="header" className="flex flex-row justify-between font-medium text-base">
          <div id="header-name" className="">FOCUS ZOO</div>
          <div id="header-points" className="">{points}</div>
      </div>
      <div id="popup-image" className="flex self-center mt-5">
        <img id="popup-img" src={chrome.runtime.getURL('placeholder.png')}></img>
      </div>
      <div id="popup-mode" className="italic self-center mt-1">{timerMode}</div>
      <div id="countdown-timer" className="self-center text-4xl">{countdown}</div>
      <div id="popup-footer" className="flex flex-row justify-evenly self-center w-full text-xl mt-2 shrink-0 grow-0 resize-none">
        <div id="start-end-button" className="flex footer-item w-20 py-2 px-4 border border-black border-solid justify-center hover:cursor-pointer hover:bg-blue-50 align-middle" onClick={() => toggleTimer()}>{button}</div>
        <div id="total-timer" className="footer-item py-2 px-4 border border-black border-solid">{sessionTime}</div>
      </div>
    </div>
  );
}
render(<Popup />, document.getElementById("popup-comp"));
