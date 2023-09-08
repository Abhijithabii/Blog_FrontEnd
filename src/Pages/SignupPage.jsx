import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

function SignupPage() {
  return (
    <div>
      <div className="w-screen h-full  md:h-screen flex justify-center items-center bg-blue-100 ">
        <div className=" w-4/5 h-full md:h-4/5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-2xl rounded-xl">
          <div className="w-full h-full bg-white border-r-2 flex justify-center items-center">
            <div className=" w-4/5 h-4/5">
              <img
                className="w-full h-full"
                src="/src/images/blog_signup_bg.avif"
                alt=""
              />
            </div>
          </div>
          <div className="md:pt-16">
            <div className=" flex flex-col justify-center px-5 lg:px-10 w-full h-full md:w-11/12 md:h-4/5">
              <h1 className=" text-2xl font-bold ">Create Account </h1>
            
              <form className=" w-full h-full  mt-10   ">
              <div className="mb-4 relative">
                  <input
                    type='text'
                    className="w-full p-3 rounded-lg border border-black text-black "
                    placeholder="Username"
                  />
                  
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    className="w-full p-3 rounded-lg border border-black text-black "
                    placeholder="Email Address"
                  />
                </div>
                
                <div className="mb-4 relative">
                  <input
                    type='password'
                    className="w-full p-3 rounded-lg border border-black text-black "
                    placeholder="Password"
                  />
                  
                </div>
                <div className="mb-4 relative">
                  <input
                    type='password'
                    className="w-full p-3 rounded-lg border border-black text-black "
                    placeholder="Confirm Password"
                  />
                  
                </div>

                <Button color="green" type="submit" className="my-5 ">
                  Sign Up
                </Button>
              </form>
              <div className="flex mb-10">
                <p className="mr-5 mt-2">Already have an account ? </p>
                <Link to='/login'>
                <Button>Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
