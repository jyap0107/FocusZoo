import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'
import AddIcon from '@mui/icons-material/Add';

let psl = require('psl');


// var blocked = ["first", "second", "third"]

function Settings() {

  // chrome.storage.sync.get("blocked", (data) => {
  //   total = data.points;
  // })

  var expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
  var regex = new RegExp(expression);

  const [blocked, setBlocked] = useState([]);
  const [input, setInput] = useState([]);

  const addBlocked = () => {
    // console.log(input)
    // alert(input);
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
        setBlocked(old => [...old, domain]);
      }
      else alert("Not a valid website");
    }
    setInput("")
  }
  const handleEnterKey = (e) => {
    if (e.key == "Enter") addBlocked();
  }
  /*
  If they enter like www.google.com or google.com we can just add www to the front and compare against what's saved already.

  */
  const getDomain = (url) => {
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];
    console.log(domain)
    alert(domain)
    return domain;
  }
 


  const listItems = blocked.map((site) => <div className="py-3 pl-4">{site}</div>)
  return(
    <div id="settings" className="w-3/4 h-5/6self-center">
      <div id="settings-content" className="flex flex-col self-center mx-5">
        <div id="header" className="flex flex-col mt-10 2xl:mt-20 ">
          <div id="title" className="font-sans font-bold text-3xl">BLOCKED SITES</div>
        </div>
        <div id="subtitle" className="font-sans text-base font-medium text-neutral-600">Visiting these sites will stop point acquisition until you reset the timer</div>
        <div id="block-site-add-list" className="flex flex-row mt-12 justify-between shrink-0">
          <div className="flex flex-row rounded-lg border-solid border-slate-300 border hover:cursor-pointer py-2 px-2 w-28 bg-white hover:bg-slate-100 active:bg-slate-200"
          onClick={() => addBlocked()}>
            <AddIcon></AddIcon>
            <div className="flex font-sans text-base font-medium">Add site</div>
          </div>
          <input value={input} className="ml-5 flex-grow border-solid border-slate-300 border rounded-lg font-sans text-base pl-2"
          onInput={e => setInput(e.target.value)} onKeyDown={e => handleEnterKey(e)}></input>
        </div>
        {blocked.length != 0 ? <div id="block-list" className="divide-solid divide-y divide-slate-200 border border-black border-solid mt-5 rounded font-sans font-medium text-base">
          {listItems}
        </div> : <></>}
        
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
export default Settings;