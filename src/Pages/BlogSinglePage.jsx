import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/CommonDatas";
import toast from "react-hot-toast";
import { BsFillSendFill } from "react-icons/bs";
import AuthContext from "../utils/AuthContext";

function BlogSinglePage() {
  const [blog, SetBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  let { user } = useContext(AuthContext);

  const { blogId } = useParams();

  const fetchBlogDetails = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/blogcrud/blogs-manage/${blogId}/`)
      .then((res) => {
        setUsername(res.data.author.username);
        SetBlog(res.data);
      });
  };

  const fetchBlogComments = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/blogcrud/comments/${blogId}`)
      .then((res) => {
        console.log(res);
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something wrong on fetching comments");
      });
  };

  const createComment = async () => {
    await axios
      .post(
        `${BACKEND_BASE_URL}/blogcrud/create-comment/${blog.id}/${user.user_id}/`,
        { content }
      )
      .then((res) => {
        toast.success("Comment added");
        setContent("");
        fetchBlogComments();
      })
      .catch((error) => {
        console.log(error, "------errrrrrrrrorrrrrr");
      });
  };

  useEffect(() => {
    fetchBlogDetails();
    fetchBlogComments();
  }, []);

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="relative">
        <div className="w-full h-full pt-24 md:px-16">
          <div className="w-full h-full flex flex-col mb-10 items-center">
            <div className="mt-5">
              <img
                className="w-96 h-64 rounded-lg"
                src={`${BACKEND_BASE_URL}/${blog.blog_image}`}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center px-10 w-full md:px-20">
              <h1 className="text-center text-2xl py-5 font-bold text-gray-800">
                {blog?.title}
              </h1>
              <div className="ml-auto text-lg mr-10 my-6">
                <h1 className="text-gray-700">By {username}</h1>
              </div>
              <p className="text-center py-3 text-gray-800">{blog?.content}</p>
            </div>
          </div>

          <div className="w-full h-full py-10 px-10 md:px-20 bg-white rounded-lg shadow-md">
            <div className="w-full h-full">
              <div className="w-full my-5 relative">
                <label
                  className="block uppercase tracking-wide text-black font-bold mb-2"
                  htmlFor="blog-title"
                >
                  Add Comment
                </label>
                <textarea
                  className="appearance-none pr-20 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="blog-title"
                  name="title"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="absolute rounded-full top-8 right-0 w-16 h-16">
                  <BsFillSendFill
                    className="w-2/5 h-1/2 mt-5 ml-3 cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={createComment}
                  />
                </div>
              </div>
            </div>
            {comments.length > 0 && (
              <h1 className="text-lg my-5 text-gray-800">Comments</h1>
            )}
            {comments.map((comment, index) => (
              <div
                key={index}
                className="my-2 py-2 border-2 flex flex-col border-gray-300 rounded-lg w-full h-full overflow-hidden"
              >
                <div className="ml-2">
                  <h1 className="text-gray-800 font-semibold">
                    {comment.author.username}
                  </h1>
                </div>
                <p className="ml-5 text-gray-800">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 w-full">
          <Header />
        </div>
      </div>
    </div>
  );
}

export default BlogSinglePage;
