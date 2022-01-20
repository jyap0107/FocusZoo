import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import '../options.css'
import CollectionModal from "./CollectionModal";

function Collection() {
  return(

    <div className="flex w-full bg-stone justify-center content-center grow-0">
      <CollectionModal></CollectionModal>
    <div id="collection" className="w-3/4 h-5/6 mt-10 2xl:mt-20 ">
    <div id="collection-content" className="flex flex-col self-center mx-5 h-full grow-0 w-full">
      <div id="collection-header" className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div id="collection-title" className="font-sans font-bold text-3xl">Title</div>
          <div id="collection-subtitle" className="font-sans text-base font-medium text-neutral-600">Subtitle</div>
        </div>
        <div id="roll-button" className="font-sans font-bold text-base 2xl:text-xl border border-solid rounded-lg border-slate-500 h-fit py-2 px-2
         hover:cursor-pointer hover:bg-slate-200">Click me</div>
        </div>
        <div id="collection-area" className="grid-cols-3 gap-0 h-full w-full grow-0 overflow-y-auto scrollbar-thumb-red-500 mt-10">
          <div className="flex flex-row w-full h-1/3">
            <div className="bg-yellow-300 w-1/3">A</div>
            <div className="bg-blue-300 w-1/3">A</div>
            <div className="bg-orange-300 w-1/3">A</div>
          </div>
          <div className="flex flex-row  w-full h-1/3">
            <div className="bg-red-300 w-1/3">A</div>
            <div className="bg-blue-300 w-1/3">A</div>
            <div className="bg-orange-300 w-1/3">A</div>
          </div>
          <div className="flex flex-row  w-full h-1/3">
            <div className="bg-blue-300 w-1/3">A</div>
            <div className="bg-orange-300 w-1/3">A</div>
            <div className="bg-green-300 w-1/3">A</div>
          </div>
        </div>
      {/* <div id="collection-area" className="flex flex-col w-92 mt-10 h-full bg-red-400 overflow-y-auto grow-0 flex-nowrap">
        <div className="flex flex-row w-full h-1/3">
          <div className="bg-yellow-300 w-1/3">A</div>
          <div className="bg-blue-300 w-1/3">A</div>
          <div className="bg-orange-300 w-1/3">A</div>
        </div>
        <div className="flex flex-row  w-full h-1/3">
          <div className="bg-blue-300 w-1/3">A</div>
          <div className="bg-orange-300 w-1/3">A</div>
          <div className="bg-green-300 w-1/3">A</div>
        </div>
        <div className="flex flex-row j w-full h-1/3">
          <div className="bg-red-300 w-1/3">A</div>
          <div className="bg-blue-300 w-1/3">A</div>
          <div className="bg-orange-300 w-1/3">A</div>
        </div>
        <div className="flex flex-row  w-full h-1/3">
          <div className="bg-red-300 w-1/3">A</div>
          <div className="bg-blue-300 w-1/3">A</div>
          <div className="bg-orange-300 w-1/3">A</div>
        </div>
      </div> */}
      </div>
    </div>
    
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