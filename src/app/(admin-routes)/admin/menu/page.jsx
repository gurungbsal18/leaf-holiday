"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import axios from "@/utils/axios";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Menu() {
  const {
    pageLevelLoader,
    setPageLevelLoader,
    setDialogOpen,
    setDialogContent,
  } = useContext(GlobalContext);
  const [menuData, setMenuData] = useState(null);

  const getMenuData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get("/menu/");
      if (res.data.data.length > 0) {
        setMenuData(res.data.data);
      }
      setPageLevelLoader(false);
    } catch (e) {
      console.log(e);
      setPageLevelLoader(false);
    }
  };
  useEffect(() => {
    getMenuData();
  }, []);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div>
          <div>
            <h1>Menu</h1>
          </div>
          {initialMenuData.map((item) => (
            <div>
              <div className="d-flex justify-content-between ">
                <h3>{item.title}</h3>
                <button className="btn btn-sm btn-success d-flex gap-2 align-items-center">
                  {" "}
                  Add {item.title}'s Sub-Menu
                </button>
              </div>

              <div>
                {item.child.map((childItem) => (
                  <div className="d-flex justify-content-between align-items-center gap-2 pb-2">
                    <h5>{childItem.title}</h5>
                    <Link href={childItem.link}>{childItem.link}</Link>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-success d-flex gap-2 align-items-center"
                        onClick={() => {
                          setHomePageEdit(middleTab);
                          setDialogOpen(true);
                          setDialogContent(
                            <HomePageTab
                              position={"middle"}
                              valueDefault={middleTab}
                            />
                          );
                        }}>
                        <EditNoteIcon className="" />
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger d-flex gap-2 align-items-center "
                        onClick={() => handleRemove(middleTab?._id)}>
                        <DeleteIcon className="" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const initialMenuData = [
  {
    title: "Company",
    child: [
      // {
      //   title: "About Us",
      //   link: "https://leaf-frontend.sushilbalami.com.np/aboutUs",
      // },
      // { title: "Our Team", link: "/ourTeam" },
    ],
  },
];
