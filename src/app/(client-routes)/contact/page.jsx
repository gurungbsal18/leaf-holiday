import { redirect } from "next/dist/server/api-utils";
import React from "react";

const Contact = () => {
  const style = {
    // background: "red",
  };
  return (
    <div>
      <div className="container d-flex gap-4 my-5">
        <div className="col-8" style={style}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14128.038188747307!2d85.3117133!3d27.7169915!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fd00b70801%3A0x297e28fb9d576b66!2sLeaf%20Holidays%20Treks%20and%20Expedition!5e0!3m2!1sen!2snp!4v1707747198892!5m2!1sen!2snp"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="w-100"
          ></iframe>
        </div>
        <div className="col-4">
          <h4 className="title">Contact us</h4>
          <form action="" className="d-flex gap-3 flex-column">
            <span>
              <label htmlFor="fullname">Full Name</label>
              <input type="text" className="form-control" />
            </span>
            <span>
              <label htmlFor="phonenumber">Phone/WhatsApp Number</label>
              <input type="number" className="form-control" />
            </span>
            <span>
              <label htmlFor="emailaddress">Email Address</label>
              <input type="email" className="form-control" />
            </span>
            <span>
              <label htmlFor="message">Message</label>
              <input type="textarea" className="form-control" />
            </span>
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
