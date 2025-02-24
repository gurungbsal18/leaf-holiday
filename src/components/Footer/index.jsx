"use client";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "@/utils/axios";
import Link from "next/link";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  const [leafData, setLeafData] = useState(null);
  const getLeafData = async () => {
    try {
      const res = await axios.get(`/setting/`);
      if (res.status === 200) {
        setLeafData(res.data.data[0]);
      }
    } catch (e) {
      setLeafData({});
    }
  };
  useEffect(() => {
    getLeafData();
  }, []);

  return (
    <div className="footer bg-success p-5 pb-2 text-white">
      <div className="footer-content d-flex justify-content-between flex-column flex-md-row align-items-center align-items-start">
        <div className="d-flex flex-column footer-content-contact align-items-center align-items-md-start">
          <h4>Contact Us</h4>
          <a href="tel:+9771234567890">
            <WhatsAppIcon />
            {leafData?.phoneNumber}
          </a>
          <a href="mailto:info@thenepaltrekking.com">
            <EmailIcon />
            {leafData?.email}
          </a>
          <a>
            <LocationOnIcon />
            {leafData?.location}
          </a>
        </div>
        <div className="d-flex flex-column">
          <h4>Useful Links</h4>
          <a href="https://www.leaf-holidays.com/destination/nepal">
            Trekking In Nepal
          </a>
          <a href="https://www.leaf-holidays.com/blog" target="_blank">
            Travel Blogs
          </a>
          <a
            href="https://www.leaf-holidays.com/travel-info/best-kailash-season-in-tibet"
            target="_blank"
          >
            Best Season
          </a>
          <a href="https://www.leaf-holidays.com/activity" target="_blank">
            Activities
          </a>
        </div>
        <div className="d-flex flex-column">
          <h4>Get To Know Us</h4>
          <a href="https://www.leaf-holidays.com/aboutus" target="_blank">
            About Us
          </a>
          <a href="https://www.leaf-holidays.com/ourTeam" target="_blank">
            Meet Our Team
          </a>
          <a href="https://www.leaf-holidays.com/aboutus" target="_blank">
            Why Choose Us?
          </a>
          <a href="https://www.leaf-holidays.com/contact" target="_blank">
            Contact Us
          </a>
        </div>
        <div className="d-flex flex-column">
          <h4>Legal Info</h4>
          <a
            href="https://www.leaf-holidays.com/travel-info/travel-insurance"
            target="_blank"
          >
            Travel Insurance
          </a>
          <a
            href="https://www.leaf-holidays.com/travel-info/travel-insurance"
            target="_blank"
          >
            Nepal Visa Information
          </a>
          {/* <a href="">Cancellation Policy</a>
          <a href="">Covid Protocol</a> */}
        </div>
      </div>
      <div className="footer-association d-flex flex-column justify-content-center align-items-center mt-5">
        <h4>Associated With</h4>
        <div className="d-flex bg-white p-2 rounded-5 gap-3 ">
          <Image src="/images/akton.png" width={25} height={25} alt="akton" />
          <Image src="/images/ntb.png" width={25} height={25} alt="ntb" />
          <Image src="/images/nma.png" width={25} height={25} alt="nma" />
          <Image src="/images/taan.png" width={25} height={25} alt="taan" />
          <Image
            src="/images/ng.png"
            width={25}
            height={25}
            alt="nepal government"
          />
        </div>
      </div>
      <div className="row justify-content-between mt-5">
        <p className="m-0 fs-12 col-3">© Leaf Holiday {year}.</p>
        <div className="footer-social d-flex gap-2 col-3 justify-content-end">
          <a
            href={leafData?.facebook || "#"}
            target="_blank"
            className="text-white"
          >
            <FacebookIcon />
          </a>
          <a
            href={leafData?.instagram || "#"}
            target="_blank"
            className="text-white"
          >
            <InstagramIcon />
          </a>
          <a
            href={leafData?.linkedin || "#"}
            target="_blank"
            className="text-white"
          >
            <LinkedInIcon />
          </a>
          <a
            href={leafData?.twitter || "#"}
            target="_blank"
            className="text-white"
          >
            <TwitterIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
