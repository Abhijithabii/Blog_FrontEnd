import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/CommonDatas";
import toast from "react-hot-toast";

function BlogEdit() {
  const [blog, SetBlog] = useState({});
  const navigate = useNavigate();

  const { blogId } = useParams();

  const fetchBlogDetails = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/blogcrud/blogs-manage/${blogId}/`)
      .then((res) => {
        SetBlog(res.data);
      });
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const handleChange = (e) => {
    SetBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    SetBlog({
      ...blog,
      ["blog_image"]: selectedFile,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const updateVlog = async (newData) => {
    await axios
      .put(`${BACKEND_BASE_URL}/blogcrud/blogs-manage/${blogId}/`, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Blog Edited Success");
        navigate("/my-blogs");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error on editing");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagePreviewUrl) {
      const { blog_image, ...blogDetailsWithoutImage } = blog;
      updateVlog(blogDetailsWithoutImage);
    } else {
      updateVlog(blog);
    }
  };

  return (
    <div className=" w-full h-full">
      <div className=" relative">
        <div className="w-full h-full flex flex-col items-center pt-24 md:px-16">
          <form className=" w-full" onSubmit={handleSubmit}>
            <div className="w-full h-full flex flex-col items-center px-20">
              <div className=" my-5">
                {imagePreviewUrl ? (
                  <img
                    className="w-80 h-64"
                    src={`${imagePreviewUrl}`}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-80 h-64"
                    src={`${BACKEND_BASE_URL}/${blog.blog_image}`}
                    alt=""
                  />
                )}
                <div className="p-5">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="blog-image"
                  >
                    Update Image
                  </label>
                  <input
                    type="file"
                    id="blog-image"
                    name="blog_image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className=" w-full my-5">
                <label
                  className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="blog-title"
                >
                  blog Title
                </label>
                {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
                      Description
                    </label> */}
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="blog-title"
                  name="title"
                  value={blog.title}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className=" w-full my-5">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="blog-content"
                >
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="blog-content"
                  name="content"
                  value={blog.content}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="my-5">
                <Button type="submit" color="green">
                  UPDATE
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className=" absolute top-0 w-full">
          <Header />
        </div>
      </div>
    </div>
  );
}

export default BlogEdit;
