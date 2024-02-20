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
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { countries } from "@/utils";
import { priceCalculator } from "@/utils/functions";
import axios from "@/utils/axios";

export default function CustomizeTrip() {
  const { isAuthUser, setPageLevelLoader, pageLevelLoader } =
    useContext(GlobalContext);
  const router = useRouter();
  const pathName = usePathname();
  const packageId = pathName.match(/\/package\/([^\/]+)\//)[1];
  packageId;

  const [packageDetail, setPackageDetail] = useState(null);
  const [user, setUser] = useState(null);

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      formType: "customization",
      phoneNumber: user?.phoneNumber || "",
      country: "",
      dateOfTravel: dayjs(new Date().toDateString()),
      numberOfPeople: 0,
      price: 0,
      message: "",
    },
  });

  const onSubmit = async (data) => {
    data;
    setPageLevelLoader(true);
    if (isAuthUser) {
      try {
        const res = await axios.post(`/booking/add`, data);
        if (res.status === 200) {
          toast.success("Package Customization Requested Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.removeItem("bookingData");
          setPageLevelLoader(false);
        } else {
          toast.error(
            "Failed to request the customize the package! Please Try Again Later...",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          setPageLevelLoader(false);
        }
      } catch (e) {
        toast.error(
          "Failed to request the customize the package! Please Try Again Later...",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        setPageLevelLoader(false);
      }
    } else {
      toast.error("Please Log In To Continue", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(true);
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
        const res = await axios.get(`/package/slug/${packageId}`);
        res;
        if (res.status === 200) {
          setValue("packageId", res.data.data[0]._id);
          setValue("packageName", res.data.data[0].name);
          setPackageDetail(res.data.data[0]);
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
        <div className="py-100">
          <h4 className="title">Customize Trip</h4>
          <h4 className="title mb-4">{packageDetail?.name}</h4>
          <div>
            <form className="d-flex flex-column gap-4">
              <div className="d-flex gap-3">
                <TextField
                  fullWidth
                  disabled
                  required
                  size="small"
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  defaultValue={user?.name || ""}
                />
                <TextField
                  fullWidth
                  disabled
                  required
                  size="small"
                  label="Email"
                  type="text"
                  variant="outlined"
                  defaultValue={user?.email || ""}
                />
              </div>
              <div className="d-flex gap-3">
                <TextField
                  fullWidth
                  required
                  size="small"
                  label="Phone Number / Whatsapp / Wechat"
                  type="text"
                  variant="outlined"
                  {...register("phoneNumber")}
                />
                <TextField
                  fullWidth
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
              </div>
              <Autocomplete
                disablePortal
                options={countries}
                onChange={(e) => setValue("country", e.target.innerHTML)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Country" />
                )}
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
                <TextareaAutosize
                  {...register("message")}
                  minRows={5}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-success"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
