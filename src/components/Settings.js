import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'
import { Switch } from '@headlessui/react'

function Settings() {

  var port = chrome.runtime.connect({name: "settings"});

  const[workTime, setWorkTime] = useState()
  const[breakTime, setBreakTime] = useState()
  const[enabled, setEnabled] = useState()
  const[active, setActive] = useState()


  useEffect(() => {
    chrome.storage.sync.get("workTime", (data) => {
      setWorkTime(data.workTime)
    })
    chrome.storage.sync.get("breakTime", (data) => {
      setBreakTime(data.breakTime)
    })
    chrome.storage.sync.get("blockAlert", (data) => {
      setEnabled(data.blockAlert)
    })
    port.postMessage({cmd: "GET_ACTIVE"});
  },[])


  const handleWorkTime = (e) => {
    var work = e.target.value;
    // work = work > 120 ? 120 : work;
    // work = work < 25 ? 25 : work;
    e.target.value = work
    setWorkTime(work)
    chrome.storage.sync.set({"workTime": work})
  }
  const handleBreakTime = (e) => {
    var brk = e.target.value;
    // brk = brk > 60 ? 60 : brk;
    // brk = brk < 5 ? 5 : brk;
    e.target.value = brk
    setBreakTime(brk)
    chrome.storage.sync.set({"breakTime": brk})
  }
  const handleAlertToggle = () => {
    var temp = !enabled
    setEnabled(!enabled)
    chrome.storage.sync.set({"blockAlert": temp})
  }
  port.onMessage.addListener(function(msg) {
    if (msg.active != undefined) {
      setActive(msg.active)
    }
  })
  
  return(
    <div className="flex w-full bg-stone justify-center content-center">
       <div id="settings" className="w-3/4 h-5/6 mt-10 2xl:mt-20  ">
      <div id="settings-content" className="flex flex-col self-center mx-5">
        <div id="header" className="flex flex-col ">
          <div id="title" className="font-sans font-bold text-3xl">SETTINGS</div>
        </div>
        <div id="subtitle" className="font-sans text-base font-medium text-neutral-600 border-solid border-slate-200 border-b-2 pb-5">Change how you interact with the extension</div>
        <div className="flex flex-col font-sans font-medium mt-5 divide-solid divide-y divide-slate-200">
          <div id="settings-1" className="flex flex-row justify-between pb-2">
            <div>
              <div className="text-black text-lg">Set work interval</div>
              <div className="text-neutral-600 text-sm">How long you will work before a break period.</div>
            </div>
            <fieldset disabled={active ? "disabled" : ""}>
              <input type="number"  defaultValue={workTime} onBlur={(e) => handleWorkTime(e)} className="h-8 w-20 self-center"></input>
              </fieldset>
          </div>
          <div id="settings-2" className="flex flex-row justify-between py-2">
            <div>
              <div className="text-black text-lg">Set break interval</div>
              <div className="text-neutral-600 text-sm">How long your break will be until you work again.</div>
            </div>
            <fieldset disabled={active ? "disabled" : ""}>
              <input type="number" defaultValue={breakTime} onBlur={(e) => handleBreakTime(e)} className="h-8 w-20 self-center"></input>
            </fieldset>
          </div>
          <div id="settings-3" className="flex flex-row justify-between py-2">
            <div>
              <div className="text-black text-lg">Enable alert upon accessing blocked site</div>
              <div className="text-neutral-600 text-sm mr-10">Accessing a blocked site stops point acquisition. If enabled, chrome will alert you
          if you access a blocked site.</div>
            </div>
            <Switch.Group className=" self-center h-fit font-sans font-medium text-base">
              <div className="flex items-center ">
                <Switch
                  checked={enabled}
                  onChange={() => handleAlertToggle()}
                  className={`${
                  enabled ? 'bg-blue-300' : 'bg-gray-200'
                   }  relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}>
                <span
                  className={`${
                  enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}/>
               </Switch>
              </div>
            </Switch.Group>
          </div>
          <div></div>
        </div>

        </div>
        </div>
    </div>
  )
}
export default Settings;