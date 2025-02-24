"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import Table from "@/components/ui/Table";
import dayjs from "dayjs";
import axios from "@/utils/axios";

export default function OrderHistory() {
  const { user, pageLevelLoader, setPageLevelLoader } =
    useContext(GlobalContext);
  const [userBooking, setUserBooking] = useState([]);

  const getAllUserOrders = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `/booking/find/?userId=${user._id}&formType=booking`
      );
      if (res.status === 200) {
        setUserBooking(res.data.data);
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setPageLevelLoader(false);
    }
  };
  useEffect(() => {
    getAllUserOrders();
  }, []);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="history col-12 col-md-9 px-3 my-2">
          <h4 className="mb-3">BOOKING HISTORY</h4>
          <Table headerData={COLUMNS} bodyData={userBooking} />
        </div>
      )}
    </>
  );
}

const COLUMNS = [
  { Header: "PACKAGE", accessor: "packageId.name" },
  {
    Header: "DATE",
    accessor: "dateOfTravel",
    Cell: ({ value }) => {
      return dayjs(value).format("MMM DD, YYYY");
    },
  },
  { Header: "PRICE", accessor: "price" },
];
