import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'
import CollectionModal from "./CollectionModal";
import AnimalCard from "./AnimalCard"
import ObtainModal from "./ObtainModal"

function Collection() {

  const [open, setOpen] = useState(false)
  const [obtain, setObtain] = useState(false)
  const [count, setCount] = useState()
  const [total, setTotal] = useState()

  useEffect(() => {
    chrome.storage.sync.get("totalAnimals", (data) => {
      setTotal(data.totalAnimals)
      console.log(data.totalAnimals)
    })
    chrome.storage.sync.get("currentAnimalsCount", (data) => {
      console.log(data);
      setCount(data.currentAnimalsCount);
    })
  },[])
  
  return(
    <div className="flex w-full bg-stone justify-center content-center grow-0 ">
    <div id="collection" className="w-3/4 h-5/6 mt-10 2xl:mt-20 ">
    <div id="collection-content" className="flex flex-col self-center mx-5 h-full grow-0 w-full">
      <div id="collection-header" className="flex flex-row justify-between border-solid border-slate-200 border-b-2 pb-2">
        <div className="flex flex-col">
          <div id="collection-title" className="font-sans font-bold text-3xl">COLLECTION</div>
          <div id="collection-subtitle" className="font-sans text-base font-medium text-neutral-600">All the animals you've collected so far ({count}/{total})</div>
        </div>
        <div id="roll-button" className="font-sans font-bold text-base 2xl:text-xl border border-solid rounded-lg border-slate-500 h-fit py-2 px-2
         hover:cursor-pointer hover:bg-slate-200" onClick={() => setOpen(true)}>Get more animals</div>
      </div>
        {/* <div id="collection-area" className="grid-cols-3 gap-0 md:h-[435px] md:w-[800px] 2xl:h-[735px] 2xl:w-[1250px] grow-0 overflow-y-auto scrollbar-thumb-red-500 mt-8"> */}
        <div id="collection-area" className="grid-cols-3 gap-0 h-[435px] w-[800px] 2xl:h-[735px] 2xl:w-full grow-0 overflow-y-auto scrollbar-thumb-red-500 mt-8">
          <div className="flex flex-row h-[145px] 2xl:h-[245px]">
            <div className="flex w-[415px] 2xl:w-1/3 justify-center"><AnimalCard></AnimalCard></div>
            <div className="flex w-[415px] 2xl:w-1/3 justify-center"><AnimalCard></AnimalCard></div>
            <div className="flex w-[415px] 2xl:w-1/3 justify-center"><AnimalCard></AnimalCard></div>
          </div>
          <div className="flex flex-row h-[145px] 2xl:h-[245px]">
            <div className="flex w-[415px] justify-center 2xl:w-1/3"><AnimalCard></AnimalCard></div>
            <div className="flex w-[415px] justify-center 2xl:w-1/3"><AnimalCard></AnimalCard></div>
            <div className="flex w-[415px] justify-center 2xl:w-1/3"><AnimalCard></AnimalCard></div>
          </div>
          <div className="flex flex-row h-[145px] 2xl:h-[245px] ">
            <div className="flex w-[415px] justify-center 2xl:w-1/3"><AnimalCard></AnimalCard></div>
            <div className="flex w-[415px] justify-center 2xl:w-1/3"><AnimalCard></AnimalCard></div>
            <div className="flex w-[415px] justify-center 2xl:w-1/3"><AnimalCard></AnimalCard></div>
          </div>
          <div className="flex flex-row h-[145px] 2xl:h-[245px] ">
            <div className="flex w-[415px] justify-center 2xl:w-1/3"><AnimalCard></AnimalCard></div>
            <div className="flex w-[415px] justify-center 2xl:w-1/3"><AnimalCard></AnimalCard></div>
            <div className="flex w-[415px] justify-center 2xl:w-1/3"><AnimalCard></AnimalCard></div>
          </div>
        </div>
      </div>
    </div>
    <CollectionModal open={open} setOpen={setOpen} obtain={obtain} setObtain={setObtain}></CollectionModal>
    <ObtainModal open={obtain} setOpen={setObtain}></ObtainModal>    
  </div>
  )
}

export default Collection;

/*<div className="flex w-full bg-stone justify-center content-center">
       <div className="w-3/4 h-5/6 mt-10 2xl:mt-20 bg-purple-300">
          <div className="flex flex-col bg-orange-400 self-center mx-5 h-full">
            <div className="flex flex-col bg-red-300 h-full ">
              <div className="font-sans font-bold text-3xl mb-10">COLLECTION</div>
                <div className="flex flex-col w-full h-1/4">
                  <div className="flex flex-row justify-between w-full">
                    <div className="bg-blue-300 w-1/4">A</div>
                    <div className="bg-orange-300 w-1/4">A</div>
                    <div className="bg-green-300 w-1/4">A</div>
                    <div className="bg-blue-300 w-1/4">A</div>
              </div>
          </div>
        </div>
  

        </div>
        </div>
    </div>
    */