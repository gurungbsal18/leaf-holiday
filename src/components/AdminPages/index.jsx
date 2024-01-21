"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Title from "./Title";
import Contents from "./Contents";
import { GlobalContext } from "@/context";
import axios from "axios";
import Notification from "../Notification";

export default function AdminPages({ data }) {
  const { callExtractAll } = useContext(GlobalContext);

  const [allData, setAllData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  async function extractAllContents() {
    const res = await axios.get(`http://localhost:5001/${data.apiName}/`);
    if (res.status === 200) {
      setAllData(res.data.data);
      setFilteredData(res.data.data);
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

  console.log("filtered data", filteredData);

  return (
    <div>
      <Header
        pageName={data.pageName}
        createComponent={data.createComponent}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <Title titles={data.titles} />
      <Contents contents={filteredData} apiName={data.apiName} />
      <Notification />
    </div>
  );
}
