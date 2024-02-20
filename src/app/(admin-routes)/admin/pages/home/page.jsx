"use client";
import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "@/context";
import CustomAutocomplete from "@/components/ui/CustomAutocomplete";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import HomePageTab from "@/components/ui/HomePageTab";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "@/utils/axios";

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
    } catch (e) {
      toast.error("Something Went Wrong. Please Try Again...", {
        position: toast.POSITION.TOP_RIGHT,
      });
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
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (e) {
      toast.error("Something Went Wrong. Please Try Again...", {
        position: toast.POSITION.TOP_RIGHT,
      });
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
          <div>
            <div>
              <div>
                <h4 className="title fw-bold">Top Level Tabs</h4>
                {!homePageData?.tabs?.top && (
                  <button
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogContent(<HomePageTab position={"top"} />);
                    }}
                  >
                    Add New Tab
                  </button>
                )}
              </div>
              {homePageData?.tabs?.top?.length > 0 && (
                <div className="bg-light p-2 my-3">
                  <div className="d-flex justify-content-between align-items-end border-bottom py-3">
                    <h4 className="title">
                      {homePageData?.tabs?.top[0]?.title}
                    </h4>
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
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-md btn-danger"
                        onClick={() =>
                          handleRemove(homePageData?.tabs?.top[0]?._id)
                        }
                      >
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

          <div>
            <div>
              <h3>Middle Level Tabs</h3>
              <button
                onClick={() => {
                  setDialogOpen(true);
                  setDialogContent(<HomePageTab position={"middle"} />);
                }}
              >
                Add New Tab
              </button>
            </div>
            <div className="d-flex">
              {homePageData?.tabs?.middle?.map((middleTab) => (
                <div key={middleTab._id}>
                  <div>
                    <h5>{middleTab.title}</h5>
                    <button
                      onClick={() => {
                        setHomePageEdit(middleTab);
                        setDialogOpen(true);
                        setDialogContent(
                          <HomePageTab
                            position={"middle"}
                            valueDefault={middleTab}
                          />
                        );
                      }}
                    >
                      Edit
                    </button>

                    <button onClick={() => handleRemove(middleTab?._id)}>
                      Remove
                    </button>
                  </div>

                  <div>
                    {middleTab &&
                      middleTab.packages.map((item) => (
                        <p key={item._id}>{item.name}</p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div>
              <div>
                <h3>Bottom Level Tabs</h3>
                {!homePageData?.tabs?.bottom && (
                  <button
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogContent(
                        <HomePageTab position={"bottom"} url={true} />
                      );
                    }}
                  >
                    Add New Tab
                  </button>
                )}
              </div>
              <div></div>
              {homePageData?.tabs?.bottom?.length > 0 && (
                <div>
                  <div>
                    <h5>{homePageData?.tabs?.bottom[0]?.title}</h5>
                    <button
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
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleRemove(homePageData?.tabs?.bottom[0]?._id)
                      }
                    >
                      Remove
                    </button>
                  </div>

                  <div>
                    <p>{homePageData?.tabs?.bottom[0]?.videoUrl}</p>
                    {homePageData?.tabs?.bottom[0] &&
                      homePageData?.tabs?.bottom[0].packages.map((item) => (
                        <p key={item._id}>{item.name}</p>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
