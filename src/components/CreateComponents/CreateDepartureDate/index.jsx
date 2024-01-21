"use client";
import React, { useContext, useRef } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";

export default function CreateDepartureDate() {
  const {
    updateForm,
    setUpdateForm,
    setCreateComponentOpen,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);

  const currentDate = new Date().toDateString();

  const initialData = {
    packageId: "6578848ef9d2151e944ad965",
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

  const onSubmit = async (data, event) => {
    if (updateForm) {
      const res = await axios.put(
        `http://localhost:5001/departureDate/update/${data._id}`,
        data
      );
    } else {
      const res = await axios.post(
        "http://localhost:5001/departureDate/add",
        data
      );
    }
    console.log("inner Form submitted", data);
    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setCreateComponentOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>
            {updateForm ? "Update Departure Date" : "Create Departure Date"}
          </p>
          <GrClose
            onClick={() => {
              setUpdateForm(null);
              setCreateComponentOpen(false);
            }}
          />
        </div>
        <form>
          <div className="d-flex gap-5">
            <div className="d-flex flex-column gap-2">
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
              />

              <div>
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  {...register("isAvailable")}
                />
                <label for="isAvailable">Available</label>
              </div>

              <button type="submit" onClick={handleSubmit(onSubmit)}>
                {updateForm ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
