import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Switch } from '@headlessui/react'
import '@themesberg/flowbite';



function BlockedPage() {

  var expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
  var regex = new RegExp(expression);

  const [blocked, setBlocked] = useState([]);
  const [input, setInput] = useState([]);
  const [enabled, setEnabled] = useState(false)
  const defaultBlocked = ["www.instagram.com", "www.facebook.com", "www.tiktok.com", "www.reddit.com", "www.youtube.com", "www.twitter.com", "www.amazon.com", "www.netflix.com", "www.twitch.tv"]

  useEffect(() => {
    chrome.storage.sync.get("blocked", (data) => {
      setBlocked(data.blocked)
    })
    chrome.storage.sync.get("defaultBlocked", (data) => {
      console.log(data);
      setEnabled(data.defaultBlocked);
    })
  },[])

  const addBlocked = () => {
    if (input != "") {
      if (input.match(regex)) {
        var domain;
        if (input.substring(0, 3) == "www") {
          domain = input
          //compare against what's saved
        }
        else if (input.substring(0, 4) != "http") {
          domain = "www.".concat(input);
          //probably just like google.com
        }
        else {
          domain = getDomain(input)
        }
        if (blocked.includes(domain)) {
          alert("Website already blocked.")
          return true;
        }
        else {
          chrome.storage.sync.get("blocked", (data) => {
            var storageBlocked = data.blocked;
            console.log(storageBlocked)
            storageBlocked.push(domain);
            chrome.storage.sync.set({"blocked":storageBlocked})
            setBlocked(old => [...old, domain]);
          })
        }
      }
      else alert("Not a valid website");
    }
    setInput("")
  }
  const deleteSite = (siteToRemove) => {
    chrome.storage.sync.get("blocked", (data) => {
      var storageBlocked = data.blocked;
      const index = storageBlocked.indexOf(siteToRemove);
      if (index > -1) {
        storageBlocked.splice(index, 1)
        chrome.storage.sync.set({"blocked":storageBlocked})
        setBlocked(blocked.filter(site => site !== siteToRemove))
      }
      if (defaultBlocked.includes(siteToRemove)) {
        chrome.storage.sync.set({"defaultBlocked":false})
        setEnabled(false)
      }
    })
  }
  const handleEnterKey = (e) => {
    if (e.key == "Enter") addBlocked();
  }

  const getDomain = (url) => {
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];
    console.log(domain);
    return domain;
  }
  const toggleDefaultBlocked = () => {
    console.log("toggled")
    if (enabled) {
      chrome.storage.sync.set({"defaultBlocked":false})
      chrome.storage.sync.get("blocked", data => {
        var storageBlocked = data.blocked;
        storageBlocked = storageBlocked.filter((el) => !defaultBlocked.includes(el))
        setBlocked(storageBlocked)
        chrome.storage.sync.set({"blocked": storageBlocked})
      })
    }
    else {
      chrome.storage.sync.set({"defaultBlocked":true})
      chrome.storage.sync.get("blocked", data => {
        var storageBlocked = data.blocked;
        for (var i = 0; i < defaultBlocked.length; i++) {
          if (storageBlocked.includes(defaultBlocked[i]) == false) {
            storageBlocked.push(defaultBlocked[i])
            console.log(defaultBlocked[i])
          }
        }
        setBlocked(storageBlocked)
        chrome.storage.sync.set({"blocked": storageBlocked})
      })
    }
    
    setEnabled(!enabled);
  }



  const listItems = blocked.map((site, index) => <div id={index} key={index} className="flex flex-row justify-between py-3 pl-3 transition-opacity duration-700 ease-in">{site}
  <DeleteOutlineIcon className="mr-3 rounded hover:bg-slate-300 hover:cursor-pointer" onClick={() => deleteSite(site)}>
    </DeleteOutlineIcon></div>)

  return(
    <div className="flex w-full bg-stone justify-center content-center h-screen">
      <div id="settings" className="w-3/4 h-5/6 mt-10 2xl:mt-20 max-h-5/6">
      <div id="settings-content" className="flex flex-col self-center mx-5 h-full max-h-max">

        <div id="header" className="flex flex-row justify-between border-solid border-slate-200 border-b-2 pb-5 ">
          <div id="left">
            <div id="title" className="font-sans font-bold text-3xl">BLOCKED SITES</div>
            <div id="subtitle" className="font-sans text-base font-medium text-neutral-600">Visiting these sites will stop point acquisition until you reset the timer</div>
          </div>

          <Switch.Group data-tooltip-target="tooltip" data-tooltip-placement="bottom"  className=" self-center h-fit font-sans font-medium text-base">
            <div className="flex items-center ">
              <Switch.Label className="mr-3">Autoblock</Switch.Label>
              <Switch
                checked={enabled}
                onChange={() => toggleDefaultBlocked()}
                className={`${
                enabled ? 'bg-blue-300' : 'bg-gray-200'
                  }  relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}>
               <span
                className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}/>
              </Switch>
             </div>
          </Switch.Group>

          <div id="tooltip" role="tooltip" className="inline-block absolute z-10 py-2 px-3 text-xs font-sm text-white bg-slate-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
    Automatically blocks popular social media. While enabled, earn double the points
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>

        <div id="block-site-add-list" className="flex flex-row mt-5 justify-between">
          <div className="flex flex-row shrink-0 rounded-lg border-solid border-slate-300 border hover:cursor-pointer py-2 px-2 w-28 bg-white hover:bg-slate-100 active:bg-slate-200"
          onClick={() => addBlocked()}>
            <AddIcon></AddIcon>
            <div className="flex font-sans text-base font-medium">Add site</div>
          </div>
          <input value={input} className="ml-5 flex-grow border-solid border-slate-300 border rounded-lg font-sans text-base pl-2"
          onInput={e => setInput(e.target.value)} onKeyDown={e => handleEnterKey(e)}></input>
        </div>

        {blocked.length != 0 ? <div id="block-list" className="flex-1 flex-col divide-solid divide-y divide-slate-200 border border-slate-500 border-solid mt-5 rounded font-sans font-medium text-base overflow-y-scroll transition-opacity duration-700 ease-in ">
          {listItems}
          </div> : <></>}
        </div>
      </div>
    </div>
    )
  // return(
  //   <div className="bg-blue-500 h-32 w-72 rounded-lg mt-5 w-full h-16
  //   lg:h-16
  //   xl:h-20
  //   2xl:h-32">
  //     logo
  //   </div>
  // )
}
export default BlockedPage;