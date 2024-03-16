import React, { useEffect, useState } from "react";
import { MegaMenu } from "primereact/megamenu";
import axios from "@/utils/axios";

export default function MegaMenuMain() {
  const [menuData, setMenuData] = useState(initialMenu);
  const getMenuData = async () => {
    const res = await axios.get("/menu/");
    const finalMenu = updateInitialMenu(res.data.data);
    setMenuData(finalMenu);
  };
  useEffect(() => {
    getMenuData();
  }, []);

  return (
    <div className="megamenu-nav">
      <MegaMenu model={menuData} breakpoint="1280px" />
    </div>
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
        const newItem = [
          {
            label: menuItem.title,
            url: menuItem.link,
            items: menuItem.child.map((childItem) => ({
              label: childItem.title,
              url: childItem.link,
            })),
          },
        ];
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

  {
    label: "Contact",
    url: "/contact",
  },
];
