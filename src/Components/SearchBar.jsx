import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <form className="search-container relative h-[50px] rounded-3xl bg-transparent border border-gray-200 mb-5">
      <input
        type="text"
        className="w-full px-5 h-full rounded-3xl focus:outline-none"
        placeholder="Search Products..."
      />
      <div className="absolute top-1/2 text-2xl right-5 -translate-y-1/2">
        <FiSearch />
      </div>
    </form>
  );
};

export default SearchBar;
