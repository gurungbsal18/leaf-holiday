import axios from "@/utils/axios";
import React from "react";
import Image from "next/image";
import PackageCard from "@/components/PackageCard";

export default async function ActivityDetail({ params }) {
  let activityData;
  try {
    const res = await axios.get(`/activity/slug/${params.slug}`);
    activityData = res.data.data[0];
  } catch (e) {
    console.log(e);
  }
  return (
    <>
      <div className="common-banner">
        <Image
          src={activityData?.imageUrl}
          height={500}
          width={1512}
          alt={`${activityData?.name}-image`}
        />
      </div>
      <div className="container my-5">
        <div>
          <h4>Explore {activityData?.name}</h4>
          <p>{activityData?.description}</p>
        </div>
        <div className="row">
          {activityData?.packages?.map(
            (item, index) =>
              index < 3 && <PackageCard key={item._id} packageDetail={item} />
          )}
        </div>
      </div>
    </>
  );
}
