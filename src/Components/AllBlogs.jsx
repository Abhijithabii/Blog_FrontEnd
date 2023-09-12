import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/CommonDatas";
import axios from "axios";

function AllBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const fetchBlogs = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/blogcrud/blogs-view/`)
      .then((res) => {
        setAllBlogs(res.data);
      })
      .catch((error) => {
        console.log(error, "eroorr on fetching");
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className=" w-full h-full lg:px-20 my-10  pt-10  ">
      <div className=" border-t-2 border-black ">
        <h1 className=" text-center py-10 text-2xl">
          Dive into Our Blog Library
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 w-full h-full">
          {allBlogs?.map((blog, index) => (
            <div key={index} className=" flex justify-center my-5">
              <div className=" flex flex-col items-center rounded-2xl bg-gray-200 border-black py-2 w-11/12 h-full relative ">
                <img
                  className="w-60 h-40"
                  src={`${BACKEND_BASE_URL}/${blog.blog_image}`}
                  alt=""
                />
                <h1 className=" text-lg my-3">{blog.title}</h1>
                <div className=" ml-auto mr-3">
                  <p>
                    <i> {blog.author.username} </i>
                  </p>
                </div>
                <div className="mb-20 my-3 px-5 max-h-24 overflow-hidden">
                  <p>{blog.content} </p>
                </div>
                <Link to={`/single-view/${blog.id}/`}>
                  <div className="absolute bottom-3 right-3 cursor-pointer text-blue-700">
                    <p>
                      <u> continue reading </u>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBlogs;
