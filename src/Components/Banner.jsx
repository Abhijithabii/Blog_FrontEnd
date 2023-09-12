import React from "react";

function Banner() {
  return (
    <div className=" w-full h-full mb-16">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full">
        <div className="w-full h-full  flex flex-col justify-center items-center">
          <div className=" mt-20 text-4xl font-serif">
            <h1 className=" my-5 ">The Brain's Palette </h1>
            <h1>Painting with Thoughts and Ideas</h1>
          </div>
        </div>
        <div className="w-full flex justify-center  ">
          <img
            className=" pt-10 lg:pt-40 "
            src="/src/images/blog_banner.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
