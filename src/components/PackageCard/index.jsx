"use client";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { averageReview } from "@/utils/functions";
import { useRouter } from "next/navigation";

function PackageCard({ packageDetail }) {
  const router = useRouter();
  return (
    <div
      className="trip-card border col-3"
      onClick={() => router.push(`/package/${packageDetail?._id}`)}>
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
            {`${packageDetail?.region?.name}, ${packageDetail?.region?.destination?.name}`}
          </span>
          <span className="trip-card-review d-flex align-items-center gap-2 text-muted">
            <Rating
              value={averageReview(packageDetail?.reviews)}
              precision={0.5}
              readOnly
            />
            {packageDetail?.reviews?.length} Reviews
          </span>
        </div>
        <h4 className="trip-card-title">{packageDetail?.name}</h4>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted trip-card-duration d-flex align-items-center gap-1">
            <ScheduleOutlinedIcon fontSize="14" />
            {packageDetail?.tripFacts?.duration?.info} Days
          </span>
          <p className="m-0">
            USD {packageDetail?.prices[0]?.price || 0}/
            <span className="text-muted" style={{ fontSize: "12px" }}>
              per person
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;
