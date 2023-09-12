import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../utils/CommonDatas";
import axios from "axios";
import AuthContext from "../utils/AuthContext";
import toast from "react-hot-toast";

function BlogCRUD() {
  const [userBlogs, setUserBlogs] = useState([]);

  let { user } = useContext(AuthContext);

  useEffect(() => {
    fetchRelatedBlogs();
  }, []);

  const fetchRelatedBlogs = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/blogcrud/user-related-blogs/${user.user_id}/`)
      .then((res) => {
        setUserBlogs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Do you really want to delete this blog?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        await axios
          .delete(`${BACKEND_BASE_URL}/blogcrud/blogs-manage/${id}/`)
          .then((res) => {
            toast.success("Deleted");
            fetchRelatedBlogs();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something wrong on deleting");
          });
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };
  return (
    <div>
      <div className="relative w-screen h-full">
        <div className="pt-24 lg:px-20 flex flex-col items-center ">
          <h1 className=" text-2xl my-5 font-serif">
            Blog Chronicles: Start Here !
          </h1>
          <div className=" w-full  ">
            <Link to="/create-blog">
              <Button color="green">Add Blog</Button>
            </Link>
          </div>

          {userBlogs?.map((blog, index) => (
            <div
              key={index}
              className="my-5 w-full h-full flex flex-col sm:flex-row items-center border border-black"
            >
              <img
                className="w-52 h-32 border-2"
                src={`${BACKEND_BASE_URL}/${blog.blog_image}`}
                alt=""
              />
              <h1 className=" sm:pl-10"> {blog.title} </h1>
              <div className="sm:ml-auto sm:mr-5 w-52  flex justify-between">
                <Link to={`/edit-blog/${blog.id}/`}>
                  <Button color="blue">EDIT</Button>
                </Link>
                <Button color="red" onClick={() => handleDelete(blog.id)}>
                  DELETE
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className=" absolute top-0 w-full">
          <Header />
        </div>
      </div>
    </div>
  );
}

export default BlogCRUD;
