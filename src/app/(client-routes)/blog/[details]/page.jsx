"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import axios from "@/utils/axios";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function BlogDetail() {
  const [blogDetail, setBlogDetail] = useState(null);
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const blogName = usePathname().match(/\/blog\/([^\/]+)(?:\/|$)/)[1];
  const [blogUrl, setBlogUrl] = useState(process.env.NEXT_PUBLIC_WEBSITE_URL);

  const getBlogDetail = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios(`/blog/slug/${blogName}`);
      if (res.status === 200) {
        const blogData = res.data?.data;

        if (blogData.length > 0) {
          setBlogDetail(blogData[0]);
        }
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    setBlogUrl(window.location.href);
    getBlogDetail();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
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
                  dangerouslySetInnerHTML={{
                    __html: blogDetail?.content,
                  }}></div>
                <div>
                  <p>Author: {blogDetail?.authorId?.name}</p>
                  <div>
                    <p>Share this {blogDetail?.options}:</p>
                    <FacebookShareButton url={blogUrl}>
                      <FacebookIcon />
                    </FacebookShareButton>
                    <WhatsappShareButton url={blogUrl}>
                      <WhatsAppIcon />
                    </WhatsappShareButton>
                    <TwitterShareButton url={blogUrl}>
                      <TwitterIcon />
                    </TwitterShareButton>
                    <EmailShareButton url={blogUrl}>
                      <EmailIcon />
                    </EmailShareButton>
                    <LinkedinShareButton url={blogUrl}>
                      <LinkedInIcon />
                    </LinkedinShareButton>
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
