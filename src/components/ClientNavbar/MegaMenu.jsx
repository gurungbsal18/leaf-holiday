import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GlobalContext } from "@/context";

const MegaMenu = ({ menuData }) => {
  const { setPageLevelLoader } = useContext(GlobalContext);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef();

  const handleMenuClick = (label) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  useEffect(() => {
    const handler = (e) => {
      console.log(e.target);
      console.log(menuRef);
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
    <ul className="d-none d-md-flex gap-3 flex-wrap m-0 py-3 menu-header-container">
      {menuData.map((item) => (
        <li
          className="menu-header rounded"
          key={item.label}
          onClick={() => handleMenuClick(item.label)}
        >
          {item.label}
          {item.items && activeMenu === item.label && (
            <div
              ref={menuRef}
              className={`position-absolute left-0 bg-white mega-menu p-2 rounded border row flex-wrap${
                item.label.toLowerCase() === "trekking" ||
                item.label.toLowerCase() === "outbound" ||
                item.label.toLowerCase() === "activity"
                  ? ""
                  : " flex-column"
              }`}
            >
              {item.items.map((subItem) =>
                subItem?.items?.length > 0 ? (
                  <ul key={subItem.label} className="mega-menu-items col">
                    <li className="text-success fw-bold">
                      <Link
                        href={subItem.url}
                        onClick={() => setPageLevelLoader(true)}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                    {subItem.items.map((childItem) => (
                      <li key={childItem.label} className="rounded">
                        <Link
                          href={childItem.url}
                          onClick={() => setPageLevelLoader(true)}
                        >
                          {childItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <li key={subItem.label}>
                    <Link
                      href={subItem.url}
                      onClick={() => setPageLevelLoader(true)}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                )
              )}
            </div>
          )}
        </li>
      ))}
      <li className="position-relative menu-header rounded">
        <Link href="/contact" onClick={() => setPageLevelLoader(true)}>
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default MegaMenu;
