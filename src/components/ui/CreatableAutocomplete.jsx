"use client";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import CreateRegion from "../CreateComponents/CreateRegion";
import CreateDifficulty from "../CreateComponents/CreateDifficulty";
import { getNameById } from "@/utils/functions";
import { toast } from "react-toastify";
import axios from "@/utils/axios";

const filter = createFilterOptions();

export default function CreatableAutocomplete({
  initialValue,
  setValue,
  apiName,
}) {
  const { setDialogOpen, setDialogContent, callExtractAll } =
    useContext(GlobalContext);
  const [val, setVal] = useState(initialValue || null);
  const [optionData, setOptionData] = useState([]);
  const isRegionField = () => {
    return apiName === "region";
  };

  const getOptionData = async () => {
    try {
      const res = await axios.get(`/${apiName}/`);
      if (res.status === 200) {
        setOptionData(res.data.data);
        setVal(() => getNameById(initialValue, res.data.data));
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };
  useEffect(() => {
    getOptionData();
  }, [callExtractAll]);
  //   (optionData);
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
