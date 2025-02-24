"use client";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { averageReview } from "@/utils/functions";
import { useContext } from "react";
import { GlobalContext } from "@/context";
import Link from "next/link";
import Badge from "../ui/Badge";

function PackageCard({ packageDetail }) {
  const { setPageLevelLoader } = useContext(GlobalContext);

  const showBadge =
    packageDetail.isFeatured ||
    packageDetail.isGroupTour ||
    packageDetail.isTopSelling ||
    packageDetail.isTrending;

  return (
    <Link
      href={`/package/${packageDetail?.slug}`}
      className="position-relative col-12 col-md-4 py-3"
      onClick={() => {
        setPageLevelLoader(true);
        // router.push(`/package/${packageDetail?.slug}`);
      }}
    >
      <div className="trip-card border">
        <Image
          src={packageDetail?.mainImageUrl}
          height={200}
          width={350}
          alt="package-image"
        />
        <div className="trip-card-body p-3 d-flex flex-column gap-3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted trip-card-location d-flex align-items-center gap-1">
              <FmdGoodOutlinedIcon />
              <p className="package-card-region-name m-0">{`${packageDetail?.region?.name}, ${packageDetail?.region?.destination?.name}`}</p>
            </span>
            <span className="trip-card-review d-flex align-items-center gap-2 text-muted">
              <Rating
                value={averageReview(packageDetail?.reviews)}
                precision={0.5}
                readOnly
              />
              <p className="package-card-review-title m-0">
                {packageDetail?.reviews?.length || 0} Reviews
              </p>
            </span>
          </div>
          <h4 className="trip-card-title text-dark">{packageDetail?.name}</h4>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted trip-card-duration d-flex align-items-center gap-1">
              <ScheduleOutlinedIcon fontSize="14" />
              {packageDetail?.tripFacts?.duration?.info} Days
            </span>
            <p className="m-0 fw-semibold text-dark">
              USD {packageDetail?.prices[0]?.price || 0}/
              <span className="text-muted" style={{ fontSize: "12px" }}>
                per person
              </span>
            </p>
          </div>
        </div>
      </div>
      {showBadge && (
        <div className="badge-container w-100 d-flex justify-content-between">
          {packageDetail.isFeatured && <Badge name="featured" />}
          {packageDetail.isGroupTour && <Badge name="groupTour" />}
          {packageDetail.isTrending && <Badge name="trending" />}
          {packageDetail.isTopSelling && <Badge name="topSelling" />}
        </div>
      )}
    </Link>
  );
}

export default PackageCard;
