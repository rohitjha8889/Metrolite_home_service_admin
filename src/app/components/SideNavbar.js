"use client"
import sideNav from "./style/sideNav.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


// Icons Linking
import { FaEnvelopeOpenText } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoHelpCircleSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdCleanHands } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
// Icon Linking end


import Logo from "../../../public/logo.png";
function SideNavbar() {

  const [showBannerSubMenu, setShowBannerSubMenu] = useState(false);

  const handleBannerSubMenuToggle = () => {
    setShowBannerSubMenu(!showBannerSubMenu);
  };

  const handleLogout = () => {
    // Remove userId from localStorage
    localStorage.removeItem("userId");
    // Redirect to login page or any other page as needed
    window.location.href = "/";
  };


  return (
    <>

      <div className={sideNav.main}>
        <div className={sideNav.logo}>
          <Image src={Logo} alt="logo" />
        </div>

        <div className={sideNav.menuBar}>
          <ul>
            <li>
              <IoHome size={20} />
              <Link href={"/"}>
                Home
              </Link>
            </li>
            <li>
              <FaBookmark size={20} />
              <Link href={"/booking"}>
                Booking
              </Link>
            </li>


            <li onClick={handleBannerSubMenuToggle} style={{ position: 'relative' }}>
              <FaRegImages  size={20} style={{ marginRight: '10px' }} />
              Banner

              {
                showBannerSubMenu ? (
                  <FaChevronDown
                    size={15}
                    style={{
                      position: 'absolute',
                      bottom: 15,
                      right: 20,
                      marginLeft: '10px',
                    }}
                  />
                ) : (
                  <FaChevronRight
                    size={15}
                    style={{
                      position: 'absolute',
                      bottom: 15,
                      right: 20,
                      marginLeft: '10px',
                    }}
                  />
                )
              }

            </li>


            {
              showBannerSubMenu && (
                <ul className={sideNav.subMenu}>
                  <li>
                    <FaRegImages  size={20} style={{ marginRight: '10px' }} />
                    <Link href={'/banner'}>
                      Main Screen
                    </Link>
                  </li>
                  <li>
                    <FaRegImages  size={20} style={{ marginRight: '10px' }} />
                    <Link href={'/banner/submenubanner'}>
                      Sub Category
                    </Link>
                  </li>
                </ul>
              )
            }
            <li>
              <BiCategory size={20} />
              <Link href={"/category"}>
                Category
              </Link>
            </li>
            <li>
              <MdCleanHands size={20} />
              <Link href={"/services"}>
                Services
              </Link>
            </li>
            <li>
              <IoSettingsSharp size={23} />
              <Link href={"/setting"}>
                Setting
              </Link>
            </li>
            <li>
              <IoHelpCircleSharp size={25} />
              <Link href={"/help"}>
                Help & Support
              </Link>
            </li>
            <li onClick={handleLogout}>
              <CiLogout size={25} />
              <Link href={"/help"}>
                Log Out
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
}

export default SideNavbar;
