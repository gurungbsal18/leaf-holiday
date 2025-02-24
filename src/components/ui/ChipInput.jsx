"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getId, getNameById } from "@/utils/functions";

export default function ChipInput({ setValue, formName, initialValue }) {
  const [activityInput, setActivityInput] = useState(initialValue || []);
  const [activityData, setActivityData] = useState([]);

  const handleDelete = (index) => {
    setActivityInput((prevState) =>
      prevState.filter((item, idx) => idx !== index)
    );
  };

  const getActivityData = async () => {
    try {
      const res = await axios.get("/activity/");
      setActivityData(res.data.data);
    } catch (e) {}
  };
  useEffect(() => {
    getActivityData();
  }, []);

  useEffect(() => {
    setValue(formName, activityInput);
  }, [activityInput]);
  return (
    <div className="">
      <div className="h-20 w-50 border-2 border-success">
        {activityInput.map((item, index) => (
          <Chip
            key={`activity-${index}`}
            label={getNameById(item, activityData)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
      {activityData && (
        <Autocomplete
          autoComplete
          isOptionEqualToValue={(option, value) => option._id === value._id}
          onChange={(e) => {
            if (e.target.innerHTML !== "") {
              setActivityInput(
                Array.from(
                  new Set([
                    ...activityInput,
                    getId(e.target.innerHTML, activityData, "name"),
                  ])
                )
              );
            }
          }}
          options={activityData}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField label="Select Activity" {...params} />
          )}
        />
      )}
    </div>
  );
}
