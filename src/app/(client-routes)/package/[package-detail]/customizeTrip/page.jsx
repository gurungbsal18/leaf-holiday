"use client";
import { GlobalContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
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

export default function Inquiry() {
  const { trackPage, isAuthUser, bookingFormData, setBookingFormData, user } =
    useContext(GlobalContext);
  const router = useRouter();
  const packageId = usePathname()
    .replace("/package/", "")
    .replace("/customizeTrip", "");
  const [packageName, setPackageName] = useState(null);

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      userId: user?._id || "",
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      country: "",
      tripDate: dayjs(new Date().toDateString()),
      noOfGuests: 0,
      message: "",
    },
  });
  console.log(user);

  const onSubmit = (data) => {
    isAuthUser
      ? console.log("Inquiry form submitted: ", data)
      : toast.error("Please Log In To Continue", {
          position: toast.POSITION.TOP_RIGHT,
        });
  };

  useEffect(() => {
    const getPackageDetail = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/package/${packageId}`
        );
        if (res.status === 200) {
          setPackageName(res.data.data.name);
        }
        console.log(res);
      } catch (e) {
        toast.error("Package Not Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPackageName("Package Not Found");
      }
    };
    getPackageDetail();
  }, []);

  return (
    <>
      {packageName ? (
        <div>
          <h1>Customize Trip</h1>
          <h1>{packageName}</h1>
          <div>
            <form>
              <TextField
                required
                size="small"
                label="Full Name"
                type="text"
                variant="outlined"
                {...register("name")}
              />
              <TextField
                required
                size="small"
                label="Email"
                type="text"
                variant="outlined"
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
                label="Number of Traveller"
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
      ) : (
        <PageLevelLoader loading={true} />
      )}
    </>
  );
}
