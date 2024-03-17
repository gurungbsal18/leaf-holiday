import axios from "@/utils/axios";
import React from "react";
import Image from "next/image";
import RegionCard from "@/components/RegionCard";

export default async function RegionDetail({ params }) {
  let destinationData;
  try {
    const res = await axios.get(`/destination/slug/${params.detail}`);
    destinationData = res.data.data[0];
  } catch (e) {
    console.log(e);
  }
  return (
    <div>
      <div className="header-image">
        <Image
          src={destinationData?.imageUrl}
          height={500}
          width={1512}
          alt={`${destinationData?.name}-image`}
        />
      </div>
      <div className="container my-5">
        <div>
          <h4 className="title fw-bold">{destinationData?.name}</h4>
          <p>{destinationData?.description}</p>
        </div>
        <div className="d-flex">
          {destinationData?.regions?.map(
            (item, index) =>
              index < 3 && <RegionCard key={item._id} regionDetail={item} />
          )}
        </div>
      </div>
    </div>
  );
}
