import axios from "@/utils/axios";
import React from "react";
import Image from "next/image";
import PackageCard from "@/components/PackageCard";

export default async function RegionDetail({ params }) {
  let regionData;
  try {
    const res = await axios.get(`/region/slug/${params.detail}`);
    regionData = res.data.data[0];
  } catch (e) {
    console.log(e);
  }
  return (
    <div>
      <div>
        <Image
          src={regionData?.imageUrl}
          height={500}
          width={1512}
          alt={`${regionData?.name}-image`}
        />
        <h4>Explore {regionData?.name}</h4>
      </div>
      <div className="container">
        <div>
          <h4>{regionData?.name}</h4>
          <p>{regionData?.description}</p>
        </div>
        <div className="row">
          {regionData?.packages?.map(
            (item, index) =>
              index < 3 && <PackageCard key={item._id} packageDetail={item} />
          )}
        </div>
      </div>
    </div>
  );
}
