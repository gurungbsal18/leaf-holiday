"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

export default function Card({ api, detail }) {
  return (
    <Link
      href={`/${api}/${detail.slug}`}
      className="col-12 col-md-4 mb-4 destination-card"
    >
      <div className="border">
        <Image
          src={detail?.imgUrl || detail?.imageUrl}
          width={300}
          height={300}
          alt={`${detail.name}`}
        />

        <p className="title fw-bold text-dark p-2 m-0 d-flex align-items-center gap-1">
          <FmdGoodOutlinedIcon className="text-muted" />
          {detail?.name}
        </p>
      </div>
    </Link>
  );
}
