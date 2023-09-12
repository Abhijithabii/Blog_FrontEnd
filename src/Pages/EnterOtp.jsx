import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import { BACKEND_BASE_URL } from "../utils/CommonDatas";

function EnterOtp() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const navigate = useNavigate();

  const inputRef = useRef({});

  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFive: "",
    digitSix: "",
  });

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (/[^0-9]/g.test(value)) {
      return;
    }

    setOtp((prev) => ({
      ...prev,
      [name]: value.slice(-1),
    }));

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const renderInput = () => {
    return Object.keys(otp).map((keys, index) => (
      <input
        key={index}
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        value={otp[keys]}
        name={keys}
        className="border-2 w-8 sm:w-16 bg-gray-100 py-1 mb-3 rounded-lg mr-1 
                  md:mr-3 text-center text-lg"
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(e) => handleBackspace(e, index)}
      />
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString =
      otp.digitOne +
      otp.digitTwo +
      otp.digitThree +
      otp.digitFour +
      otp.digitFive +
      otp.digitSix;

    await axios
      .post(`${BACKEND_BASE_URL}/blog/verify-otp/`, {
        email: email,
        otp: otpString,
      })
      .then((res) => {
        toast.success("OTP Verification Success");
        navigate("/login");
        console.log(res);
      })
      .catch((error) => {
        toast.error("OTP verification failed.");
      });
  };

  return (
    <div>
      <div className="w-screen h-screen  md:h-screen flex justify-center items-center bg-blue-100 ">
        <div className=" w-full  md:h-4/5 grid grid-cols-1 gap-4">
          <div className="md:pt-16">
            <div className=" flex flex-col sm:items-center md:px-5 lg:px-10 w-full h-full md:w-11/12 md:h-4/5">
              <form
                onSubmit={handleSubmit}
                className=" w-full sm:w-fit h-full border-2  p-5 rounded-xl shadow-2xl bg-white flex flex-col items-center"
                action=""
              >
                <h3 className="text-3xl text-center font-black py-6 mb-12">
                  Enter OTP
                </h3>
                <div className=""> {renderInput()} </div>
                <div>
                  <Button
                    className="text-lg px-3 py-2 mt-10 border border-solid border-[#3b3b3b] rounded-lg bg-green-700 hover:bg-green-500 hover:text-white"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterOtp;
