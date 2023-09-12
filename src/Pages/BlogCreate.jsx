import React, { useContext, useState } from "react";
import Header from "../Components/Header";
import { Button } from "@material-tailwind/react";
import AuthContext from "../utils/AuthContext";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/CommonDatas";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BlogCreate() {
    let {user} = useContext(AuthContext)

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  
    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0];
      setSelectedImage(selectedFile)
    
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      if (selectedFile) {
        reader.readAsDataURL(selectedFile);
      }
    };


    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!title || !content || !selectedImage) {
            toast.error("OOps You Missed Some Fields To Fill")
            return
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('blog_image', selectedImage);
        formData.append('author_id', user.user_id);


        await axios
                    .post(`${BACKEND_BASE_URL}/blogcrud/blogs-view/`,formData)
                    .then((res)=>{
                        toast.success("New vlog Created")
                        navigate('/my-blogs')
                    })
                    .catch((error)=>{
                        console.log("error", error);
                    })

    }

  return (
    <div className=" w-full h-full">
      <div className=" relative">
        <div className="w-full h-full flex flex-col items-center pt-24">
            <h1 className=" text-2xl font-bold">Feast Your Mind : Create New Blog</h1>
          <form className=" w-full " onSubmit={handleSubmit} >
            <div className=" h-full flex flex-col items-center px-5 md:px-20">
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
                  src="/src/images/login_bg.avif"
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
                  className="block uppercase tracking-wide text-black font-bold mb-2"
                  htmlFor="blog-title"
                >
                  blog Title
                </label>
              
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="blog-title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  
                ></textarea>
               
              </div>
              <div className=" w-full my-5">
                <label
                  className="block uppercase tracking-wide text-black font-bold mb-2"
                  htmlFor="blog-content"
                >
                  COntent
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="blog-content"
                  name="content"
                  type="text"
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
                 
                ></textarea>
                
              </div>
              <div className="my-5">
                <Button color="green" type="submit">
                  CREATE
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

export default BlogCreate;
