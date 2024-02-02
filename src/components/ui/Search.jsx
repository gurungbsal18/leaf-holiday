"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export default function Search() {
  const [data, setData] = useState([]);
  let cancelToken;
  const handleChange = async (e) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios.CancelToken.source();
      try {
        const results = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/package/search/?name=${searchTerm}`,
          { cancelToken: cancelToken.token }
        );
        console.log("Results for " + searchTerm + ": ", results.data);
        setData(results.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setData([]);
    }
  };
  return (
    <Autocomplete
      freeSolo
      disableClearable
      noOptionsText=""
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Packages" onChange={handleChange} />
      )}
    />
  );
}
