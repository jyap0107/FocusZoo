import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'

function Logo() {
  return(
    <div className="flex w-full self-center justify-center font-sans font-md text-2xl py-4 bg-stone-50 font-semibold">
      FOCUS ZOO
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
export default Logo;