"use client";
import React from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { submitForm } from "@/utils/functions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Contact = () => {
  const style = {
    // background: "red",
  };

  const contactSchema = z.object({
    name: z.string().min(3, { message: "Full Name is required" }),
    phone: z.string().min(3, { message: "Phone Number is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    message: z.string().min(3, { message: "Message is required" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(contactSchema),
  });
  const onSubmit = async (data) => {
    const res = await submitForm(data, "contact");
    reset();
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex flex-column-reverse flex-md-row gap-4 my-5">
          <div className="col-12 col-md-6 col-lg-8" style={style}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14128.038188747307!2d85.3117133!3d27.7169915!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fd00b70801%3A0x297e28fb9d576b66!2sLeaf%20Holidays%20Treks%20and%20Expedition!5e0!3m2!1sen!2snp!4v1707747198892!5m2!1sen!2snp"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-100"
            ></iframe>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <h4 className="title">Contact us</h4>
            <form className="d-flex gap-3 flex-column">
              <span>
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="text-danger">{errors?.name?.message}</p>
                )}
              </span>
              <span>
                <label htmlFor="phonenumber">Phone/WhatsApp</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("phone")}
                />
                {errors?.phone && (
                  <p className="text-danger">{errors?.phone?.message}</p>
                )}
              </span>
              <span>
                <label htmlFor="emailaddress">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-danger">{errors?.email?.message}</p>
                )}
              </span>
              <span>
                <label htmlFor="message">Message</label>
                <input
                  type="textarea"
                  className="form-control"
                  {...register("message")}
                />
                {errors?.message && (
                  <p className="text-danger">{errors?.message?.message}</p>
                )}
              </span>
              <button
                className="btn btn-success"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="contact-banner py-100 bg-light">
        <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between text-center">
          <div className="col-12 col-md-3">
            <PinDropIcon className="text-success" />
            <p className="m-0">Address</p>
            <p className="m-0">Thamel, Kathmand, Nepal</p>
          </div>
          <div className="col-12 col-md-3">
            <PermPhoneMsgIcon className="text-success" />
            <p className="m-0">Phone</p>
            <p className="m-0">+977 9851035239</p>
          </div>
          <div className="col-12 col-md-3">
            <EmailIcon className="text-success" />
            <p className="m-0">Email</p>
            <p className="m-0">Info@thenepaltrekking.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
