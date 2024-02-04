"use client";
import { Controller } from "react-hook-form";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function CustomAutocomplete({ options, setValue, formName }) {
  return (
    <Autocomplete
      onChange={(e) => {
        setValue(formName, getId(e.target.innerHTML, options, name));
      }}
      autoSelect
      options={options}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} helperText="" />}
    />
  );
}
