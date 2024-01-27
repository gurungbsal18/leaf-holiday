"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Title from "./Title";
import Contents from "./Contents";
import { GlobalContext } from "@/context";
import axios from "axios";
import Notification from "../Notification";

export default function EditPackage({ data }) {
  const { callExtractAll, updatePackage } = useContext(GlobalContext);

  const [allData, setAllData] = useState([]);

  async function extractAllContents() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${data.apiName}/package/${updatePackage._id}`
    );
    if (res.status === 200) {
      setAllData(res.data.data);
    }
  }
  useEffect(() => {
    extractAllContents();
  }, [callExtractAll]);

  return (
    <div>
      <Header pageName={data.pageName} createComponent={data.createComponent} />
      <Title titles={data.titles} />
      <Contents
        contents={allData}
        apiName={data.apiName}
        updateComponent={data.createComponent}
      />
    </div>
  );
}
