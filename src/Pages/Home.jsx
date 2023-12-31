import React, { useContext } from "react";
import AuthContext from "../utils/AuthContext";
import { Button } from "@material-tailwind/react";
import Header from "../Components/Header";
import Banner from "../Components/Banner";
import AllBlogs from "../Components/AllBlogs";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="relative">
      <Banner />
      <AllBlogs />
      <Footer/>
      <div className=" absolute top-0 w-full">
        <Header />
      </div>
    </div>
  );
}

export default Home;
