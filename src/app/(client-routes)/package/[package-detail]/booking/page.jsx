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
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { countries } from "@/utils";
import { priceCalculator } from "@/utils/functions";
import axios from "@/utils/axios";

export default function Booking() {
  const { pageLevelLoader, setPageLevelLoader, user, bookingData } =
    useContext(GlobalContext);
  const router = useRouter();
  const pathName = usePathname();
  const packageId = pathName.match(/\/package\/([^\/]+)\//)[1];

  const [packageDetail, setPackageDetail] = useState(null);

  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      packageId: "",
      userId: "",
      phoneNumber: "",
      country: "",
      dateOfTravel: dayjs(new Date().toDateString()),
      numberOfPeople: 0,
      price: 0,
      message: "",
      formType: "booking",
      name: "",
      email: "",
      packageName: "",
    },
  });

  const onSubmit = async (data, e) => {
    const isPayNow = e?.target?.id === "payNowBtn";
    setPageLevelLoader(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/add`,
        { ...data, isPayNow }
      );
      if (res.status === 200) {
        toast.success("Package Booked Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorage.removeItem("bookingData");
        setPageLevelLoader(false);
        if (isPayNow) {
          const redirectUrl =
            res.data?.data?.payment?.response?.paymentPage?.paymentPageURL;
          window.location.href = redirectUrl;
        }
      } else {
        toast.error("Failed to book the package! Please Try Again Later...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorage.removeItem("bookingData");
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error("Failed to book the package! Please Try Again Later...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.removeItem("bookingData");
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("bookingData"))) {
      reset({
        ...JSON.parse(localStorage.getItem("bookingData")),
        dateOfTravel: dayjs(
          JSON.parse(localStorage.getItem("bookingData")).dateOfTravel
        ),
      });
    }

    if (JSON.parse(localStorage.getItem("user"))) {
      setValue("userId", JSON.parse(localStorage.getItem("user"))._id);
      setValue("email", JSON.parse(localStorage.getItem("user")).email);
      setValue("name", JSON.parse(localStorage.getItem("user")).name);
      setValue(
        "phoneNumber",
        JSON.parse(localStorage.getItem("user"))?.phoneNumber
      ) || "";
    }

    const getPackageDetail = async () => {
      setPageLevelLoader(true);
      try {
        const res = await axios.get(`/package/slug/${packageId}`);
        if (res.status === 200) {
          setPackageDetail(res.data.data[0]);
          setValue("packageName", res.data.data[0].name);
          setValue("packageId", res.data.data[0]._id);
          setPageLevelLoader(false);
        } else {
          toast.error("Package Not Found", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setPackageDetail({ name: "Package Not Found" });
          setPageLevelLoader(false);
        }
      } catch (e) {
        toast.error("Package Not Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPackageDetail({ name: "Package Not Found" });
        setPageLevelLoader(false);
      }
    };
    getPackageDetail();
  }, []);

  return (
    <div className="container">
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="row">
          <div className="col-8">
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
                  value={watch("name")}
                />
                <TextField
                  required
                  size="small"
                  label="Email"
                  type="text"
                  variant="outlined"
                  disabled
                  value={watch("email")}
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
                    e;
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
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Book and pay later
                </button>
                <button
                  id="payNowBtn"
                  className="btn btn-success"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Book and Pay Now
                </button>
              </form>
            </div>
          </div>
          <div className="col">
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
                <p>Total Price: USD$ {watch("price") || ""}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
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
