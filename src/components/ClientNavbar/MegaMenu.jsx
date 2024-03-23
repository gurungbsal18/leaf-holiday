import React, { useState } from "react";
import Link from "next/link";

const MegaMenu = ({ menuData }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (label) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  return (
    <ul className="d-none d-lg-flex gap-3 flex-wrap m-0 py-3 menu-header-container">
      {menuData.map((item) => (
        <li
          className="position-relative menu-header rounded"
          key={item.label}
          onClick={() => handleMenuClick(item.label)}
        >
          {item.label}
          {item.items && activeMenu === item.label && (
            <ul
              className={`position-absolute left-0 bg-white submenu row ${
                item.label.toLowerCase() === "trekking" ||
                item.label.toLowerCase() === "outbound" ||
                item.label.toLowerCase() === "activity"
                  ? ""
                  : " flex-column"
              }`}
            >
              {item.items.map((subItem) =>
                subItem?.items?.length > 0 ? (
                  <ul
                    key={subItem.label}
                    className="d-flex col-3 flex-column gap-2 flex-wrap p-4"
                  >
                    <li className="rounded bg-light">
                      <Link href={subItem.url}>{subItem.label}</Link>
                    </li>
                    {subItem.items.map((childItem) => (
                      <li className="rounded" key={childItem.label}>
                        {childItem.label}
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
      <li className="position-relative menu-header rounded">
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
};

export default MegaMenu;
