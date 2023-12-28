import React from "react";
import Button from "react-bootstrap/Button";
import ClientNavbar from "../components/ClientNavbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <ClientNavbar />
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex flex-column justify-content-center text-danger">
          <h1>Error 404</h1>
          <p>Page not found</p>
        </div>
        <div>
          <Image
            src="/images/404Error.jpg"
            width={600}
            height={500}
            alt="error-page"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
