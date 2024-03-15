"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegionCard({ regionDetail }) {
  return (
    <Link href={`/region/${regionDetail.slug}`}>
      <div>
        <Image
          src={regionDetail?.imgUrl}
          width={300}
          height={300}
          alt={`${regionDetail?.name}-image`}
        />

        <h4>{regionDetail?.name}</h4>
      </div>
    </Link>
  );
}
