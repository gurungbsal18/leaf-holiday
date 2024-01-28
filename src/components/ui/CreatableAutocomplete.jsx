import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CreateRegion from "../CreateComponents/CreateRegion";
import CreateDifficulty from "../CreateComponents/CreateDifficulty";
import { GlobalContext } from "@/context";
import { useContext } from "react";
import { Controller } from "react-hook-form";

const filter = createFilterOptions();

export default function TestCreatableAutocomplete({ control, formName }) {
  const { callExtractAll, setDialogOpen, setDialogContent } =
    useContext(GlobalContext);

  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${formName}/`)
      .then((data) => data.json())
      .then((val) => setOptionList(val.data));
  }, [callExtractAll]);

  function getLabel(value) {
    // Ensure value is not undefined and find the corresponding option
    const selectedOption =
      value !== undefined ? optionList.find((opt) => opt._id === value) : null;

    // Return the name of the selected option or an empty string if not found
    return selectedOption ? selectedOption.name : "";
  }

  return (
    <>
      <Controller
        name={formName}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setTimeout(() => {
                  setDialogOpen(true);
                  setDialogContent(
                    formName === "region" ? (
                      <CreateRegion
                        nameValue={newValue}
                        setNameValue={(value) => field.onChange(value)}
                      />
                    ) : (
                      <CreateDifficulty
                        nameValue={newValue}
                        setNameValue={(value) => field.onChange(value)}
                      />
                    )
                  );
                });
              } else if (newValue && newValue.inputValue) {
                setDialogOpen(true);
                setDialogContent(
                  formName === "region" ? (
                    <CreateRegion
                      nameValue={newValue.inputValue}
                      setNameValue={(value) => field.onChange(value)}
                    />
                  ) : (
                    <CreateDifficulty
                      nameValue={newValue.inputValue}
                      setNameValue={(value) => field.onChange(value)}
                    />
                  )
                );
              } else {
                field.onChange(newValue?._id || null);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  name: `Add "${params.inputValue}"`,
                });
              }

              return filtered;
            }}
            options={optionList}
            getOptionLabel={(option) => getLabel(option)}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            selectOnFocus
            clearOnBlur
            autoSelect
            handleHomeEndKeys
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                label={
                  formName === "region" ? "Select Region" : "Select Difficulty"
                }
              />
            )}
          />
        )}
      />
    </>
  );
}
