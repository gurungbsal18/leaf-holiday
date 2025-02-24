import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GlobalContext } from "@/context";

const HamburgerMenu = ({ menuData, setShowHamburgerMenu }) => {
  const { setPageLevelLoader } = useContext(GlobalContext);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef();

  const handleMenuClick = (label) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef?.current?.contains(e?.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <ul
      className="position-absolute bg-white d-flex flex-column gap-3 d-lg-none overflow-scroll z-2 mobile-mega-menu border p-3"
      ref={menuRef}>
      {menuData.map((item) => (
        <li
          className="mobile-menu-header"
          key={item.label}
          onClick={() => handleMenuClick(item.label)}>
          {item.label}
          {item.items && activeMenu === item.label && (
            <ul className="p-0 flex-column">
              {item.items.map((subItem) =>
                subItem?.items?.length > 0 ? (
                  <ul
                    key={subItem.label}
                    className="d-flex flex-column gap-2 flex-wrap p-0">
                    <li className="mobile-mega-menu-header fw-bold rounded p-2">
                      <Link
                        href={subItem.url}
                        onClick={() => {
                          setShowHamburgerMenu(false);
                          setPageLevelLoader(true);
                        }}>
                        {subItem.label}
                      </Link>
                    </li>
                    {subItem.items.map((childItem) => (
                      <li key={childItem.label} className="">
                        <Link
                          href={childItem.url}
                          onClick={() => {
                            setShowHamburgerMenu(false);
                            setPageLevelLoader(true);
                          }}>
                          {childItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <li key={subItem.label}>
                    <Link
                      onClick={() => setShowHamburgerMenu(false)}
                      href={subItem.url}>
                      {subItem.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}
        </li>
      ))}
      <li>
        <Link
          href="/contact"
          onClick={() => {
            setShowHamburgerMenu(false);
            setPageLevelLoader(true);
          }}>
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default HamburgerMenu;
