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
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  const bookingData = {
    ...JSON.parse(localStorage.getItem("bookingData")),
    dateOfTravel: dayjs(
      JSON.parse(localStorage.getItem("bookingData"))?.dateOfTravel
    ),
  };
  const packageId = usePathname()
    .replace("/package/", "")
    .replace("/booking", "");
  const [packageDetail, setPackageDetail] = useState(null);

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: bookingData || {
      packageId: "",
      userId: user?._id,
      phoneNumber: user?.phoneNumber || "",
      country: "",
      dateOfTravel: dayjs(new Date().toDateString()),
      numberOfPeople: 0,
      price: 0,
      message: "",
      formType: "booking",
    },
  });

  const onSubmit = async (data) => {
    setPageLevelLoader(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/add`,
        data
      );
      if (res.status === 200) {
        toast.success("Package Booked Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorage.removeItem("bookingData");
        setPageLevelLoader(false);
      } else {
        toast.error("Failed to book the package! Please Try Again Later...", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (e) {
      toast.error(e.response.statusText, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
    }
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
          setValue("packageId", res.data.data._id);
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
                  value={user?.name}
                />
                <TextField
                  required
                  size="small"
                  label="Email"
                  type="text"
                  variant="outlined"
                  disabled
                  value={user?.email}
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
                  defaultValue={bookingData?.numberOfPeople || 0}
                  onChange={(e) => {
                    console.log(e);
                    setValue("numberOfPeople", Number(e.target.value));
                    setValue(
                      "price",
                      priceCalculator(
                        packageDetail?.prices,
                        Number(e.target.value)
                      ) * Number(e.target.value)
                    );
                  }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="dateOfTravel"
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
              <p>Package Name: {packageDetail?.name}</p>
              {mapHelper.map((item) => (
                <div key={item.id}>
                  {item.id === "dateOfTravel" ? (
                    <p>{`${item.label}: ${
                      dayjs(watch(item.id)).format("MMM DD, YYYY") || ""
                    }`}</p>
                  ) : (
                    <p>{`${item.label}: ${watch(item.id) || ""}`}</p>
                  )}
                </div>
              ))}
              <div>
                <p>Total Price: USD$ ${watch("price") || ""}</p>
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
    id: "numberOfPeople",
    label: "Number of People",
  },

  {
    id: "dateOfTravel",
    label: "Date of Travel",
  },
  {
    id: "message",
    label: "Message",
  },
];
