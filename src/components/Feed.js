import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Feed = () => {
  return (
    <>
      <section className="h-screen px-[1rem]">
        <div className="flex justify-between w-full mt-3">
          <p className="font-bold text-[1.5rem]">Feed</p>
          <div className="flex px-1 py-1 bg-[#f5f7fb] rounded-md ">
            <div className="p-1 text-gray-400">
              <AiOutlineSearch size={15} title={"Search"} />
            </div>
            <input
              type="search"
              id="search-input"
              placeholder="Find friends, communities and pages here"
              className="outline-none text-[0.65rem] mx-1 bg-[#f5f7fb] w-[13rem] "
            />
          </div>
        </div>
        <div className=" bg-[#f5f7fb] mt-[2rem] h-screen rounded-md">feed</div>
      </section>
    </>
  );
};

export default Feed;
