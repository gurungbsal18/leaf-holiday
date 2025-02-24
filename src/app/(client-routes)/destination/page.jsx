import React from "react";
import Image from "next/image";
import axios from "@/utils/axios";
import Link from "next/link";
import { toast } from "react-toastify";
import Card from "@/components/Card";

export default async function DestinationPage() {
  let allDestinations;
  try {
    const res = await axios.get(`/destination/`);
    res;
    if (res.status === 200) {
      allDestinations = res.data?.data;
    }
  } catch (e) {
    toast.error(
      e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  }

  return (
    <div>
      <div className="header-image">
        <Image
          src="/images/km.png"
          height={500}
          width={1510}
          alt="destination-image"
        />
      </div>
      <div className="container my-5">
        <h4 className="title fw-bold">Destinations</h4>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
          sapiente ipsam commodi nam suscipit iure libero rem veniam minima quia
          quibusdam eum repellendus expedita voluptatum, provident eos, aliquam,
          minus quaerat aut est! Quos quia quis modi quaerat ex tempore error
          commodi neque dolorem at temporibus iusto soluta reprehenderit
          repudiandae, placeat voluptates earum, assumenda eaque consequuntur
          iste saepe! Nisi, officia perspiciatis!
        </p>
        {allDestinations && (
          <div className="row">
            {allDestinations.map((item) => (
              <Card key={item._id} api="destination" detail={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
