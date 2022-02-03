import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'
import AnimalModal from "./AnimalModal";


function AnimalCard() {

  const [open, setOpen] = useState(false)

  return(
    <div id="img" className="bg-black h-full w-full">
      <img id="img2" src={chrome.runtime.getURL('card3.png')} className="object-contain h-full w-full hover:cursor-pointer" onClick={() => setOpen(true)}></img>
      <AnimalModal open={open} setOpen={setOpen}></AnimalModal>    
    </div>
  )
}
export default AnimalCard;