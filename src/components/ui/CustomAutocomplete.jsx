"use client";
import { Controller } from "react-hook-form";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function CustomAutocomplete({ options, setValue, name }) {
  const getPackageId = (packageName) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].name === packageName) {
        return options[i]._id;
      }
    }
    return "Invalid Package Name";
  };
  return (
    <Autocomplete
      onChange={(e) => {
        setValue(name, getPackageId(e.target.innerHTML));
      }}
      autoSelect
      options={options}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} helperText="" />}
    />
  );
}
