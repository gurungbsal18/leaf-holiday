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
import { IndeterminateCheckBoxOutlined } from "@mui/icons-material";

export default function Menu() {
  const {
    setUpdateForm,
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
      const finalArr = updateMenuData(res.data.data);
      setMenuData(finalArr);
      setPageLevelLoader(false);
    } catch (e) {
      setPageLevelLoader(false);
    }
  };
  useEffect(() => {
    getMenuData();
  }, [callExtractAll]);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="dashboard-content-section p-4">
          <div className="bg-success-subtle p-3 rounded mb-2">
            <h4 className="p-0">Navigation Menu</h4>
          </div>
          <div className="d-flex flex-column gap-5">
            {menuData.map((item) => (
              <div
                key={item.title}
                className="d-flex flex-column gap-2 bg-light p-3 rounded"
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="fw-bold m-0">{item.title}</p>
                  <button
                    className="btn btn-sm btn-success d-flex gap-2 align-items-center"
                    onClick={() => {
                      setDialogContent(<CreateMenu menuName={item.title} />);
                      setDialogOpen(true);
                    }}
                  >
                    {" "}
                    Add {item.title}&rsquo;s Sub-Menu
                  </button>
                </div>

                <div className="">
                  {item.child.length > 0 &&
                    item.child.map((childItem) => (
                      <div key={childItem._id}>
                        <div className="d-flex justify-content-between align-items-center pb-2 mb-2 border-bottom">
                          <p className="m-0">{childItem.title}</p>
                          <Link href={childItem.link}>{childItem.link}</Link>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-success d-flex gap-2 align-items-center"
                              onClick={() => {
                                setUpdateForm(childItem);
                                setDialogContent(
                                  <CreateMenu menuName={item.title} />
                                );
                                setDialogOpen(true);
                              }}
                            >
                              <EditNoteIcon className="" />
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger d-flex gap-2 align-items-center "
                              onClick={() => handleRemove(childItem._id)}
                            >
                              <DeleteIcon className="" />
                              Remove
                            </button>
                          </div>
                        </div>
                        {childItem.child.length > 0 && (
                          <div>
                            {childItem.child.map((lastChild, index) => (
                              <div
                                key={`lastchild-${IndeterminateCheckBoxOutlined}`}
                                className="d-flex gap-3"
                              >
                                <p>{lastChild.title}</p>
                                <p>{lastChild.link}</p>
                              </div>
                            ))}
                          </div>
                        )}
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
