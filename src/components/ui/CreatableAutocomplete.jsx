import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CreateRegion from "../CreateComponents/CreateRegion";
import CreateDifficulty from "../CreateComponents/CreateDifficulty";
import { GlobalContext } from "@/context";

const filter = createFilterOptions();

export default function CreatableAutocomplete({ register, formName }) {
  const regionInitialValues = {
    name: "",
    description: "",
    imageUrl: "",
  };
  const difficultyInitialValues = {
    name: "",
    description: "",
    rating: 1,
  };

  const isFormOfRegion = () => {
    if (formName === "region") {
      return true;
    }
    return false;
  };

  const { callExtractAll } = React.useContext(GlobalContext);

  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState(
    isFormOfRegion() ? regionInitialValues : difficultyInitialValues
  );
  const [difficultyList, setDifficultyList] = React.useState([]);
  const [regionList, setRegionList] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5001/difficulty/")
      .then((data) => data.json())
      .then((val) => setDifficultyList(val));
    fetch("http://localhost:5001/region/")
      .then((data) => data.json())
      .then((val) => setRegionList(val));
  }, [callExtractAll]);

  const handleClose = () => {
    setDialogValue(
      isFormOfRegion() ? regionInitialValues : difficultyInitialValues
    );
    toggleOpen(false);
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({ ...dialogValue, name: newValue });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({ ...dialogValue, name: newValue.inputValue });
          } else {
            setValue(newValue);
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
        options={isFormOfRegion() ? regionList.data : difficultyList.data}
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
        // sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            {...register(formName)}
            fullWidth
            size="small"
            label={isFormOfRegion() ? "Select Region" : "Trip Difficulty"}
          />
        )}
      />
      <Dialog open={open} toggleOpen={toggleOpen} onClose={handleClose}>
        {isFormOfRegion() ? (
          <CreateRegion
            nameValue={dialogValue.name}
            handleClose={handleClose}
            setValue={setValue}
          />
        ) : (
          <CreateDifficulty
            nameValue={dialogValue.name}
            handleClose={handleClose}
            setNameValue={setValue}
          />
        )}
      </Dialog>
    </React.Fragment>
  );
}
