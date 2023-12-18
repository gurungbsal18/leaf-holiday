"use client";

import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "react-bootstrap/Button";
import TextEditor from "@/components/TextEditor";
import { useFieldArray, useForm } from "react-hook-form";
import GroupsIcon from "@mui/icons-material/Groups";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { top100Films } from "../page";
import CreatableAutocomplete from "@/components/ui/CreatableAutocomplete";

export default function CreatePackage() {
  const form = useForm({
    defaultValues: {
      title: "",
      prices: [
        {
          noOfPeople: "",
          price: "",
        },
      ],
      duration: "",
      maxAltitude: "",
      bestWeather: "",
      metaTitle: "",
      metaDescription: "",
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
    <div className="create-edit-package">
      <div className="d-flex justify-content-between ">
        <div className="d-flex">
          <Button>
            <KeyboardArrowLeftIcon />
          </Button>
          <h5>Create Package</h5>
        </div>
        <div>
          <Button>Save As Draft</Button>
          <Button>Publish</Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex">
          <div className="">
            <TextField
              required
              fullWidth
              size="small"
              label="Title"
              type="text"
              variant="outlined"
              {...register("title")}
            />

            <div className="d-flex">
              <div className="">
                <p>List Of Prices</p>
                {pricesFields.map((priceField, index) => (
                  <div key={priceField.id}>
                    <TextField
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
                      label="Price"
                      sx={{ m: 1, width: "25ch" }}
                      type="number"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      {...register(`prices.${index}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => pricesRemove(index)}>
                        -
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="border-none bg-none"
                  type="button"
                  onClick={() =>
                    pricesAppend({
                      noOfPeople: "",
                      price: 0,
                    })
                  }>
                  Add Price
                </button>
              </div>

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
              />
            </div>

            <div className="d-flex">
              <TextField
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
                label="Best Weather"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                size="small"
                {...register("bestWeather")}
              />
            </div>

            <div>
              <p>Info</p>
              <TextEditor control={control} name="info" />
            </div>

            <div className="trip-highlights">
              <div className="form-header d-flex justify-content-between ">
                <p>Trip Highlights</p>
                <button
                  type="button"
                  onClick={() =>
                    highlightsAppend({
                      content: "",
                    })
                  }>
                  +Add trip highlights
                </button>
              </div>
              <div className="form-content">
                {highlightsFields.map((field, index) => {
                  return (
                    <div className="d-flex ">
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        variant="outlined"
                        {...register(`highlights.${index}.content`)}
                      />
                      <button onClick={() => highlightsRemove(index)}>-</button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="trip-inclusions">
              <div className="form-header d-flex justify-content-between ">
                <p>Trip Inclusions</p>
                <button
                  type="button"
                  onClick={() =>
                    inclusionsAppend({
                      content: "",
                    })
                  }>
                  +Add trip inclusions
                </button>
              </div>
              <div className="form-content">
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
                      <button onClick={() => inclusionsRemove(index)}>-</button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="trip-exclusions">
              <div className="form-header d-flex justify-content-between ">
                <p>Trip exclusions</p>
                <button
                  type="button"
                  onClick={() =>
                    exclusionsAppend({
                      content: "",
                    })
                  }>
                  +Add trip exclusions
                </button>
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
                      <button onClick={() => exclusionsRemove(index)}>-</button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p>Content</p>
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

          <div className="d-flex flex-column ">
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
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
              <CreatableAutocomplete />
            </div>
            <button>Publish</button>
          </div>
        </div>
      </form>
    </div>
  );
}
