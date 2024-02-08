"use client";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import CreateRegion from "../CreateComponents/CreateRegion";
import CreateDifficulty from "../CreateComponents/CreateDifficulty";
import axios from "axios";

const filter = createFilterOptions();

export default function CreatableAutocomplete({
  initialValue,
  setValue,
  apiName,
}) {
  const { setDialogOpen, setDialogContent, callExtractAll } =
    useContext(GlobalContext);
  const [val, setVal] = useState(initialValue || null);
  const [optionData, setOptionData] = useState(null);
  const isRegionField = () => {
    return apiName === "region";
  };

  const getOptionData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/`
      );
      if (res.status === 200) {
        setOptionData(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getOptionData();
  }, [callExtractAll]);
  //   console.log(optionData);
  return (
    <>
      <Autocomplete
        value={val}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setDialogOpen(true);
              setDialogContent(
                isRegionField() ? (
                  <CreateRegion
                    nameValue={newValue}
                    setNameValue={setValue}
                    setVal={setVal}
                  />
                ) : (
                  <CreateDifficulty
                    nameValue={newValue}
                    setNameValue={setValue}
                    setVal={setVal}
                  />
                )
              );
            });
          } else if (newValue && newValue.inputValue) {
            setDialogOpen(true);
            setDialogContent(
              isRegionField() ? (
                <CreateRegion
                  nameValue={newValue.inputValue}
                  setNameValue={setValue}
                  setVal={setVal}
                />
              ) : (
                <CreateDifficulty
                  nameValue={newValue.inputValue}
                  setNameValue={setValue}
                  setVal={setVal}
                />
              )
            );
          } else {
            setVal(newValue);
            setValue(apiName, newValue?._id);
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
        id="free-solo-dialog-demo"
        options={optionData}
        getOptionLabel={(option) => {
          // e.g. value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label={isRegionField() ? "Select Region" : "Select Difficulty"}
          />
        )}
      />
    </>
  );
}
