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
import { priceCalculator } from "@/utils/functions";

export default function Inquiry() {
  const { isAuthUser, setPageLevelLoader, pageLevelLoader } =
    useContext(GlobalContext);
  const router = useRouter();
  const pathName = usePathname();
  const packageId = pathName.match(/\/package\/([^\/]+)\//)[1];
  console.log(packageId);

  const [packageDetail, setPackageDetail] = useState(null);
  const [user, setUser] = useState(null);

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      formType: "inquiry",
      phoneNumber: user?.phoneNumber || "",
      country: "",
      dateOfTravel: dayjs(new Date().toDateString()),
      numberOfPeople: 0,
      price: 0,
      message: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    setPageLevelLoader(true);
    if (isAuthUser) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/add`,
          data
        );
        if (res.status === 200) {
          toast.success("Package Inquiry Requested Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.removeItem("bookingData");
          setPageLevelLoader(false);
        } else {
          toast.error(
            "Failed to request the inquiry of the package! Please Try Again Later...",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        }
      } catch (e) {
        setPageLevelLoader(false);
        toast.error(
          "Failed to request the inquiry of the package! Please Try Again Later...",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    } else {
      toast.error("Please Log In To Continue", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    if (JSON.parse(localStorage.getItem("user"))) {
      setValue("userId", JSON.parse(localStorage.getItem("user"))._id);
      setValue("email", JSON.parse(localStorage.getItem("user")).email);
      setValue("name", JSON.parse(localStorage.getItem("user")).name);
    }
    const getPackageDetail = async () => {
      setPageLevelLoader(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/package/slug/${packageId}`
        );
        console.log(res);
        if (res.status === 200) {
          setValue("packageId", res.data.data[0]._id);
          setValue("packageName", res.data.data[0].name);
          setPackageDetail(res.data.data[0]);
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
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={true} />
      ) : (
        <div>
          <h1>Inquiry</h1>
          <h1>{packageDetail?.name}</h1>
          <div>
            <form>
              <TextField
                disabled
                required
                size="small"
                label="Full Name"
                type="text"
                variant="outlined"
                defaultValue={user?.name || ""}
              />
              <TextField
                disabled
                required
                size="small"
                label="Email"
                type="text"
                variant="outlined"
                defaultValue={user?.email || ""}
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
                onChange={(e) => {
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
      )}
    </>
  );
}
