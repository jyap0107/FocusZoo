import React, {useState, useEffect, Fragment, useRef} from "react";
import { render } from "react-dom";
import '../options.css'
import { Dialog, Transition } from '@headlessui/react'
import StarOutlineIcon from '@mui/icons-material/StarOutline';

function ObtainModal(props) {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-1000"
            enterFrom="opacity-0"
            enterTo="translate-x-0"
            leave="ease-in duration-400"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-1000"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-400"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"> */}
                    {/* <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                  {/* </div> */}
                  <div className=" text-center">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Animal Obtained
                    </Dialog.Title>
                    <img src={chrome.runtime.getURL('card3.png')} className="object-contain h-full w-full hover:cursor-pointer"></img>
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6 sm:flex sm:flex-row justify-center">
                <button
                  type="button"
                  className="w-1/4 inline-flex justify-center rounded-md px-2 py-2 bg-slate-200 text-lg font-medium text-slate-700 hover:bg-slate-300 focus:outline-none sm:text-sm text-base border border-slate-500 border-solid"
                  onClick={() => props.setOpen(false)}
                >
                  Set as icon
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    // SHOW NUMBER OF CURRENT CURRENCY IN THE MODAL
  )
}
export default ObtainModal;