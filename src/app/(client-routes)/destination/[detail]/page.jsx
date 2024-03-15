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
      <div>
        <Image
          src={destinationData?.imageUrl}
          height={500}
          width={1512}
          alt={`${destinationData?.name}-image`}
        />
        <h4>Explore {destinationData?.name}</h4>
      </div>
      <div>
        <h4>{destinationData?.name}</h4>
        <p>{destinationData?.description}</p>
      </div>
      <div className="d-flex">
        {destinationData?.regions?.map(
          (item, index) =>
            index < 3 && <RegionCard key={item._id} regionDetail={item} />
        )}
      </div>
    </div>
  );
}
