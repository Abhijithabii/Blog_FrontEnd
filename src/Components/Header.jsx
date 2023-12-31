import React, { useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import AuthContext from "../utils/AuthContext";
import { Link } from "react-router-dom";

function Header() {
  let { user, logoutUser } = useContext(AuthContext);

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Home
        </Typography>
      </Link>
      <Link to={"/my-blogs"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          My Blogs
        </Typography>
      </Link>
    </ul>
  );
  return (
    <div className=" ">
      <div className="w-full">
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Link className=" flex" to={"/"}>
              <img className=" w-10 h-10" src="/src/images/logo.png" alt="" />
              <Typography
                className="mr-4 cursor-pointer py-1.5 font-black"
              >
                BrainBlend
              </Typography>
            </Link>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>
              <Button
                variant="gradient"
                size="sm"
                color="red"
                className="hidden lg:inline-block"
                onClick={logoutUser}
              >
                <span>LOG OUT</span>
              </Button>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 mr-5 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <MobileNav open={openNav}>
            {navList}
            <Button
              variant="gradient"
              color="red"
              size="sm"
              fullWidth
              className="mb-2"
              onClick={logoutUser}
            >
              <span>LOG OUT</span>
            </Button>
          </MobileNav>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
