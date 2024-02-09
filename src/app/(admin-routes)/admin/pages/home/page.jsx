"use client";
import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "@/context";
import axios from "axios";
import CustomAutocomplete from "@/components/ui/CustomAutocomplete";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import HomePageTab from "@/components/ui/HomePageTab";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditHome() {
  const {
    callExtractAll,
    setCallExtractAll,
    setPageLevelLoader,
    pageLevelLoader,
    homePageEdit,
    setHomePageEdit,
    setDialogOpen,
    dialogContent,
    setDialogContent,
  } = useContext(GlobalContext);
  const [topTabCount, setTopTabCount] = useState(0);
  const [middleTabCount, setMiddleTabCount] = useState([0]);
  const [bottomTabCount, setBottomTabCount] = useState(0);
  const [allPackages, setAllPackages] = useState(null);
  const [homePageData, setHomePageData] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tabs/delete/${id}`
      );
      console.log(res);
      if (res.status === 200) {
        setCallExtractAll(!callExtractAll);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getHomePageDetail = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/homepage/`
      );
      if (res.status === 200) {
        setPageLevelLoader(false);
        setHomePageData(res.data);
      }
    } catch (e) {
      console.log(e);
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    getHomePageDetail();
  }, [callExtractAll]);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={pageLevelLoader} />
      ) : (
        <div>
          <div>
            <Link href={"/admin/pages"}>
              <ArrowBackIcon />
            </Link>
            <h1>Edit HOME PAGE</h1>
          </div>
          <div>
            <div>
              <div>
                <h3>Top Level Tabs</h3>
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
                <div>
                  <div>
                    <h5>{homePageData?.tabs?.top[0]?.title}</h5>
                    <button
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
                      onClick={() =>
                        handleRemove(homePageData?.tabs?.top[0]?._id)
                      }
                    >
                      Remove
                    </button>
                  </div>

                  <div>
                    {homePageData?.tabs?.top[0] &&
                      homePageData?.tabs?.top[0].packages.map((item) => (
                        <p>{item.name}</p>
                      ))}
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
                <div>
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
                      middleTab.packages.map((item) => <p>{item.name}</p>)}
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
                        <p>{item.name}</p>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
