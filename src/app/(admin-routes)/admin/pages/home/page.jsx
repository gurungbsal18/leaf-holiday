"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import HomePageTab from "@/components/ui/HomePageTab";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "@/utils/axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AddHeroImage from "@/components/ui/AddHeroImage";

export default function EditHome() {
  const {
    callExtractAll,
    setCallExtractAll,
    setPageLevelLoader,
    pageLevelLoader,
    setHomePageEdit,
    setDialogOpen,
    setDialogContent,
  } = useContext(GlobalContext);
  const [homePageData, setHomePageData] = useState(null);

  const handleRemove = async (id) => {
    setPageLevelLoader(true);
    try {
      const res = await axios.delete(`/tabs/delete/${id}`);
      res;
      if (res.status === 200) {
        setCallExtractAll(!callExtractAll);
        toast.success("Tab Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setPageLevelLoader(false);
    } catch (e) {
      toast.error(
        e?.response?.data?.error ||
          "Something went wrong. Please try again !!!",
        { position: toast.POSITION.TOP_RIGHT }
      );
      setPageLevelLoader(false);
    }
  };

  const getHomePageDetail = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/homepage/`);
      if (res.status === 200) {
        setPageLevelLoader(false);
        setHomePageData(res.data);
      } else {
        toast.error(
          res?.message || "Something Went Wrong. Please Try Again...",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error ||
          "Something went wrong. Please try again !!!",
        { position: toast.POSITION.TOP_RIGHT }
      );
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    getHomePageDetail();
  }, [callExtractAll]);

  return (
    <div className="dashboard-content-section p-4">
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div>
          <div className="d-flex gap-2 mb-2">
            <Link href={"/admin/pages"}>
              <ArrowBackIcon />
            </Link>
            <h4 className="title fw-bold">Edit HOME PAGE</h4>
          </div>

          <div className="">
            <div className="d-flex justify-content-between align-items-center bg-success-subtle p-2 mt-4 mb-2 rounded">
              <h4 className="title m-0">Home Page Hero Section Images</h4>
              <button
                className="btn btn-sm btn-success"
                onClick={() => {
                  setDialogOpen(true);
                  setDialogContent(<AddHeroImage />);
                }}>
                Add New Image
              </button>
            </div>
            <div className="d-flex flex-column gap-3 bg-light rounded p-3 mb-4">
              {/* {homePageData?.tabs?.middle?.map((middleTab) => (
                <div key={middleTab._id}>
                  <div className="d-flex justify-content-between align-items-center gap-2 border-bottom pb-2">
                    <h5>{middleTab.title}</h5>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-success"
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
                        <EditNoteIcon className ms-2 />
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemove(middleTab?._id)}>
                        <DeleteIcon className="ms-2" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="border-bottom">
                    <ol>
                      {middleTab &&
                        middleTab.packages.map((item) => (
                          <li key={item._id}>{item.name}</li>
                        ))}
                    </ol>
                  </div>
                </div>
              ))} */}
            </div>
          </div>

          <div>
            <div>
              <div className="bg-success-subtle p-2 rounded">
                <h5 className="title m-0">Top Level Tabs</h5>
                {!homePageData?.tabs?.top && (
                  <button
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogContent(<HomePageTab position={"top"} />);
                    }}>
                    Add New Tab
                  </button>
                )}
              </div>
              {homePageData?.tabs?.top?.length > 0 && (
                <div className="bg-light p-2 my-3">
                  <div className="d-flex justify-content-between align-items-center align-items-end border-bottom py-3">
                    <h5 className="">{homePageData?.tabs?.top[0]?.title}</h5>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-md btn-success"
                        onClick={() => {
                          setHomePageEdit(homePageData?.tabs?.top[0]);
                          setDialogOpen(true);
                          setDialogContent(
                            <HomePageTab
                              position={"top"}
                              valueDefault={homePageData?.tabs?.top[0]}
                            />
                          );
                        }}>
                        <EditNoteIcon className ms-2 />
                        Edit
                      </button>
                      <button
                        className="btn btn-md btn-danger"
                        onClick={() =>
                          handleRemove(homePageData?.tabs?.top[0]?._id)
                        }>
                        <DeleteIcon className="ms-2" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div>
                    <ol>
                      {homePageData?.tabs?.top[0] &&
                        homePageData?.tabs?.top[0].packages.map((item) => (
                          <li key={item._id} className="p-3 border-bottom">
                            {item.name}
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="">
            <div className="d-flex justify-content-between align-items-center bg-success-subtle p-2 mt-4 mb-2 rounded">
              <h4 className="title m-0">Middle Level Tabs</h4>
              <button
                className="btn btn-sm btn-success"
                onClick={() => {
                  setDialogOpen(true);
                  setDialogContent(<HomePageTab position={"middle"} />);
                }}>
                Add New Tab
              </button>
            </div>
            <div className="d-flex flex-column gap-3 bg-light rounded p-3 mb-4">
              {homePageData?.tabs?.middle?.map((middleTab) => (
                <div key={middleTab._id}>
                  <div className="d-flex justify-content-between align-items-center gap-2 border-bottom pb-2">
                    <h5>{middleTab.title}</h5>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-success"
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
                        <EditNoteIcon className ms-2 />
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemove(middleTab?._id)}>
                        <DeleteIcon className="ms-2" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="border-bottom">
                    <ol>
                      {middleTab &&
                        middleTab.packages.map((item) => (
                          <li key={item._id}>{item.name}</li>
                        ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="">
              <div className="d-flex justify-content-between align-items-center rounded bg-success-subtle p-2 mt-2">
                <h4 className="title m-0">Bottom Level Tabs</h4>
                {!homePageData?.tabs?.bottom && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogContent(
                        <HomePageTab position={"bottom"} url={true} />
                      );
                    }}>
                    Add New Tab
                  </button>
                )}
              </div>
              <div className="bg-light rounded p-3 mt-2">
                {homePageData?.tabs?.bottom?.length > 0 && (
                  <div className="">
                    <div className="d-flex justify-content-between ">
                      <h5>{homePageData?.tabs?.bottom[0]?.title}</h5>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            setHomePageEdit(homePageData?.tabs?.bottom[0]);
                            setDialogOpen(true);
                            setDialogContent(
                              <HomePageTab
                                position={"bottom"}
                                valueDefault={homePageData?.tabs?.bottom[0]}
                                url={true}
                              />
                            );
                          }}>
                          <EditNoteIcon className="ms-2" />
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleRemove(homePageData?.tabs?.bottom[0]?._id)
                          }>
                          <DeleteIcon className="ms-2" />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div>
                      <p>{homePageData?.tabs?.bottom[0]?.videoUrl}</p>
                      <ol>
                        {homePageData?.tabs?.bottom[0] &&
                          homePageData?.tabs?.bottom[0].packages.map((item) => (
                            <li key={item._id}>{item.name}</li>
                          ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
