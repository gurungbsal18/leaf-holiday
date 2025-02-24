"use client";
import PackageCard from "@/components/PackageCard";
import "../scss/_home.scss";
import "material-icons/iconfont/material-icons.css";
import { useContext, useEffect, useState } from "react";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreDestination from "@/components/ExploreDestination";
import BlogCard from "@/components/BlogCard";
import ReviewCarousel from "@/components/ReviewCarousel";
import { getEmbeddedYouTubeUrl } from "@/utils/functions";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import SmallPackageCard from "@/components/SmallPackageCard";
import HomeCarousel from "@/components/ui/HomeCarousel";

export default function Home() {
  const { callExtractAll, setPageLevelLoader, pageLevelLoader } =
    useContext(GlobalContext);
  const [homePageData, setHomePageData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const getHomePageDetail = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/homepage/`);
      if (res.status === 200) {
        setPageLevelLoader(false);
        setHomePageData(res.data);
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

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      // Prevent the default form submission behavior
      event.preventDefault();
      setPageLevelLoader(true);
      // Navigate to search page with the search query
      router.push(`/search?searchTerm=${searchTerm}`);
    }
  };

  useEffect(() => {
    if (pageLevelLoader) {
      if (!homePageData) {
        getHomePageDetail();
      } else {
        setPageLevelLoader(false);
      }
    }
  }, [callExtractAll, pageLevelLoader]);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div>
          <>
            <div className="hero-section">
              <div className="d-flex justify-content-center align-items-center">
                {homePageData?.carousels &&
                  homePageData?.carousels?.length > 0 && (
                    <HomeCarousel carouselData={homePageData.carousels} />
                  )}
              </div>
            </div>
            <div className="hero-search-bar d-flex jusitify-content-center mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Search your next adventure"
                onKeyDown={handleEnter}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="search-btn btn btn-sm btn-success"
                onClick={() => {
                  setPageLevelLoader(true);
                  router.push(`/search?searchTerm=${searchTerm}`);
                }}
              >
                <SearchOutlinedIcon />
                Search
              </button>
            </div>

            {homePageData?.tabs?.top?.length > 0 && (
              <div className="py-100">
                <div className="container">
                  <div className="text-center my-5">
                    <h4 className="home-title">
                      {homePageData?.tabs?.top[0]?.title}
                    </h4>
                  </div>
                  <div className="row">
                    {homePageData?.tabs?.top[0]?.packages?.map((item) => (
                      <PackageCard key={item._id} packageDetail={item} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {homePageData?.tabs?.middle?.length > 0 && (
              <ExploreDestination middleTabData={homePageData?.tabs?.middle} />
            )}

            {homePageData?.tabs?.bottom?.length > 0 && (
              <div className="py-100">
                <div className="container">
                  <div className="text-center my-5">
                    <h2 className="home-title">
                      {homePageData?.tabs?.bottom[0]?.title}
                    </h2>
                  </div>

                  <div className="home-video-section row d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-6 py-2">
                      {homePageData?.tabs?.bottom[0]?.videoUrl && (
                        <iframe
                          width="560"
                          height="315"
                          src={getEmbeddedYouTubeUrl(
                            homePageData?.tabs?.bottom[0]?.videoUrl
                          )}
                          title="YouTube video player"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        {homePageData?.tabs?.bottom[0]?.packages?.map(
                          (item) => (
                            <SmallPackageCard
                              key={item._id}
                              packageDetail={item}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {homePageData?.blogs?.length > 0 && (
              <div className="container blog-section py-100">
                <div className="text-center">
                  <h2 className="home-title">Blogs and News</h2>
                </div>
                <div className="container">
                  <div className="blog-card">
                    {homePageData?.blogs?.map((item) => (
                      <BlogCard key={item._id} blogDetail={item} />
                    ))}
                  </div>
                </div>

                {/* <div className="d-flex justify-content-center">
                  <button className="btn btn-success">View all</button>
                </div> */}
              </div>
            )}

            <div className="container reccommended-section py-100">
              <div className="text-center my-5">
                <h2 className="home-title">Recommended on</h2>
              </div>

              <div className="d-flex justify-content-center">
                <Image
                  src="/images/TestImages/tripadvisor.png"
                  width={170}
                  height={200}
                  alt="recommended-at-image"
                />
              </div>
            </div>

            {homePageData?.reviews?.length > 0 && (
              <div className="bg-light py-100">
                <div className="container">
                  <h2 className="home-title text-center">
                    Review from our guests
                  </h2>
                </div>
                <ReviewCarousel reviews={homePageData?.reviews} />
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
}
