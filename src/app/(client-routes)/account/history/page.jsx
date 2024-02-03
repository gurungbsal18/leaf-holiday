"use client";
import React, { useEffect } from "react";
import axios from "axios";

export default function OrderHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const getAllUserOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/find/?userId=${user._id}&formType=booking`
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllUserOrders();
  });
  return (
    <div>
      <h1>BOOKING HISTORY</h1>
      <div>
        <div className="d-flex">
          <p>PACKAGE</p>
          <p>DATE</p>
          <p>PRICE</p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
