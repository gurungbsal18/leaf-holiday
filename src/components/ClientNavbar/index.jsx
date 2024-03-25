"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "@/utils/axios";
import MegaMenu from "./MegaMenu";
import HamburgerMenu from "./HamburgerMenu";

export default function ClientNavbar() {
  const { isAuthUser, user, setUser, setIsAuthUser, setPageLevelLoader } =
    useContext(GlobalContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [menuData, setMenuData] = useState(initialMenu);
  const menuRef = useRef();
  const pathName = usePathname().split("/")[1];

  const router = useRouter();

  function profileImageMaker() {
    const { name } = JSON.parse(localStorage.getItem("user"));

    // Split the name into an array of words
    const names = name.split(" ");

    // Extract the first character of each word and convert to uppercase
    const initials = names.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  }

  const getMenuData = async () => {
    const res = await axios.get("/menu/");
    const finalMenu = updateInitialMenu(res.data.data);
    setMenuData(finalMenu);
  };

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
  useEffect(() => {
    getMenuData();
  }, []);
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef?.current?.contains(e?.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div className="container bg-white">
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
            {/* {user && user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setPageLevelLoader(true)}
                className="d-none d-md-block text-success"
              >
                Admin Dashboard
              </Link>
            )} */}
            <Button variant="success" size="sm" className="p-2">
              <span className="d-flex gap-2">
                Mount Kailash (Fixed Departure 2024)
              </span>
            </Button>
          </div>
        </div>
        <div className="d-block d-lg-flex justify-content-center gap-4 pb-2 align-items-center position-relative mt-2 main-menu">
          <div className="megamenu-nav">
            <MegaMenu menuData={menuData} />
          </div>

          <div className="d-flex gap-3 login-section z-2">
            {isAuthUser ? (
              pathName !== "account" && (
                <div className="d-flex align-items-center gap-2 login-section-user">
                  <Link href="/account">
                    <div className="login-user">{profileImageMaker()}</div>
                  </Link>
                  <div>
                    <div
                      onClick={() => setShowMenu((prev) => !prev)}
                      style={{ cursor: "pointer" }}>
                      {showMenu ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    <div
                      ref={menuRef}
                      className={`login-dropdown ${showMenu ? "" : "d-none"}`}>
                      <p className="m-0">{user && user?.name}</p>
                      <hr />
                      <Link
                        href="/account"
                        className="mb-2 p-2 rounded"
                        onClick={() => {
                          setPageLevelLoader(true);
                          setShowMenu(false);
                        }}>
                        User Information
                      </Link>
                      <div className="mb-2">
                        {user && user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setPageLevelLoader(true)}
                            className="d-none d-md-block text-success p-2 rounded">
                            Admin Dashboard
                          </Link>
                        )}
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )
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
          <div className="d-lg-none position-relative">
            <div onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}>
              {showHamburgerMenu ? <CloseIcon /> : <MenuOpenIcon />}
            </div>

            <div>
              {showHamburgerMenu && (
                <HamburgerMenu
                  menuData={menuData}
                  setShowHamburgerMenu={setShowHamburgerMenu}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function updateInitialMenu(response) {
  // Make a copy of the initialMenu array to avoid mutation
  const updatedMenu = JSON.parse(JSON.stringify(initialMenu));

  response.forEach((menuItem) => {
    // Handle the "Contact" menu item separately
    if (menuItem.label === "Contact" && menuItem.url) {
      updatedMenu.push({
        label: menuItem.label,
        url: menuItem.url,
      });
    } else {
      // Find the matching parent in the updatedMenu
      const parentMenu = updatedMenu.find(
        (menu) => menu.label === menuItem.parent
      );
      if (parentMenu) {
        // Add child items to the parent menu
        let newItem = {
          label: menuItem.title,
          url: menuItem.link,
          items: menuItem.child.map((childItem) => ({
            label: childItem.title,
            url: childItem.link,
          })),
        };
        if (newItem.length > 0 && newItem.items.length === 0) {
          // Remove the 'items' key from the object
          const { items, ...newItemWithoutItems } = newItem;
          // Update the variable with the modified object
          newItem = newItemWithoutItems;
        }
        parentMenu.items.push(newItem);
      }
    }
  });
  return updatedMenu;
}

const initialMenu = [
  {
    label: "Trekking",
    items: [],
  },
  {
    label: "Company",
    items: [],
  },
  {
    label: "Kailash Tours",
    items: [],
  },
  {
    label: "Activity",
    items: [],
  },
  {
    label: "Day Tours",
    items: [],
  },
  {
    label: "Outbound",
    items: [],
  },
  {
    label: "Nepal Tour",
    items: [],
  },
  {
    label: "Travel Info",
    items: [],
  },
];
