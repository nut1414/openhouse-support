import React, { useState } from "react";
import Logo from "public/svg/loginopenhouse.svg";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
function Login() {
  const { user, status, login, logout } = useAuth();
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignIn({
      ...signIn,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-juicy-200 gap-y-6">
        {/* <div className="">
          <Image
            src={Logo}
            alt=""
            className="h-full"
          />
        </div> */}

        {/* login Card */}
        <div className="relative lg:absolute px-10 py-0 mt-5 mb-10 md:mb-0 lg:py-24 w-full h-full flex justify-center  items-center lg:items-center">
          <div className="bg-white h-fit w-full lg:w-1/3 rounded-xl p-10 flex flex-col shadow-lg shadow-black/50 text-gray-500">
            <h1 className="text-juicy-200 text-4xl text-center lg:text-6xl font-bold tracking-wide mb-2 md:mb-5 uppercase">
              Login Support
            </h1>
            <form>
              <div className="space-y-2 md:space-y-4 mb-5">
                {/* Email */}
                <div className="w-full z-20">
                  <label htmlFor="email" className="flex flex-col text-xl">
                    <span>
                      Email <span className="text-bloodred-100">*</span>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      className="form-input mt-1 w-full rounded-md border-gray-400  shadow-sm focus:border-juicy-100 focus:ring focus:ring-juicy-100 focus:ring-opacity-30"
                      required
                    />
                  </label>
                </div>
                {/* Password */}
                <div className="w-full z-20">
                  <label htmlFor="password" className="flex flex-col text-xl">
                    <span>
                      Password <span className="text-bloodred-100">*</span>
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      className="form-input mt-1 w-full rounded-md border-gray-400  shadow-sm focus:border-juicy-100 focus:ring focus:ring-juicy-100 focus:ring-opacity-30"
                      required
                    />
                  </label>
                </div>
                {/* Button Login */}
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    login(signIn.email, signIn.password);
                  }}
                  className="flex justify-center items-center space-x-2 text-lg text-white w-full py-3 bg-juicy-100 rounded-xl"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
