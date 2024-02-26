import PackageCard from "@/components/PackageCard";
import axios from "@/utils/axios";
import React from "react";

export default async function SearchPage(context) {
  const searchTerm = context.searchParams.searchTerm;
  let res = { data: [] };
  try {
    res = await axios.get(`/package/search/${searchTerm}`);
  } catch (e) {
    console.log(e);
  }
  return (
    <>
      {res?.data?.length > 0 ? (
        <div className="d-flex">
          {res.data.map((item) => (
            <PackageCard key={item._id} packageDetail={item} />
          ))}
        </div>
      ) : (
        <h4>No Package Found</h4>
      )}
    </>
  );
}
