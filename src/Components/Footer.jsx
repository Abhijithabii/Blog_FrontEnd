import React from 'react'

function Footer() {
  return (
    <div>
      <div className=' w-full h-full py-10 bg-blue-gray-800 text-white'>
      
        <div className=' grid grid-cols-1 pt-10 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5'>
            <div className=' flex  '>
                <img className=' w-20 h-20' src="/src/images/logo.png" alt="" />
                <h1 className=' text-2xl pt-5'>Brain Blend</h1>
            </div>
            <div className='pt-5 flex flex-col space-y-3' >
                <h1> Navigation</h1>
                <p>Home</p>
                <p>My Blogs</p>
            </div>
            <div className='pt-5 flex flex-col space-y-3' >
                <h1>Contact</h1>
                <p>Brainblend@xyz.com</p>
                <p>Linkedin</p>
            </div>
            <div className='pt-5 flex flex-col space-y-3' >
                <h1>Blog</h1>
                <p>Big Ideas for Small Business</p>
                <p>MarketingProfs</p>
            </div>
            
        </div>


      </div>
    </div>
  )
}

export default Footer
