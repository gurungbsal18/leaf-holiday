import React, { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import CustomAutocomplete from "@/components/ui/CustomAutocomplete";
import { toast } from "react-toastify";
import axios from "@/utils/axios";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function CreateTestimonial() {
  const {
    verify,
    setVerify,
    pageLevelLoader,
    setPageLevelLoader,
    setDialogOpen,
    updateForm,
    setUpdateForm,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
  } = useContext(GlobalContext);

  const [allPackages, setAllPackages] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  // (user);
  const initialFormData = {
    packageId: updatePackage?._id || {},
    userID: user?._id || "",
    userName: user?.role === "admin" ? "" : user?.name,
    stars: 1,
    comment: "",
    date: dayjs(new Date()),
    // source: "",
    isSelected: false,
    isVerified: user?.role === "admin" ? true : false,
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialFormData,
  });
  const { register, handleSubmit, control, setValue, reset } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "review", updateForm, false, verify);

    setCallExtractAll(!callExtractAll);
    setVerify(false);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  const getAllPackages = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/package/`);
      if (res.status === 200) {
        if (!updateForm && !updatePackage) {
          reset({ ...initialFormData, packageId: res.data.data[0]._id });
        }
        setAllPackages(res.data.data);
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="p-3">
          <div className="d-flex justify-content-between border-bottom align-items-center pb-2 mb-3">
            <p className="m-0">
              {updateForm
                ? verify
                  ? "Verify Review"
                  : "Update Review"
                : "Create Review"}
            </p>
            <GrClose
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDialogOpen(false);
                setUpdateForm(null);
                setVerify(false);
              }}
            />
          </div>
          <form>
            <div className="d-flex flex-column gap-2">
              {user?.role === "admin" && (
                <div className="d-flex gap-3 flex-column">
                  <TextField
                    required
                    fullWidth
                    size="small"
                    label="Full Name"
                    type="text"
                    variant="outlined"
                    disabled={verify}
                    {...register("userName")}
                  />
                  {/* <TextField
                    required
                    fullWidth
                    size="small"
                    label="Source"
                    type="text"
                    variant="outlined"
                    {...register("source")}
                  /> */}
                  <CustomAutocomplete
                    label="Select Package"
                    options={allPackages}
                    setValue={setValue}
                    formName={"packageId"}
                    fieldName={updateForm?.packageId}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <MobileDatePicker className="w-100" {...field} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              )}
              <label name="comment">Comment</label>
              <TextareaAutosize
                minRows={4}
                className="w-100 form-control"
                size="large"
                label="Comment"
                type="text"
                variant="outlined"
                disabled={verify}
                {...register("comment")}
              />
              <label name="rating">Rating</label>
              <Controller
                control={control}
                name={"stars"}
                // defaultValue={-1}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    className="rating-star"
                    name={"stars"}
                    onChange={onChange}
                    value={Number(value)}
                    readOnly={verify}
                  />
                )}
              />
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="btn btn-sm btn-success"
              >
                {updateForm ? (verify ? "Verify" : "Update") : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
