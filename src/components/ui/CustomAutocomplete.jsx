"use client";
import React, { useContext, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getId } from "@/utils/functions";
import { GlobalContext } from "@/context";

export default function CustomAutocomplete({
  options,
  setValue,
  formName,
  fieldName,
  label,
}) {
  const { verify } = useContext(GlobalContext);
  return (
    <>
      {options && (
        <Autocomplete
          autoComplete
          disabled={verify}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          onChange={(e) => {
            setValue(formName, getId(e.target.innerHTML, options, "name"));
          }}
          defaultValue={fieldName ? fieldName : options[0]}
          options={options}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField label={label} {...params} />}
        />
      )}
    </>
  );
}
