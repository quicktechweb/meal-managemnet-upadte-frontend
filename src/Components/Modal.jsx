import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold"></h2>
          <button className="text-gray-500 hover:text-gray-800">
            <IoMdClose />
          </button>
        </div>
        <div className="text-gray-700">
          <form>
            <div className="form-container flex flex-col gap-2.5 ">
              <label htmlFor="full-name" className="text-lg  font-semibold">
                Full Name
              </label>
              <input type="text" name="full-name" id="full-name" cl />
            </div>
          </form>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 rounded bg-[#FF6F61] text-white hover:bg-[#db6055]">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
