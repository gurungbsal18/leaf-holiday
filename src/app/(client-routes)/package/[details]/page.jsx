import PackageDetail from "@/components/PackageDetail";
import axios from "@/utils/axios";
import React from "react";

export async function generateMetadata({ params }) {
  // fetch data
  const res = await axios.get(`/package/slug/${params.details}`);
  const packageDetail = res?.data?.data[0];

  return {
    title: packageDetail?.metaTitle,
    description: packageDetail?.metaDescription,
  };
}

export default async function IndividualPackage({ params }) {
  const res = await axios.get(`/package/slug/${params.details}`);
  const packageDetail = res?.data?.data[0];

  return (
    <>
      {packageDetail ? (
        <PackageDetail packageDetail={packageDetail} />
      ) : (
        <div>Something Went Wrong. Please Try Again...</div>
      )}
    </>
  );
}
