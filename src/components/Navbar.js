import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'
import CollectionsIcon from '@mui/icons-material/Collections';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';

function Navbar() {
  return(
    
    <div className="rounded-lg text-xl flex flex-grow flex-col items-center font-sans font-medium">
      <div className="py-3 mt-2 w-11/12 hover:cursor-pointer hover:bg-stone-200 rounded-lg justify-self-center">
        <div className="ml-2">
          <CollectionsIcon></CollectionsIcon>  Collection
        </div>
      </div>
      <div className="py-3 mt-2 w-11/12 hover:cursor-pointer hover:bg-stone-200 rounded-lg justify-self-center">
        <div className="ml-2">
          <BarChartIcon></BarChartIcon>  Stats
        </div>
      </div>
      <div className="py-3 mt-2 w-11/12 hover:cursor-pointer hover:bg-stone-200 rounded-lg justify-self-center">
        <div className="ml-2">
        <SettingsIcon></SettingsIcon>  Block Sites
        </div>
      </div>
      <div className="py-3 mt-2 w-11/12 hover:cursor-pointer hover:bg-stone-200 rounded-lg justify-self-center">
        <div className="ml-2">
          <InfoIcon></InfoIcon>  About
        </div>
      </div>
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