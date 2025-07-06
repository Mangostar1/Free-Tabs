import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//Language
import translations from "../i18n/es/translation.json";

//Pages
import Home from "pages/Home/Home";
import UserPprofile from "pages/User/UserPprofile/UserPprofile";
import MyTabs from "pages/User/MyTabs/MyTabs";
import Error404Page from "pages/404/404";
import SignUp from "pages/Auth/SignUp";
import LogIn from "pages/Auth/LogIn";
import CreateTab from "pages/Tabs/CreateTab/Components/CreateTab";
import ViewTab from "pages/Tabs/ViewTab/ViewTab";
import CreatedView from "pages/Tabs/CreatedView/CreatedView";

//Components
import LoginBtn from "utils/auth/LoginBtn";
import UserTabs from "utils/auth/UserLinks";
import TabCreatedLink from "utils/TabCreatedLink";

//Material UI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Divider from '@mui/material/Divider';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//Routes
import PrivateRoutes from "utils/auth/PrivateRoutes";
import TabControl from "routes/TabControl";

//auth
import Cookies from "js-cookie";

//Image
import userImage from 'assets/imgs/user-profile-default.png';

const isAuthenticated = Cookies.get("jwtToken");

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function PublicRoutes() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <BrowserRouter>
      <header className="w-full mx-auto relative z-10 bg-black">
        <div className="relative flex flex-col w-full p-5 mx-auto bg-transparent md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between lg:justify-start mr-5">
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
              className="px-2 py-2 text-sm text-gray-200 lg:px-6 md:px-3 hover:text-[#ff9800]"
              to="/"
            >
              {translations.nav.home}
            </Link>
            <Link
              className="px-2 py-2 text-sm text-gray-200 lg:px-6 md:px-3 hover:text-[#ff9800]"
              to="/tab/create"
            >
              {translations.nav.createTab}
            </Link>
            <TabCreatedLink />
            <div className="hidden mx-10 md:block lg:ml-auto">
            </div>
            <div className="inline-flex items-center gap-2 list-none">

              {
                !isAuthenticated ? <Link
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-full group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-700 active:bg-gray-800 active:text-white focus-visible:outline-black"
                to="/sign_up"
              >
                {translations.nav.sign_up}
              </Link> : null
              }

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {
                      isAuthenticated ? <Avatar alt="Remy Sharp" src={userImage} /> : <Avatar alt="Remy Sharp" src={userImage} />
                    }
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >

                  <MenuItem onClick={handleCloseUserMenu}>
                    <LoginBtn />
                  </MenuItem>

                  <Divider />

                  {
                    isAuthenticated ? <MenuItem onClick={handleCloseUserMenu}>
                    <UserTabs route="/user/my_tabs" nameRoute={translations.nav.my_tabs} />
                  </MenuItem> : null
                  }
                  {
                    isAuthenticated ? <MenuItem onClick={handleCloseUserMenu}>
                    <UserTabs route="/user/profile" nameRoute={translations.nav.user_profile} />
                  </MenuItem> : null
                  }
                </Menu>
              </Box>
            </div>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tab/edit-tab" element={<ViewTab />} />
        <Route path="/tab/create" element={<CreateTab />} />
        <Route
          path="/tab/view"
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
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}
