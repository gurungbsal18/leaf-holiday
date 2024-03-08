"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import axios from "@/utils/axios";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateMenu from "@/components/CreateComponents/CreateMenu";
import { toast } from "react-toastify";

export default function Menu() {
  const {
    pageLevelLoader,
    setPageLevelLoader,
    setDialogOpen,
    setDialogContent,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);
  const [menuData, setMenuData] = useState(initialMenuData);

  async function handleRemove(id) {
    try {
      setPageLevelLoader(true);
      const res = await axios.delete(`/menu/delete/${id}`);
      if (res.status === 200) {
        setCallExtractAll(!callExtractAll);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setPageLevelLoader(false);
    }
  }

  const getMenuData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get("/menu/");
      console.log(JSON.stringify(res.data));
      const finalArr = updateMenuData(res.data.data);
      console.log("final array", finalArr);
      setMenuData(finalArr);
      setPageLevelLoader(false);
    } catch (e) {
      console.log(e);
      setPageLevelLoader(false);
    }
  };
  useEffect(() => {
    getMenuData();
  }, [callExtractAll]);
  console.log("menu data:", menuData);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div>
          <div>
            <h1>Menu</h1>
          </div>
          <div className="d-flex flex-column gap-5">
            {menuData.map((item) => (
              <div key={item.title} className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between ">
                  <h3>{item.title}</h3>
                  <button
                    className="btn btn-sm btn-success d-flex gap-2 align-items-center"
                    onClick={() => {
                      setDialogContent(<CreateMenu menuName={item.title} />);
                      setDialogOpen(true);
                    }}>
                    {" "}
                    Add {item.title}&rsquo;s Sub-Menu
                  </button>
                </div>

                <div className="">
                  {item.child.length > 0 &&
                    item.child.map((childItem) => (
                      <div
                        key={childItem._id}
                        className="d-flex justify-content-between align-items-center gap-2 pb-2">
                        <h5>{childItem.title}</h5>
                        <Link href={childItem.link}>{childItem.link}</Link>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-success d-flex gap-2 align-items-center"
                            onClick={() => {
                              setDialogContent(<CreateMenu />);
                              setDialogOpen(true);
                            }}>
                            <EditNoteIcon className="" />
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-danger d-flex gap-2 align-items-center "
                            onClick={() => handleRemove(childItem._id)}>
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
        </div>
      )}
    </>
  );
}

function updateMenuData(response) {
  // Create a copy of initialMenuData
  const updatedMenuData = JSON.parse(JSON.stringify(initialMenuData));

  // If response is empty, return the copied initialMenuData
  if (response.length === 0) {
    return updatedMenuData;
  }

  // Iterate over response
  response.forEach((responseItem) => {
    // Find matching parent in copied initialMenuData
    const matchingMenuItem = updatedMenuData.find(
      (menuItem) => menuItem.title === responseItem.parent
    );

    // If found and the title doesn't exist in the parent's child array, add responseItem to the child array
    if (
      matchingMenuItem &&
      !matchingMenuItem.child.some(
        (childItem) => childItem.title === responseItem.title
      )
    ) {
      matchingMenuItem.child.push({
        title: responseItem.title,
        link: responseItem.link,
        child: responseItem.child,
        _id: responseItem._id,
      });
    }
  });

  return updatedMenuData;
}

const initialMenuData = [
  {
    title: "Company",
    child: [],
  },
  {
    title: "Trekking",
    child: [],
  },
  {
    title: "Kailash Tours",
    child: [],
  },
  {
    title: "Activity",
    child: [],
  },
  {
    title: "Day Tours",
    child: [],
  },
  {
    title: "Outbound",
    child: [],
  },
  {
    title: "Nepal Tour",
    child: [],
  },
  {
    title: "Travel Info",
    child: [],
  },
];
