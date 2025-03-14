"use client";
import React, { useContext, useRef } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { submitForm } from "@/utils/functions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function CreateDepartureDate() {
  const {
    updateForm,
    setUpdateForm,
    setDialogOpen,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
  } = useContext(GlobalContext);

  const currentDate = new Date().toDateString();

  const initialData = {
    packageId: updatePackage._id,
    startDate: dayjs(currentDate),
    endDate: dayjs(currentDate),
    pricePerPerson: 0,
    isAvailable: true,
  };

  const form = useForm({
    defaultValues: updateForm
      ? {
          ...updateForm,
          startDate: dayjs(updateForm.startDate),
          endDate: dayjs(updateForm.endDate),
        }
      : initialData,
  });
  const { register, handleSubmit, control } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "departureDate", updateForm);

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  return (
    <div className="p-3">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>
            {updateForm ? "Update Departure Date" : "Create Departure Date"}
          </p>
          <GrClose
            onClick={() => {
              setUpdateForm(null);
              setDialogOpen(false);
            }}
          />
        </div>
        <form>
          <div className="d-flex gap-5">
            <div className="d-flex flex-column gap-2 col-12">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <MobileDatePicker className="w-100" {...field} />
                  )}
                />

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <MobileDatePicker className="w-100" {...field} />
                  )}
                />
              </LocalizationProvider>

              <TextField
                required
                fullWidth
                size="small"
                label="Price per Person"
                type="text"
                variant="outlined"
                {...register("pricePerPerson", {
                  valueAsNumber: true,
                })}
                className="mt-2"
              />

              <div>
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  {...register("isAvailable")}
                  className="me-2"
                />
                <label for="isAvailable">Available</label>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-sm btn-success"
                >
                  {updateForm ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
