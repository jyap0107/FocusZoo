import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import Navbar from "./Navbar.js"
import Avatar from "./Avatar.js"
import Logo from "./Logo.js"
import Settings from "./Settings.js"
import About from "./About.js"
import OptionsRouting from "./OptionsRouting.js"
import Collection from "./Collection.js"
import {
  MemoryRouter,
  HashRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import '../options.css'
import '@themesberg/flowbite';


function Options() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<OptionsRouting></OptionsRouting>}>
          {/* <div id="screen" className="flex w-full bg-stone justify-center content-center "> */}
            <Route path="blocksites" element={<Settings className="flex w-full bg-stone justify-center content-center "></Settings>}></Route>
            <Route path="about" element={<About className="flex w-full bg-stone justify-center content-center "></About>}></Route>
            <Route path="collection" element={<Collection className="flex w-full bg-stone justify-center content-center "></Collection>}></Route>
          {/* </div> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}
render(<Options />, document.querySelector("#options"));