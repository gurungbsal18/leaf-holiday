"use client";

import React, { useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "react-bootstrap/Button";
import TextEditor from "@/components/TextEditor";
import { useFieldArray, useForm } from "react-hook-form";
import GroupsIcon from "@mui/icons-material/Groups";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CreatableAutocomplete from "@/components/ui/CreatableAutocomplete";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Image from "next/image";

export default function CreatePackage() {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const openFilePicker = () => {
    inputRef.current.click();
  };

  const form = useForm({
    defaultValues: {
      title: "",
      prices: [
        {
          noOfPeople: "",
          price: "",
        },
      ],
      duration: 0,
      maxAltitude: 0,
      bestWeather: "",
      metaTitle: "",
      metaDescription: "",
      info: "",
      content: "",
      region: "",
      difficulty: "",
    },
  });
  const { register, control, handleSubmit } = form;

  //for price list
  const {
    fields: pricesFields,
    append: pricesAppend,
    remove: pricesRemove,
  } = useFieldArray({
    name: "prices",
    control,
  });

  //for trip highlights
  const {
    fields: highlightsFields,
    append: highlightsAppend,
    remove: highlightsRemove,
  } = useFieldArray({
    name: "highlights",
    control,
  });

  //for trip inclusions
  const {
    fields: inclusionsFields,
    append: inclusionsAppend,
    remove: inclusionsRemove,
  } = useFieldArray({
    name: "inclusions",
    control,
  });

  //for trip exclusions
  const {
    fields: exclusionsFields,
    append: exclusionsAppend,
    remove: exclusionsRemove,
  } = useFieldArray({
    name: "exclusions",
    control,
  });

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div className="create-edit-package pt-0 p-2 w-100">
      <div className="d-flex justify-content-between sticky-top bg-white py-2 align-items-center border-bottom mb-2">
        <div className="d-flex gap-2 align-items-center">
          <span role="button">
            <ArrowBackIcon />
          </span>
          <h4 className="m-0 dashboard-header-title">Create Package</h4>
        </div>
        <div className="d-flex gap-2">
          <Button size="sm">Save As Draft</Button>
          <Button size="sm" variant="success" onClick={handleSubmit(onSubmit)}>
            Publish
          </Button>
        </div>
      </div>

      <form>
        <div className="">
          <div className="row gap-5 w-100 py-3">
            <div className="col flex-grow-1">
              <h4 className="dashboard-title">Name of package</h4>
              <div className="">
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="Title"
                  type="text"
                  variant="outlined"
                  {...register("title")}
                  className="mb-3"
                />

                <div className="d-flex">
                  <div className="mb-5">
                    <h4 className="dashboard-title">Price</h4>
                    {pricesFields.map((priceField, index) => (
                      <div
                        className="d-flex gap-3 align-items-center"
                        key={priceField.id}
                      >
                        <TextField
                          className="mx-0"
                          label="No. of People"
                          sx={{ m: 1, width: "25ch" }}
                          type="text"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <GroupsIcon />
                              </InputAdornment>
                            ),
                          }}
                          {...register(`prices.${index}.noOfPeople`)}
                        />
                        <TextField
                          className="mx-0"
                          label="Price"
                          sx={{ m: 1, width: "25ch" }}
                          type="number"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                          {...register(`prices.${index}.price`, {
                            valueAsNumber: true,
                          })}
                        />
                        {index > 0 && (
                          <span
                            role="button"
                            className="text-danger"
                            onClick={() => pricesRemove(index)}
                          >
                            <RemoveCircleIcon />
                          </span>
                          // <button
                          //   size="sm"
                          //   type="button"
                          //   onClick={() => pricesRemove(index)}
                          // >
                          //   -
                          // </button>
                        )}
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() =>
                        pricesAppend({
                          noOfPeople: "",
                          price: 0,
                        })
                      }
                    >
                      <span className="d-flex align-items-center gap-1">
                        <MonetizationOnIcon />
                        Add More Price
                      </span>
                    </Button>
                  </div>
                  {/* 
                  <TextField
                    label="Duration"
                    sx={{ m: 1, width: "25ch" }}
                    type="number"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">Days</InputAdornment>
                      ),
                    }}
                    {...register("duration", { valueAsNumber: true })}
                  /> */}
                </div>

                <h4 className="dashboard-title">Trip Fact</h4>
                <div className="d-flex gap-3 flex-wrap mb-5">
                  <TextField
                    className="mx-0"
                    label="Max Altitude"
                    sx={{ m: 1, width: "25ch" }}
                    type="number"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">Meters</InputAdornment>
                      ),
                    }}
                    {...register("maxAltitude", { valueAsNumber: true })}
                  />
                  <TextField
                    className="mx-0"
                    label="Weather"
                    sx={{ m: 1, width: "50ch" }}
                    type="text"
                    size="small"
                    {...register("bestWeather")}
                  />
                  <TextField
                    className="mx-0"
                    label="Duration"
                    sx={{ m: 1, width: "15ch" }}
                    type="number"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">Days</InputAdornment>
                      ),
                    }}
                    {...register("duration", { valueAsNumber: true })}
                  />
                </div>

                <div className="mb-5">
                  <h4 className="dashboard-title">Overview</h4>
                  <TextEditor control={control} name="info" />
                </div>

                <div className="d-flex flex-column gap-3 mb-5">
                  <div className="trip-highlights border-bottom pb-3">
                    <div className="form-header d-flex justify-content-between ">
                      <h4 className="dashboard-title">Trip Highlights</h4>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          highlightsAppend({
                            content: "",
                          })
                        }
                      >
                        + Add Trip Highlights
                      </Button>
                    </div>
                    <div className="form-content">
                      {highlightsFields.map((field, index) => {
                        return (
                          <div className="d-flex align-items-center">
                            <TextField
                              fullWidth
                              size="small"
                              type="text"
                              label=""
                              {...register(`highlights.${index}.content`)}
                            />
                            <span
                              role="button"
                              className="text-danger"
                              onClick={() => highlightsRemove(index)}
                            >
                              <RemoveCircleIcon />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="trip-inclusions border-bottom pb-3">
                    <div className="form-header d-flex justify-content-between ">
                      <h4 className="dashboard-title">Trip Inclusions</h4>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          inclusionsAppend({
                            content: "",
                          })
                        }
                      >
                        + Add Cost Include
                      </Button>
                    </div>
                    <div className="form-content d-flex flex-column gap-2">
                      {inclusionsFields.map((field, index) => {
                        return (
                          <div className="d-flex ">
                            <TextField
                              fullWidth
                              size="small"
                              type="text"
                              variant="outlined"
                              {...register(`inclusions.${index}.content`)}
                            />
                            <button onClick={() => inclusionsRemove(index)}>
                              -
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="trip-exclusions border-bottom pb-3">
                    <div className="form-header d-flex justify-content-between ">
                      <h4 className="dashboard-title">Trip exclusions</h4>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          exclusionsAppend({
                            content: "",
                          })
                        }
                      >
                        + Add Cost Exclude
                      </Button>
                    </div>
                    <div className="form-content">
                      {exclusionsFields.map((field, index) => {
                        return (
                          <div className="d-flex ">
                            <TextField
                              fullWidth
                              type="text"
                              variant="outlined"
                              {...register(`exclusions.${index}.content`)}
                            />
                            <button onClick={() => exclusionsRemove(index)}>
                              -
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="dashboard-title">Content</h4>
                  <TextEditor control={control} name="content" />
                </div>

                <TextField
                  fullWidth
                  size="small"
                  label="Meta Title"
                  type="text"
                  variant="outlined"
                  {...register("metaTitle")}
                />

                <TextField
                  fullWidth
                  size="small"
                  label="Meta Description"
                  type="text"
                  variant="outlined"
                  {...register("metaDescription")}
                />
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex flex-column ">
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Package Options</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox {...register("packageOptions.featured")} />
                      }
                      label="Featured"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox {...register("packageOptions.trending")} />
                      }
                      label="Trending"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox {...register("packageOptions.groupTour")} />
                      }
                      label="Group Tour"
                    />
                  </FormGroup>
                </FormControl>

                <div>
                  <CreatableAutocomplete
                    name="region"
                    register={register}
                    formName={"region"}
                  />
                </div>

                <div>
                  <CreatableAutocomplete
                    name="difficulty"
                    register={register}
                    formName={"difficulty"}
                  />
                </div>
                <div className="border-2 border-black">
                  <p>Header Image</p>
                  {selectedFile ? (
                    <div>
                      <p onClick={openFilePicker}>File Selected </p>
                      <p>{selectedFile.name}</p>
                      <p onClick={() => setSelectedFile(null)}>Remove Image</p>
                    </div>
                  ) : (
                    <MdOutlineAddPhotoAlternate
                      className="h3 cursor-pointer"
                      onClick={openFilePicker}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: "none" }}
                    fileName={selectedFile}
                    onChange={(e) => {
                      // Handle selected file here
                      setSelectedFile(e.target.files[0]);
                      console.log("Selected file:", selectedFile);
                    }}
                    // {...register("headerImage")}
                  />
                </div>
                <div>
                  <p>PDF</p>
                  <input
                    type="file"
                    accept="application/pdf"
                    {...register("pdf")}
                  />
                </div>
                <button onClick={handleSubmit(onSubmit)}>Publish</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
