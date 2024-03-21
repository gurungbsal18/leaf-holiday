"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Card({ api, detail }) {
  return (
    <Link
      href={`/${api}/${detail.slug}`}
      className="col-12 col-md-4 mb-4 destination-card">
      <div>
        <Image
          src={detail?.imgUrl || detail?.imageUrl}
          width={300}
          height={300}
          alt={`${detail.name}`}
        />

        <h4>{detail?.name}</h4>
      </div>
    </Link>
  );
}
