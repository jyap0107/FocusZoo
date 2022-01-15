import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import Navbar from "./Navbar.js"
import Avatar from "./Avatar.js"
import Logo from "./Logo.js"
import Settings from "./Settings.js"
import '../options.css'


function Options() {
  return (
    <div id="options-comp" className="flex flex-row">
      <div id="sidebar" className="flex flex-col bg-stone-50 min-h-screen max-h-screen w-52 xl:w-72 divide-solid divide-y divide-slate-200 drop-shadow-lg">
      <Logo></Logo>
      <Navbar></Navbar>
      </div>
      <div id="screen" className="flex w-full bg-stone justify-center content-center ">
        <Settings></Settings>
      </div>
    </div>
    
    
  );

}
render(<Options />, document.querySelector("#options"));