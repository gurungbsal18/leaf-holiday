"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Title from "./Title";
import Contents from "./Contents";
import { GlobalContext } from "@/context";
import axios from "axios";
import Notification from "../Notification";
import Dialog from "@mui/material/Dialog";
import Table from "../ui/Table";
import PageLevelLoader from "../Loader/PageLevelLoader";

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
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${data.apiName}/`
      );

      if (res.status === 200) {
        setAllData(res.data.data);
        setFilteredData(res.data.data);
      }
      setPageLevelLoader(false);
    } catch (e) {
      console.log(e);
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
      const temp = [];
      allData.map((data) => {
        if (data.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          temp.push(data);
        }
      });
      setFilteredData(temp);
    }
  }, [keyword]);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={pageLevelLoader} />
      ) : (
        <div className="">
          <Header
            pageName={data.pageName}
            createComponent={data.createComponent}
            keyword={keyword}
            setKeyword={setKeyword}
          />
          {/* <Title titles={data.titles} />
      <Contents
        contents={filteredData}
        apiName={data.apiName}
        updateComponent={data.createComponent}
      /> */}
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
