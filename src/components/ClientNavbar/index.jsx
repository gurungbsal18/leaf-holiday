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
import React, { useContext, useState } from "react";
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

import { PrimeReactProvider } from "primereact/api";
import MegaMenuMain from "./MegaMenu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

export default function ClientNavbar() {
  const { isAuthUser, setIsAuthUser, setUser, user } =
    useContext(GlobalContext);
  const [showNavbar, setShowNavbar] = useState(false);
  const router = useRouter();

  function handleShowNavBar() {
    setShowNavbar(!showNavbar);
  }

  function profileImageMaker() {
    const { name } = user;

    // Split the name into an array of words
    const names = name.split(" ");

    // Extract the first character of each word and convert to uppercase
    const initials = names.map((word) => word.charAt(0).toUpperCase()).join("");
    console.log(initials);
    return initials;
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="image-container">
            <a href="/">
              <Image
                src="/images/logo.png"
                width={191}
                height={76}
                alt="leaf-holiday-logo"
                priority={true}
              />
            </a>
          </div>

          <div className="d-flex flex-column">
            <Button variant="success" size="sm" className="p-2">
              <span className="d-flex gap-2">
                Mount Kailash (Fixed Departure 2024)
              </span>
            </Button>
          </div>
        </div>
        <div className="d-block d-lg-flex justify-content-center gap-4 pb-2 align-items-center position-relative">
          <PrimeReactProvider>
            <MegaMenuMain />
            <div className="d-flex gap-3 login-section">
              {isAuthUser ? (
                <div
                  onClick={() =>
                    setTimeout(() => {
                      router.push("/account");
                    }, 1000)
                  }
                >
                  {profileImageMaker()}
                </div>
              ) : (
                <a
                  role="button"
                  className="text-success d-flex align-items-center gap-1 log-in-btn"
                  onClick={() => router.push("/login")}
                >
                  <LoginIcon />
                  Log In
                </a>
              )}
              {/* <a
                role="button"
                className="text-success d-flex align-items-center gap-2"
                onClick={() => router.push("/register")}
              >
                <PersonAddAltOutlinedIcon />
                Sign Up
              </a> */}
            </div>
          </PrimeReactProvider>
        </div>
        {/* <span onClick={handleShowNavBar} className="d-md-none">
          {showNavbar ? <MenuOpenIcon /> : <CloseIcon />}
        </span> */}
      </div>
    </>
  );
}
