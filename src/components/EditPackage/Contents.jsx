"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import ReviewContent from "./ContentPages/ReviewContent";
import ItineriesContent from "./ContentPages/ItineriesContent";
import FAQContent from "./ContentPages/FAQContent";
import DepartureDateContent from "./ContentPages/DepartureDateContent";

export default function Contents({ contents, apiName, updateComponent }) {
  const {
    callExtractAll,
    setCallExtractAll,
    setUpdateForm,
    setDialogOpen,
    setDialogContent,
  } = useContext(GlobalContext);

  async function handleRemove(id) {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/delete/${id}`
    );
    if (res.status === 200) {
      setCallExtractAll(!callExtractAll);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div>
      {contents?.map((content) => (
        <div className="d-flex gap-5" key={content._id}>
          {apiName === "itineraries" && <ItineriesContent content={content} />}
          {apiName === "faq" && <FAQContent content={content} />}
          {apiName === "departureDate" && (
            <DepartureDateContent content={content} />
          )}
          {apiName === "review" && <ReviewContent content={content} />}
          {/* {apiName === "package" && <PackageContent content={content} />} */}
          <div>
            <button
              onClick={() => {
                setUpdateForm(content);
                setDialogOpen(true);
                setDialogContent(updateComponent);
              }}>
              Edit
            </button>
            <button onClick={() => handleRemove(content._id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
