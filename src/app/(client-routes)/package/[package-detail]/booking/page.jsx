"use client";
import { GlobalContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { countries } from "@/utils";
import { priceCalculator } from "@/utils/functions";

export default function Booking() {
  const {
    trackPage,
    isAuthUser,
    bookingFormData,
    setBookingFormData,
    user,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();
  const [countryName, setCountryName] = useState("");
  const packageId = usePathname()
    .replace("/package/", "")
    .replace("/booking", "");
  const [packageDetail, setPackageDetail] = useState(null);

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: bookingFormData || {
      userId: user?._id || JSON.parse(localStorage.getItem("user"))._id,
      name: user?.name || JSON.parse(localStorage.getItem("user")).name,
      email: user?.email || JSON.parse(localStorage.getItem("user")).email,
      phoneNumber:
        user?.phoneNumber ||
        JSON.parse(localStorage.getItem("user")).phoneNumber ||
        "",
      country: "",
      tripDate: dayjs(new Date().toDateString()),
      noOfGuests: 0,
      total: 0,
      message: "",
    },
  });
  const watchAllFields = watch();

  const onSubmit = (data) => {
    console.log("Booking form submitted: ", data);
  };

  useEffect(() => {
    const getPackageDetail = async () => {
      setPageLevelLoader(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/package/${packageId}`
        );
        if (res.status === 200) {
          setPageLevelLoader(false);
          setPackageDetail(res.data.data);
        }
        console.log(res);
      } catch (e) {
        setPageLevelLoader(false);
        toast.error("Package Not Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPackageDetail({ name: "Package Not Found" });
      }
    };
    getPackageDetail();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={pageLevelLoader} />
      ) : (
        <div className="d-flex">
          <div>
            <h1>Booking Form</h1>
            <div>
              <form>
                <TextField
                  required
                  size="small"
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  disabled
                  {...register("name")}
                />
                <TextField
                  required
                  size="small"
                  label="Email"
                  type="text"
                  variant="outlined"
                  disabled
                  {...register("email")}
                />
                <TextField
                  required
                  size="small"
                  label="Phone Number / Whatsapp / Wechat"
                  type="text"
                  variant="outlined"
                  {...register("phoneNumber")}
                />
                <Autocomplete
                  disablePortal
                  options={countries}
                  onChange={(e) => setValue("country", e.target.innerHTML)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Country" />
                  )}
                />
                <TextField
                  required
                  size="small"
                  label="Number of People"
                  type="number"
                  variant="outlined"
                  {...register("noOfGuests", {
                    valueAsNumber: true,
                  })}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="tripDate"
                    control={control}
                    render={({ field }) => (
                      <MobileDatePicker className="w-100" {...field} />
                    )}
                  />
                </LocalizationProvider>
                <div className="d-flex flex-column ">
                  <label>Message</label>
                  <TextareaAutosize {...register("message")} />
                </div>
                <button type="submit" onClick={handleSubmit(onSubmit)}>
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div>
            <h1>Booking Detail</h1>
            <div>
              <p>Package Name: {packageDetail.name}</p>
              {mapHelper.map((item) => (
                <div key={item.id}>
                  {item.id === "tripDate" ? (
                    <p>{`${item.label}: ${
                      dayjs(watchAllFields[item.id]).format("MMM DD, YYYY") ||
                      ""
                    }`}</p>
                  ) : (
                    <p>{`${item.label}: ${watchAllFields[item.id] || ""}`}</p>
                  )}
                </div>
              ))}
              <div>
                <p>
                  Total Price: USD$
                  {priceCalculator(packageDetail?.prices, watch("noOfGuests")) *
                    watch("noOfGuests")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapHelper = [
  {
    id: "name",
    label: "Full Name",
  },
  {
    id: "email",
    label: "Email Address",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "country",
    label: "Country",
  },
  {
    id: "noOfGuests",
    label: "Number of People",
  },

  {
    id: "tripDate",
    label: "Date of Travel",
  },
  {
    id: "message",
    label: "Message",
  },
];
