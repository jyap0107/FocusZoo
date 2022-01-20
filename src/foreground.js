import React, {useState, useEffect} from "react";
import { render } from "react-dom";

function Foreground() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request.msg)
      if (request.msg == "WORK_SOON") {
        alert("1 minute until work time!")
      }
      if (request.msg == "BREAK_SOON") {
        alert("1 minute until break time!");
      }
      if (request.msg == "IDLE") {
        alert("You've been idle for too long. You will stop receiving points until you click STOP.")
      }
      if (request.msg == "BLOCKED_SITE") {
        alert(`You're accessing a blocked site. You will stop receiving points until you click STOP.`)
      }
    })
  return (
    <div>
      <h1></h1>
      </div>
  )
}
render(<Foreground />, document.querySelector("#foreground"));
