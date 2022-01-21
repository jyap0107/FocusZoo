import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'
import CollectionsIcon from '@mui/icons-material/Collections';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


function Navbar() {
  var port = chrome.runtime.connect({name: "navbar"});
  const [points, setPoints] = useState();
  useEffect(() => {
    chrome.storage.sync.get("points", (data) => {
      setPoints(data.points)
    })
  },[])

  port.onMessage.addListener(function(msg) {
    console.log("navbar received")
    if (msg.points != undefined) {
      setPoints(msg.points);
    }
  })

  return(
      <div className="rounded-lg text-lg 2xl:text-xl flex flex-col justify-items-center items-center font-sans font-medium h-full">
        <Link to="collection" className="py-3 mt-2 w-11/12 hover:cursor-pointer hover:bg-stone-200 rounded-lg justify-self-center">
          <div className="ml-2 flex items-center flex-wrap">
            <CollectionsIcon className=" mr-1.5 mt-0.5"></CollectionsIcon>
            <span>Collection</span>
          </div>
        </Link>
        <div className="py-3 mt-2 w-11/12 hover:cursor-pointer hover:bg-stone-200 rounded-lg">
          <div className="ml-2 flex items-center flex-wrap">
            <BarChartIcon className=" mr-1.5 mt-0.5" ></BarChartIcon>
            <span>Stats</span>
          </div> 
        </div>
        <Link to="blocksites" className="py-3 mt-2 w-11/12 hover:cursor-pointer hover:bg-stone-200 rounded-lg">
          <div className="ml-2 flex items-center flex-wrap">
          <SettingsIcon className=" mr-1.5 mt-0.5"></SettingsIcon>  
          <span>Block Sites</span>
          </div>
        </Link>
        <Link to="about" className="flex py-3 mt-2 w-11/12 hover:cursor-pointer hover:bg-stone-200 rounded-lg">
          <div className="ml-2 flex items-center flex-wrap">
            <InfoIcon className=" mr-1.5 mt-0.5"></InfoIcon>
            <span> About</span>
          </div>
        </Link>
        <div className="mt-auto py-3 ">Stars: {points}</div>
      </div>
  )
  // return(
  //   <div className="bg-blue-200 w-72 rounded-lg mt-5 text-xl relative flex flex-grow flex-col mb-5 w-full items-center">
  //     <div className="py-5 w-fit hover:cursor-pointer hover:bg-blue-300 rounded-t-lg justify-self-center">Collection</div>
  //     <div className="pb-5">Stats</div>
  //     <div className="pb-5">Options</div>
  //     <div className="pb-5">Help</div>
  //   </div>
  // )
}
export default Navbar;