"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function BlogDetail() {
  const [blogDetail, setBlogDetail] = useState(null);
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const blogName = usePathname().match(/\/blog\/([^\/]+)(?:\/|$)/)[1];

  const getBlogDetail = async () => {
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/slug/${blogName}`
      );
      if (res.status === 200) {
        const blogData = res.data?.data;

        if (blogData.length > 0) {
          setBlogDetail(blogData[0]);
        }
        setPageLevelLoader(false);
      } else {
        setPageLevelLoader(false);
      }
    } catch (e) {
      console.log(e);
      setPageLevelLoader(false);
    }
  };
  console.log(blogDetail);
  useEffect(() => {
    getBlogDetail();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={true} />
      ) : (
        <>
          {blogDetail && (
            <div>
              <div>
                <Image
                  src={blogDetail?.imageUrl}
                  height={500}
                  width={1512}
                  alt={`${blogDetail?.name}-image`}
                />
                <h4>{blogDetail?.title}</h4>
              </div>
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: blogDetail?.content }}
                ></div>
                <div>
                  <p>Author: {blogDetail?.authorId?.name}</p>
                  <div>
                    <p>Share this {blogDetail?.options}:</p>
                    <Link href="">
                      <FacebookIcon />
                    </Link>
                    <Link href="">
                      <InstagramIcon />
                    </Link>
                    <Link href="">
                      <WhatsAppIcon />
                    </Link>
                    <Link href="">
                      <TwitterIcon />
                    </Link>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          )}
        </>
      )}
    </>
  );
}
