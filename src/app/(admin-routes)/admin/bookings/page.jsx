"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import Table from "@/components/ui/Table";
import { GlobalContext } from "@/context";
import axios from "@/utils/axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminBookings() {
  const { setPageLevelLoader, pageLevelLoader } = useContext(GlobalContext);
  const [activeTable, setActiveTable] = useState("booking");

  const [tableData, setTableData] = useState(null);

  const headerData = [
    { Header: "USER NAME", accessor: "userId.name" },
    { Header: "PACKAGE", accessor: "packageId.name" },
    { Header: "MESSAGE", accessor: "message" },
    {
      Header: "DATE",
      accessor: "dateOfTravel",
      Cell: ({ value }) => {
        return dayjs(value).format("MMM DD, YYYY");
      },
    },
    ,
    { Header: "PRICE", accessor: "price" },
  ];

  console.log(tableData);
  const getTableData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/booking/find/?formType=${activeTable}`);
      console.log(res);
      if (res.status === 200) {
        setTableData(res?.data?.data?.reverse());
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
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
    console.log("use effect");
    getTableData();
  }, [activeTable]);
  return (
    <div>
      <div className="d-flex gap-5">
        <button
          disabled={activeTable === "booking"}
          onClick={() => setActiveTable("booking")}>
          Bookings
        </button>
        <button
          disabled={activeTable === "inquiry"}
          onClick={() => setActiveTable("inquiry")}>
          Inquiries
        </button>
        <button
          disabled={activeTable === "customization"}
          onClick={() => setActiveTable("customization")}>
          Customization Requests
        </button>
      </div>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        tableData && (
          <Table
            headerData={headerData}
            bodyData={tableData}
            apiName={"booking"}
            showRemove={true}
            sizeOfPage={10}
          />
        )
      )}
    </div>
  );
}
