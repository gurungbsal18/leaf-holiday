"use client";
import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "@/context";
import axios from "axios";
import CustomAutocomplete from "@/components/ui/CustomAutocomplete";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { countries } from "@/utils";

export default function EditHome() {
  const { setPageLevelLoader, pageLevelLoader } = useContext(GlobalContext);
  const [topTabCount, setTopTabCount] = useState(0);
  const [middleTabCount, setMiddleTabCount] = useState([0]);
  const [bottomTabCount, setBottomTabCount] = useState(0);
  const [allPackages, setAllPackages] = useState(null);
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      topTabName: "",
      topTabArray: [""],
    },
  });
  const {
    fields: topTabArrayFields,
    append: topTabArrayAppend,
    remove: topTabArrayRemove,
  } = useFieldArray({
    name: "topTabArray",
    control,
  });
  console.log("array field", topTabArrayFields);

  const getAllPackages = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/package/`
      );
      if (res.status === 200) {
        setPageLevelLoader(false);
        setAllPackages(res.data.data);
      }
    } catch (e) {
      setPageLevelLoader(false);
      console.log(e);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  const getHomePageDetail = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/homepage/`
      );
      console.log("gethomepagedetail", res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHomePageDetail();
    getAllPackages();
  }, []);

  console.log(allPackages);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={pageLevelLoader} />
      ) : (
        <div>
          <h1>Edit HOME PAGE</h1>
          <div>
            <div>
              <h4>Top Level Tab</h4>
              <div>
                <TextField
                  className="mx-0"
                  label="Title"
                  sx={{ m: 1, width: "25ch" }}
                  type="text"
                  size="small"
                  {...register("topTabName")}
                />
                <Button
                  disabled={topTabArrayFields.length >= 6}
                  size="sm"
                  variant="success"
                  onClick={() => {
                    topTabArrayAppend("");
                    setTopTabCount((prev) => prev + 1);
                  }}>
                  <span className="d-flex align-items-center gap-1">
                    + Add More Package
                  </span>
                </Button>
              </div>
              {topTabArrayFields.map((topTabArrayField, index) => (
                <div
                  className="d-flex flex-column flex-md-row gap-3 align-items-center"
                  key={topTabArrayField.id}>
                  {/* <input type="text" {...register(`topTabArray.${index}`)} /> */}
                  <CustomAutocomplete
                    setValue={setValue}
                    options={allPackages}
                    name={`topTabArray[${index}]`}
                  />

                  {index > 0 && (
                    <span
                      role="button"
                      className="text-danger"
                      onClick={() => topTabArrayRemove(index)}>
                      <RemoveCircleIcon />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <h4>Middle Level Tab</h4>
              <div>
                <TextField
                  className="mx-0"
                  label="Title"
                  sx={{ m: 1, width: "25ch" }}
                  type="text"
                  size="small"
                  {...register("topTabName")}
                />
                <Button
                  disabled={topTabArrayFields.length >= 6}
                  size="sm"
                  variant="success"
                  onClick={() => {
                    topTabArrayAppend("");
                    setTopTabCount((prev) => prev + 1);
                  }}>
                  <span className="d-flex align-items-center gap-1">
                    + Add More Package
                  </span>
                </Button>
              </div>
              {topTabArrayFields.map((topTabArrayField, index) => (
                <div
                  className="d-flex flex-column flex-md-row gap-3 align-items-center"
                  key={topTabArrayField.id}>
                  {/* <input type="text" {...register(`topTabArray.${index}`)} /> */}
                  <CustomAutocomplete
                    setValue={setValue}
                    options={allPackages}
                    name={`topTabArray[${index}]`}
                  />

                  {index > 0 && (
                    <span
                      role="button"
                      className="text-danger"
                      onClick={() => topTabArrayRemove(index)}>
                      <RemoveCircleIcon />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleSubmit(onSubmit)}>Submit</button>
        </div>
      )}
    </>
  );
}
