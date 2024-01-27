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

export default function ClientNavbar() {
  const { isAuthUser, setIsAuthUser, setUser, user } =
    useContext(GlobalContext);
  const [showNavbar, setShowNavbar] = useState(false);
  const router = useRouter();

  function handleShowNavBar() {
    setShowNavbar(!showNavbar);
  }
  function handleLogout() {
    toast.success("Logged Out Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  return (
    <Navbar className="p-5 pt-3 pb-3 h-20  " bg="light" expand="md">
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
      <div className="nav-container d-flex flex-row align-items-end w-100 flex-lg-column">
        <Button variant="success" size="sm" className="p-2">
          <span className="d-flex gap-2">
            Mount Kailash (Fixed Departure 2024)
          </span>
        </Button>
        <div className="nav-list">
          <Nav className="justify-content-end">
            {navItems.map((navItem) => (
              <Nav.Link key={navItem.id} href={navItem.path}>
                {navItem.label}
              </Nav.Link>
            ))}
          </Nav>
        </div>
        <div className="d-flex gap-3">
          {isAuthUser ? (
            <button onClick={handleLogout}>Log Out</button>
          ) : (
            <button onClick={() => router.push("/login")}>Log In</button>
          )}
          <button onClick={() => router.push("/register")}>Sign Up</button>
        </div>
        <span onClick={handleShowNavBar} className="d-md-none">
          {showNavbar ? <MenuOpenIcon /> : <CloseIcon />}
        </span>
      </div>
    </Navbar>
  );
}
