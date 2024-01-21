"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";

export default function Contents({ contents, apiName }) {
  const {
    callExtractAll,
    setCallExtractAll,
    setUpdateForm,
    setCreateComponentOpen,
  } = useContext(GlobalContext);

  async function handleRemove(id) {
    const res = await axios.delete(
      `http://localhost:5001/${apiName}/delete/${id}`
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
        <div className="d-flex gap-5" key={content.name}>
          <Image
            src={content.imgUrl}
            width={25}
            height={25}
            alt="destination-image"
          />
          <p>{content.name}</p>
          <p>{content.description}</p>
          <div className="d-flex gap-2">
            <button
              onClick={() => {
                setUpdateForm(content);
                setCreateComponentOpen(true);
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
