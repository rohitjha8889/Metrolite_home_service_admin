"use client";
import { Inter } from "next/font/google";
import layout from "./global.module.css";
import SideNavbar from "./components/SideNavbar";
import TopNav from "./components/TopNav";
import { useState } from "react";
import { DataProvider } from "./Data/DataContext";
import Login from "./components/Login";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [showSideNavbar, setShowSideNavbar] = useState(true); 
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const toggleSideNavbar = () => {
    setShowSideNavbar(!showSideNavbar);
  };

  if(!userId){
    return(
      <html lang="en">
      <body className={layout.adminMain}>


      <Login/>
      </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={layout.adminMain}>
        
        <div className={layout.sideNav} style={{ width: showSideNavbar ? '20%' : '0', overflow: 'hidden' }}>
          {showSideNavbar && <SideNavbar />}
        </div>
        <div className={layout.pageContent} style={{ width: showSideNavbar ? '80%' : '100%' }}>
          <TopNav toggleSideNavbar={toggleSideNavbar} />
          <DataProvider>
          {children}
          </DataProvider>
        </div>

        {/* <Login/> */}
      </body>
    </html>
  );
}
