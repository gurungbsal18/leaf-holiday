"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Title from "./Title";
import Contents from "./Contents";
import { GlobalContext } from "@/context";
import Notification from "../Notification";
import axios from "@/utils/axios";

export default function EditPackage({ data }) {
  const { callExtractAll, updatePackage } = useContext(GlobalContext);

  const [allData, setAllData] = useState([]);

  async function extractAllContents() {
    const res = await axios.get(
      `/${data?.apiName}/package/${updatePackage?._id}`
    );
    if (res.status === 200) {
      setAllData(res?.data?.data);
    }
  }
  useEffect(() => {
    extractAllContents();
  }, [callExtractAll]);

  return (
    <div>
      <Header
        pageName={data?.pageName}
        createComponent={data?.createComponent}
      />
      <Title titles={data?.titles} />
      <Contents
        contents={allData}
        apiName={data?.apiName}
        updateComponent={data?.createComponent}
      />
    </div>
  );
}
