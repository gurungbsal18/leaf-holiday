"use client";

import React, { useContext, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "react-bootstrap/Button";
import TextEditor from "@/components/TextEditor";
import { useFieldArray, useForm } from "react-hook-form";
import GroupsIcon from "@mui/icons-material/Groups";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CreatableAutocomplete from "@/components/ui/CreatableAutocomplete";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import { submitPackageForm } from "@/utils/functions";
import CallAllEdits from "@/components/EditPackage/CallAllEdits";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import MovieIcon from "@mui/icons-material/Movie";
import ChipInput from "@/components/ui/ChipInput";

export default function CreatePackage() {
  const {
    pageLevelLoader,
    setPageLevelLoader,
    updatePackage,
    setUpdatePackage,
  } = useContext(GlobalContext);
  const [mainImage, setMainImage] = useState(
    updatePackage ? updatePackage.mainImageUrl : null
  );
  const [tripMap, setTripMap] = useState(
    updatePackage ? updatePackage.tripMapUrl : null
  );
  const [pdf, setPdf] = useState(updatePackage ? updatePackage.pdfUrl : null);

  const newUpdatePackage = {
    ...updatePackage,
    region: updatePackage?.region?._id,
    difficulty: updatePackage?.difficulty?._id,
  };

  const router = useRouter();

  const initialFormData = {
    name: "",
    slug: "",
    prices: [
      {
        numberOfPeople: "",
        price: 0,
      },
    ],
    tripFacts: {
      duration: {
        id: "duration",
        label: "Duration",
        info: 0,
      },
      bestWeather: {
        id: "bestWeater",
        label: "Best Weather",
        info: "",
      },
      maxAltitude: {
        id: "maxAltitude",
        label: "Max Altitude",
        info: 0,
      },
      accomodation: {
        id: "accomodation",
        label: "Accomodation",
        info: "",
      },
      meals: {
        id: "meals",
        label: "Meals",
        info: "",
      },
      transportation: {
        id: "transportation",
        label: "Transportation",
        info: "",
      },
      group: {
        id: "group",
        label: "Group",
        info: "",
      },
    },

    metaTitle: "",
    metaDescription: "",
    overview: "",
    content: "",
    videoGallery: [],
    mainImageUrl: "",
    tripMapUrl: "",
    pdfUrl: "",
    isTopSelling: false,
    isFeatured: false,
    isTrending: false,
    isGroupTour: false,
  };

  const form = useForm({
    defaultValues: newUpdatePackage ? newUpdatePackage : initialFormData,
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

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

  //for video gallery
  // const {
  //   fields: videoGalleryFields,
  //   append: videoGalleryAppend,
  //   remove: videoGalleryRemove,
  // } = useFieldArray({
  //   name: "videoGallery",
  //   control,
  // });

  const onSubmit = async (data) => {
    const res = submitPackageForm(
      data,
      updatePackage,
      setUpdatePackage,
      router
    );
  };
  useEffect(() => {
    const updatePackageData = JSON.parse(localStorage.getItem("updatePackage"));
    if (updatePackageData) {
      const newUpdatePackage = {
        ...updatePackageData,
        region: updatePackageData?.region?._id,
        difficulty: updatePackageData?.difficulty?._id,
      };
      setUpdatePackage(newUpdatePackage);
      reset(newUpdatePackage);
      setMainImage(newUpdatePackage?.mainImageUrl || null);
      setTripMap(newUpdatePackage?.tripMapUrl || null);
      setPdf(newUpdatePackage?.pdfUrl || null);
    }
    setPageLevelLoader(true);
    setTimeout(() => {
      setPageLevelLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="create-edit-package pt-0 p-2">
          <div className="d-flex flex-column flex-md-row justify-content-start justify-content-md-between sticky-top bg-white py-2 align-itmes-start align-items-md-center border-bottom mb-2">
            <div className="d-flex gap-2 align-items-center">
              <span role="button">
                <ArrowBackIcon
                  onClick={() => {
                    setUpdatePackage(null);
                    router.push("/admin/packages");
                  }}
                />
              </span>
              <h4 className="m-0 dashboard-header-title">
                {updatePackage ? "Update Package" : "Create Package"}
              </h4>
            </div>
            <div className="d-flex gap-2">
              {/* <Button size="sm" className="flex-grow-1">
          Save As Draft
        </Button> */}
              <Button
                size="sm"
                variant="success"
                onClick={handleSubmit(onSubmit)}>
                {updatePackage ? "Update" : "Publish"}
              </Button>
            </div>
          </div>

          <form>
            <div className="row gap-5 w-100 py-3">
              <div className="col dashboard-main-content">
                <h4 className="dashboard-title">Name of package</h4>
                <div className="">
                  <TextField
                    required
                    fullWidth
                    size="small"
                    label="Title"
                    type="text"
                    variant="outlined"
                    value={watch("name")}
                    onChange={(e) => {
                      setValue("name", e.target.value);
                      setValue(
                        "slug",
                        e.target.value.toLowerCase().replace(/\s+/g, "-")
                      );
                    }}
                    className="mb-3"
                  />
                  <label htmlFor="url" className="text-muted fs-14 mb-4">
                    URL:{" "}
                    {process.env.NEXT_PUBLIC_NODE_ENV === "development"
                      ? "http://localhost:3000/"
                      : process.env.NEXT_PUBLIC_WEBSITE_URL}
                    /package/
                  </label>
                  <input
                    type="text"
                    value={watch("slug")}
                    onChange={(e) => setValue("slug", e.target.value)}
                    style={{ width: "300px", fontSize: "14px" }}
                  />

                  <div className="d-flex">
                    <div className="mb-5">
                      <h4 className="dashboard-title">Price</h4>
                      {pricesFields.map((priceField, index) => (
                        <div
                          className="d-flex flex-column flex-md-row gap-3 align-items-center"
                          key={`prices-${index}`}>
                          <TextField
                            className="mx-0"
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
                            {...register(`prices.${index}.numberOfPeople`)}
                          />
                          <TextField
                            className="mx-0"
                            label="Price"
                            sx={{ m: 1, width: "25ch" }}
                            type="number"
                            size="small"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            {...register(`prices.${index}.price`, {
                              valueAsNumber: true,
                            })}
                          />
                          {index > 0 && (
                            <span
                              role="button"
                              className="text-danger"
                              onClick={() => pricesRemove(index)}>
                              <RemoveCircleIcon />
                            </span>
                          )}
                        </div>
                      ))}
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() =>
                          pricesAppend({
                            numberOfPeople: "",
                            price: 0,
                          })
                        }>
                        <span className="d-flex align-items-center gap-1">
                          <MonetizationOnIcon />
                          Add More Price
                        </span>
                      </Button>
                    </div>
                  </div>

                  <h4 className="dashboard-title">Trip Fact</h4>
                  <div className="d-flex gap-3 flex-wrap mb-5">
                    <TextField
                      className="mx-0"
                      label="Max Altitude"
                      sx={{ m: 1, width: "25ch" }}
                      type="number"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            Meters
                          </InputAdornment>
                        ),
                      }}
                      {...register("tripFacts.maxAltitude.info", {
                        valueAsNumber: true,
                      })}
                    />
                    <TextField
                      className="mx-0"
                      label="Best Weather"
                      sx={{ m: 1, width: "50ch" }}
                      type="text"
                      size="small"
                      {...register("tripFacts.bestWeather.info")}
                    />
                    <TextField
                      className="mx-0"
                      label="Duration"
                      sx={{ m: 1, width: "25ch" }}
                      type="number"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">Days</InputAdornment>
                        ),
                      }}
                      {...register("tripFacts.duration.info", {
                        valueAsNumber: true,
                      })}
                    />
                    <TextField
                      className="mx-0"
                      label="Accomodation"
                      sx={{ m: 1, width: "50ch" }}
                      type="text"
                      size="small"
                      {...register("tripFacts.accomodation.info")}
                    />
                    <TextField
                      className="mx-0"
                      label="Meals"
                      sx={{ m: 1, width: "50ch" }}
                      type="text"
                      size="small"
                      {...register("tripFacts.meals.info")}
                    />
                    <TextField
                      className="mx-0"
                      label="Transportation"
                      sx={{ m: 1, width: "50ch" }}
                      type="text"
                      size="small"
                      {...register("tripFacts.transportation.info")}
                    />
                    <TextField
                      className="mx-0"
                      label="Group"
                      sx={{ m: 1, width: "50ch" }}
                      type="text"
                      size="small"
                      {...register("tripFacts.group.info")}
                    />
                    <div className="w-50">
                      <CreatableAutocomplete
                        apiName="difficulty"
                        initialValue={watch("difficulty")}
                        setValue={setValue}
                      />
                    </div>
                  </div>

                  <ChipInput
                    setValue={setValue}
                    formName={"activities"}
                    initialValue={watch("activities")}
                  />

                  <div className="mb-5">
                    <h4 className="dashboard-title">Overview</h4>
                    <TextEditor control={control} name="overview" />
                  </div>

                  <div className="d-flex flex-column gap-3 mb-5">
                    <div className="trip-inclusions p-3 bg-light rounded">
                      <div className="form-header d-flex justify-content-between ">
                        <h4 className="dashboard-title">Trip Inclusions</h4>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => inclusionsAppend("")}>
                          + Add Cost Include
                        </Button>
                      </div>
                      <div className="form-content d-flex flex-column gap-2">
                        {inclusionsFields.map((field, index) => {
                          return (
                            <div
                              key={`inclusion-${index}`}
                              className="d-flex align-items-center gap-2 mt-2">
                              <input
                                {...register(`inclusions.${index}`)}
                                className="form-control"
                              />
                              <span
                                onClick={() => inclusionsRemove(index)}
                                className="text-danger">
                                <RemoveCircleIcon />
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="trip-exclusions p-3 bg-light rounded">
                      <div className="form-header d-flex justify-content-between ">
                        <h4 className="dashboard-title">Trip exclusions</h4>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => exclusionsAppend("")}>
                          + Add Cost Exclude
                        </Button>
                      </div>
                      <div className="form-content">
                        {exclusionsFields.map((field, index) => {
                          return (
                            <div
                              key={`exclusion-${index}`}
                              className="d-flex align-items-center gap-2 mt-2">
                              <input
                                {...register(`exclusions.${index}`)}
                                className="form-control"
                              />
                              <span
                                onClick={() => exclusionsRemove(index)}
                                className="text-danger">
                                <RemoveCircleIcon />
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="trip-highlights p-3 bg-light rounded mb-4">
                      <div className="form-header d-flex justify-content-between ">
                        <h4 className="dashboard-title">Trip Highlights</h4>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => highlightsAppend("")}>
                          + Add Trip Highlights
                        </Button>
                      </div>
                      <div className="form-content">
                        {highlightsFields.map((field, index) => {
                          return (
                            <div
                              key={`highlight-${index}`}
                              className="d-flex align-items-center gap-2 mt-2">
                              <input
                                {...register(`highlights.${index}`)}
                                className="form-control"
                              />
                              <span
                                role="button"
                                className="text-danger"
                                onClick={() => highlightsRemove(index)}>
                                <RemoveCircleIcon />
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h4 className="dashboard-title">Content</h4>
                    <TextEditor control={control} name="content" />
                  </div>

                  <div className="d-flex gap-3 flex-column bg-light p-3">
                    <h4 className="dashboard-title">SEO</h4>
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
                </div>
              </div>
              <div className="col-auto dashboard-main-content-sidebar">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column ">
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        id="isTopSelling"
                        {...register("isTopSelling")}
                      />
                      <label htmlFor="isTopSelling">Top Selling</label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        {...register("isFeatured")}
                      />
                      <label htmlFor="isFeatured">Featured</label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        id="isTrending"
                        {...register("isTrending")}
                      />
                      <label htmlFor="isTrending">Trending</label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        id="isGroupTour"
                        {...register("isGroupTour")}
                      />
                      <label htmlFor="isGroupTour">Group Tour</label>
                    </div>
                  </div>

                  <div className="w-100">
                    <CreatableAutocomplete
                      apiName="region"
                      initialValue={watch("region")}
                      setValue={setValue}
                    />
                  </div>

                  <UploadToCloudinary
                    selectedFile={mainImage}
                    setSelectedFile={setMainImage}
                    label="Main Image"
                    setValue={setValue}
                    formName="mainImageUrl"
                  />
                  <UploadToCloudinary
                    selectedFile={tripMap}
                    setSelectedFile={setTripMap}
                    label="Trip Map"
                    setValue={setValue}
                    formName="tripMapUrl"
                  />
                  <UploadToCloudinary
                    selectedFile={pdf}
                    setSelectedFile={setPdf}
                    label="PDF"
                    setValue={setValue}
                    formName="pdfUrl"
                  />
                </div>
              </div>
            </div>
          </form>
          {updatePackage && (
            <div className="video-gallery border-bottom pb-3 dashboard-video-gallery">
              <div className="form-header d-flex justify-content-between align-items-center bg-light p-3">
                <h4 className="dashboard-title">Youtube Video Link</h4>
              </div>
              <div className="form-content">
                {/* {videoGalleryFields.map((field, index) => {
                  return (
                    <div key={field.key} className="d-flex align-items-center">
                      <input
                        {...register(`videoGallery.${index}`)}
                        className="form-control"
                      />
                      <span
                        role="button"
                        className="text-danger"
                        onClick={() => videoGalleryRemove(index)}>
                        <RemoveCircleIcon />
                      </span>
                    </div>
                  );
                })} */}
                <TextField
                  fullWidth
                  size="small"
                  label="Video URL"
                  type="text"
                  variant="outlined"
                  {...register("videoGallery.0")}
                />
              </div>
            </div>
          )}
          {updatePackage && <CallAllEdits />}
        </div>
      )}
    </>
  );
}
