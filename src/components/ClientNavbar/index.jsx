// "use client";
// import React, { useState } from "react";
// import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
// import Image from "next/image";
// import Nav from "react-bootstrap/Nav";
// import { navItems } from "@/utils";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import CloseIcon from "@mui/icons-material/Close";

// import { PrimeReactProvider } from "primereact/api";
// import MegaMenuMain from "./MegaMenu";

// export default function ClientNavbar() {
//   const [showNavbar, setShowNavbar] = useState(false);

//   function handleShowNavBar() {
//     setShowNavbar(!showNavbar);
//   }

//   return (
//     <>
//       <Navbar className="p-5 pt-3 pb-3 h-20  " bg="light" expand="md">
//        <div className="image-container">
//          <a href="/">
//           <Image
//             src="/images/logo.png"
//             width={191}
//             height={76}
//             alt="leaf-holiday-logo"
//             priority={true}
//           />
//         </a>
//       </div>
//       <div className="nav-container d-flex flex-row align-items-end w-100 flex-lg-column">
//         <Button variant="success" size="sm" className="p-2">
//           <span className="d-flex gap-2">
//             Mount Kailash (Fixed Departure 2024)
//           </span>
//         </Button>

//       <PrimeReactProvider>
//         <div className="nav-list">
//             <Nav className="justify-content-end">
//               {navItems.map((navItem) => (
//                 <Nav.Link key={navItem.id} href={navItem.path}>
//                   {navItem.label}
//                 </Nav.Link>
//               ))}
//             </Nav>
//           </div>

//         <MegaMenuMain />
//       </PrimeReactProvider>
//       <span onClick={handleShowNavBar} className="d-md-none">
//         {showNavbar ? <MenuOpenIcon /> : <CloseIcon />}
//       </span>
//       </div>
//       // </Navbar>
//     </>
//   );
// }

"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import { navItems } from "@/utils";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Link from "next/link";
import { PrimeReactProvider } from "primereact/api";
import MegaMenuMain from "./MegaMenu";
import LoginIcon from "@mui/icons-material/Login";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "@/utils/axios";

export default function ClientNavbar() {
  const { isAuthUser, user, setUser, setIsAuthUser, setPageLevelLoader } =
    useContext(GlobalContext);

  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();

  function profileImageMaker() {
    const { name } = JSON.parse(localStorage.getItem("user"));

    // Split the name into an array of words
    const names = name.split(" ");

    // Extract the first character of each word and convert to uppercase
    const initials = names.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  }

  function handleLogout() {
    toast.success("Logged Out Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setShowMenu(false);
    setTimeout(() => {
      setUser(null);
      Cookies.remove("token");
      localStorage.clear();
      setIsAuthUser(false);
      router.push("/login");
    }, 1000);
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-column flex-md-row header">
          <div className="logo-img">
            <Link href="/" onClick={() => setPageLevelLoader(true)}>
              <Image
                src="/images/logo.png"
                width={191}
                height={76}
                alt="leaf-holiday-logo"
                priority={true}
              />
            </Link>
          </div>

          <div className="d-flex">
            {user && user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setPageLevelLoader(true)}
                className="d-none d-md-block text-success">
                Admin Dashboard
              </Link>
            )}
            <Button variant="success" size="sm" className="p-2">
              <span className="d-flex gap-2">
                Mount Kailash (Fixed Departure 2024)
              </span>
            </Button>
          </div>
        </div>
        <div className="d-block d-lg-flex justify-content-center gap-4 pb-2 align-items-center position-relative mt-2">
          <PrimeReactProvider>
            <MegaMenuMain />
          </PrimeReactProvider>

          <div className="d-flex gap-3 login-section">
            {isAuthUser ? (
              <div className="d-flex align-items-center gap-2 login-section-user">
                <div
                  onClick={() => {
                    setPageLevelLoader(true);
                    setTimeout(() => {
                      router.push("/account");
                    }, 1000);
                  }}
                  style={{ cursor: "pointer" }}>
                  <div className="login-user">{profileImageMaker()}</div>
                </div>
                <div>
                  <div
                    onClick={() => setShowMenu((prev) => !prev)}
                    style={{ cursor: "pointer" }}>
                    {showMenu ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  <div className={`login-dropdown ${showMenu ? "" : "d-none"}`}>
                    <p className="m-0">{user && user?.name}</p>
                    <hr />
                    <Link
                      href="/account/"
                      className="mb-2"
                      onClick={() => {
                        setPageLevelLoader(true);
                        setShowMenu(false);
                      }}>
                      User Information
                    </Link>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                role="button"
                className="text-success d-flex align-items-center gap-1 log-in-btn"
                href="/login">
                <LoginIcon />
                Log In
              </Link>
            )}
          </div>
        </div>
        {/* <span onClick={handleShowNavBar} className="d-md-none">
          {showNavbar ? <MenuOpenIcon /> : <CloseIcon />}
        </span> */}
      </div>
    </>
  );
}
