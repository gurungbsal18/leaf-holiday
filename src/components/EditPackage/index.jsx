"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { GlobalContext } from "@/context";
import axios from "@/utils/axios";
import Table from "../ui/Table";

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
    <div className="bg-light p-3 rounded mt-4">
      <Header
        pageName={data?.pageName}
        createComponent={data?.createComponent}
      />
      <Table
        headerData={data.headerData}
        bodyData={allData}
        apiName={data.apiName}
        updateComponent={data.createComponent}
        showView={data.showView}
        showEdit={data.showEdit}
        showRemove={data.showRemove}
        showImage={data.showImage}
        checkbox={data.checkbox}
        setVerify={data.setVerify}
        noPagination={true}
      />
    </div>
  );
}
