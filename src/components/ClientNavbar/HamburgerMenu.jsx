import React, { useState } from "react";
import Link from "next/link";

const HamburgerMenu = ({ menuData, setShowHamburgerMenu }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (label) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  return (
    <ul className="position-absolute bg-white d-flex flex-column gap-3 d-lg-none overflow-scroll ">
      {menuData.map((item) => (
        <li
          className=""
          key={item.label}
          onClick={() => handleMenuClick(item.label)}>
          {item.label}
          {item.items && activeMenu === item.label && (
            <ul className=" flex-column">
              {item.items.map((subItem) =>
                subItem?.items?.length > 0 ? (
                  <ul
                    key={subItem.label}
                    className="d-flex flex-column gap-2 flex-wrap">
                    <li>
                      <Link
                        href={subItem.url}
                        onClick={() => setShowHamburgerMenu(false)}>
                        {subItem.label}
                      </Link>
                    </li>
                    {subItem.items.map((childItem) => (
                      <li key={childItem.label}>
                        <Link
                          href={childItem.url}
                          onClick={() => setShowHamburgerMenu(false)}>
                          {childItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <li key={subItem.label}>
                    <Link href={subItem.url}>{subItem.label}</Link>
                  </li>
                )
              )}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default HamburgerMenu;
