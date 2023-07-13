import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//Pages
import Home from "pages/Home/Home";
import UserPprofile from "pages/User/UserPprofile/UserPprofile";
import MyTabs from "pages/User/MyTabs/MyTabs";
import Error404Page from "pages/404/404";
import SignUp from "utils/auth/SignUp";
import LogIn from "utils/auth/LogIn";
import CreateTab from "pages/Tabs/CreateTab/CreateTab";
import ViewTab from "pages/Tabs/ViewTab/ViewTab";
import CreatedView from "pages/Tabs/CreatedView/CreatedView";

//Components
import LoginBtn from "utils/auth/LoginBtn";
import UserTabs from "utils/auth/UserLinks";
import TabCreatedLink from "utils/TabCreatedLink";

//Routes
import PrivateRoutes from "utils/auth/PrivateRoutes";
import TabControl from "routes/TabControl";

export default function PublicRoutes() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter>
      <header className="w-full mx-auto bg-white border-b">
        <div className="relative flex flex-col w-full p-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between lg:justify-start">
            <Link
              className="text-lg tracking-tight text-black uppercase focus:outline-none focus:ring lg:text-2xl"
              to="/"
            >
              <span className="lg:text-lg uppecase focus:ring-0">
                free-tabs
              </span>
            </Link>
            <button
              onClick={toggleOpen}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:outline-none focus:text-black md:hidden"
            >
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={` ${open ? "hidden" : "inline-flex"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
                <path
                  className={`${!open ? "hidden" : "inline-flex"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <nav
            className={`flex-col items-center flex-grow md:pb-0 md:flex md:justify-end md:flex-row ${
              open ? "" : "hidden"
            }`}
          >
            <Link
              className="px-2 py-2 text-sm text-gray-500 lg:px-6 md:px-3 hover:text-blue-600"
              to="/"
            >
              Home
            </Link>
            <Link
              className="px-2 py-2 text-sm text-gray-500 lg:px-6 md:px-3 hover:text-blue-600"
              to="/tab/create"
            >
              Create Tab
            </Link>
            <TabCreatedLink />
            <UserTabs route="/user/my_tabs" nameRoute="My Tabs" />
            <UserTabs route="/user/profile" nameRoute="User Profile" />
            <div className="hidden mx-10 md:block lg:ml-auto">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 text-black bg-white border border-gray-200 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-500 sm:text-sm rounded-xl placeholder:text-gray-400 focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 list-none">
              <LoginBtn />
              <Link
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-black rounded-full group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-700 active:bg-gray-800 active:text-white focus-visible:outline-black"
                to="/user/sign_up"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tab/view" element={<ViewTab />} />
        <Route path="/tab/create" element={<CreateTab />} />
        <Route
          path="/tab/created_view"
          element={
            <TabControl>
              <CreatedView />
            </TabControl>
          }
        />
        <Route
          path="/user/profile"
          element={
            <PrivateRoutes>
              <UserPprofile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user/my_tabs"
          element={
            <PrivateRoutes>
              <MyTabs />
            </PrivateRoutes>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/user/sign_up" element={<SignUp />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}
