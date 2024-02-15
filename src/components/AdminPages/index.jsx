"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { GlobalContext } from "@/context";
import PageLevelLoader from "../Loader/PageLevelLoader";
import { toast } from "react-toastify";
import Table from "../ui/Table";
import axios from "@/utils/axios";

export default function AdminPages({ data }) {
  const {
    callExtractAll,
    dialogOpen,
    dialogContent,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [allData, setAllData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  async function extractAllContents() {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/${data.apiName}/`);
      console.log(res);
      if (res.status === 200) {
        setAllData(res.data.data);
        setFilteredData(res.data.data);
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error("Something Went Wrong. Please Try Again...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
    }
  }
  useEffect(() => {
    extractAllContents();
  }, [callExtractAll]);

  useEffect(() => {
    if (keyword === "") {
      setFilteredData(allData);
    } else {
      try {
        const temp = [];
        allData.map((data) => {
          if (data.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
            temp.push(data);
          }
        });
        setFilteredData(temp);
      } catch (e) {
        toast.error("Something went wrong. Please try again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }, [keyword]);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="">
          <Header
            pageName={data.pageName}
            createComponent={data.createComponent}
            keyword={keyword}
            setKeyword={setKeyword}
          />
          <Table
            headerData={data.headerData}
            bodyData={filteredData}
            apiName={data.apiName}
            updateComponent={data.createComponent}
            showView={data.showView}
            showEdit={data.showEdit}
            showRemove={data.showRemove}
            showImage={data.showImage}
            checkbox={data.checkbox}
            setVerify={data.setVerify}
          />
        </div>
      )}
    </>
  );
}
