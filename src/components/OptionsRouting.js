import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import Navbar from "./Navbar.js"
import Avatar from "./Avatar.js"
import Logo from "./Logo.js"
import Settings from "./BlockedPage.js"
import About from "./About.js"
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation
} from "react-router-dom";

import '../options.css'


function OptionsRouting() {

  return (
      <div id="options-comp" className="flex flex-row">
        <div id="sidebar" className="flex flex-col shrink-0 bg-stone-50 min-h-screen max-h-screen w-48 2xl:w-64 divide-solid divide-y divide-slate-200 drop-shadow-lg">
          <Logo></Logo>
          <Navbar></Navbar>
        </div>
        <Outlet/>
        
      </div>
  );
}

export default OptionsRouting;