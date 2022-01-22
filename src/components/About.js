import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'

function About() {
  return(
    <div className="flex w-full bg-stone justify-center content-center">
       <div id="settings" className="w-3/4 h-5/6 mt-10 2xl:mt-20  ">
      <div id="settings-content" className="flex flex-col self-center mx-5">
        <div id="header" className="flex flex-col ">
          <div id="title" className="font-sans font-bold text-3xl">ABOUT</div>
        </div>
        <div id="subtitle" className="font-sans text-base font-medium text-neutral-600 border-solid border-slate-200 border-b-2 pb-5">Focus Zoo combines productivity with play, rewarding you for getting work done</div>
        <div className="font-sans font-medium mt-5">
          <div className="text-black text-lg">Set your own clock</div>
          <div className="text-neutral-600 text-sm">Modeled on the Pomodoro method, set your own work and break times for the timer.</div>
          <div className="text-black text-lg mt-4">Set your own blocked sites</div>
          <div className="text-neutral-600 text-sm">Choose which sites YOU want to steer clear of. A toggleable default list is also provided.</div>
          <div className="text-black text-lg mt-4">Earn points</div>
          <div className="text-neutral-600 text-sm">As long as you keep working, you will earn points. The longer your session, 
          the bigger the rewards.</div>
          <div className="text-black text-lg mt-4">Expand your collection</div>
          <div className="text-neutral-600 text-sm">Trade in points to expand your collection of animals. The more rare the animal, 
          the harder it is to obtain. Spend more points for an increased chance of rare animals.</div>
          <div className="text-black text-lg mt-4">Stay productive</div>
          <div className="text-neutral-600 text-sm">Accessing blocked sites or staying idle for too long will prevent you from earning
          more points that session. The pomodoro timer will keep ticking, but you won't get any rewards until you reset it.</div>
          <div className="text-black text-lg mt-4">Stay private</div>
          <div className="text-neutral-600 text-sm">This app stores all data locally in your browser. None of your data is saved, recorded, or used elsewhere.</div>
        </div>

        </div>
        </div>
    </div>
  )
}
export default About;