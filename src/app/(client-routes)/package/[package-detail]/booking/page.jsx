"use client";
import { GlobalContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";

export default function Booking() {
  const { trackPage, isAuthUser, bookingFormData, setBookingFormData, user } =
    useContext(GlobalContext);
  const router = useRouter();
  const [countryName, setCountryName] = useState("");
  const packageId = usePathname()
    .replace("/package/", "")
    .replace("/booking", "");
  const [packageName, setPackageName] = useState(null);

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: bookingFormData || {
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: "",
      country: "",
      noOfChildren: 0,
      tripDate: dayjs(new Date().toDateString()),
      noOfGuests: 0,
      total: 0,
      message: "",
    },
  });
  const watchAllFields = watch();

  const onSubmit = (data) => {
    console.log("Booking form submitted: ", data);
  };

  useEffect(() => {
    const getPackageDetail = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/package/${packageId}`
        );
        if (res.status === 200) {
          setPackageName(res.data.data.name);
        }
        console.log(res);
      } catch (e) {
        toast.error("Package Not Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPackageName("Package Not Found");
      }
    };
    getPackageDetail();
  }, []);

  return (
    <>
      {packageName ? (
        <div className="d-flex">
          <div>
            <h1>Booking Form</h1>
            <div>
              <form>
                <TextField
                  required
                  size="small"
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  {...register("name")}
                />
                <TextField
                  required
                  size="small"
                  label="Email"
                  type="text"
                  variant="outlined"
                  {...register("email")}
                />
                <TextField
                  required
                  size="small"
                  label="Phone Number / Whatsapp / Wechat"
                  type="text"
                  variant="outlined"
                  {...register("phoneNumber")}
                />
                <Autocomplete
                  disablePortal
                  options={countries}
                  onChange={(e) => setValue("country", e.target.innerHTML)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Country" />
                  )}
                />
                <TextField
                  required
                  size="small"
                  label="Number of Adult"
                  type="number"
                  variant="outlined"
                  {...register("noOfGuests", {
                    valueAsNumber: true,
                  })}
                />
                <TextField
                  required
                  size="small"
                  label="Number of Adult"
                  type="number"
                  variant="outlined"
                  {...register("noOfChildren", {
                    valueAsNumber: true,
                  })}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="tripDate"
                    control={control}
                    render={({ field }) => (
                      <MobileDatePicker className="w-100" {...field} />
                    )}
                  />
                </LocalizationProvider>
                <div className="d-flex flex-column ">
                  <label>Message</label>
                  <TextareaAutosize {...register("message")} />
                </div>
                <button type="submit" onClick={handleSubmit(onSubmit)}>
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div>
            <h1>Booking Detail</h1>
            <div>
              <p>Package Name: {packageName}</p>
              {mapHelper.map((item) => (
                <div key={item.id}>
                  {item.id === "tripDate" ? (
                    <p>{`${item.label}: ${
                      dayjs(watchAllFields[item.id]).format("MMM DD, YYYY") ||
                      ""
                    }`}</p>
                  ) : (
                    <p>{`${item.label}: ${watchAllFields[item.id] || ""}`}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Notification />
        </div>
      ) : (
        <PageLevelLoader loading={true} />
      )}
    </>
  );
}

const mapHelper = [
  {
    id: "name",
    label: "Full Name",
  },
  {
    id: "email",
    label: "Email Address",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "country",
    label: "Country",
  },
  {
    id: "noOfGuests",
    label: "Number of Adults",
  },
  {
    id: "noOfChildren",
    label: "Number of Children",
  },
  {
    id: "tripDate",
    label: "Date of Travel",
  },
  {
    id: "message",
    label: "Message",
  },
];

const countries = [
  "Andorra",
  "French Southern and Antarctic Lands",
  "Laos",
  "Canada",
  "Nigeria",
  "Vanuatu",
  "Czechia",
  "Malawi",
  "Mali",
  "Iceland",
  "Norway",
  "Saint Vincent and the Grenadines",
  "Guadeloupe",
  "Chile",
  "Bermuda",
  "Kuwait",
  "Dominica",
  "Montenegro",
  "United States Virgin Islands",
  "Cameroon",
  "Sri Lanka",
  "China",
  "Bangladesh",
  "Sweden",
  "Grenada",
  "Turkey",
  "Guinea",
  "Tanzania",
  "Rwanda",
  "Singapore",
  "Morocco",
  "Saint Barthélemy",
  "Iraq",
  "Brunei",
  "Isle of Man",
  "North Korea",
  "Iran",
  "Curaçao",
  "Paraguay",
  "Albania",
  "Tajikistan",
  "Bolivia",
  "Austria",
  "Saint Kitts and Nevis",
  "United States Minor Outlying Islands",
  "Colombia",
  "Kosovo",
  "Belize",
  "Guinea-Bissau",
  "Marshall Islands",
  "Myanmar",
  "French Polynesia",
  "Brazil",
  "Croatia",
  "Somalia",
  "Afghanistan",
  "Anguilla",
  "Cook Islands",
  "New Zealand",
  "Eritrea",
  "Cambodia",
  "Bahamas",
  "Belarus",
  "Norfolk Island",
  "Tuvalu",
  "South Georgia",
  "Mauritania",
  "New Caledonia",
  "Bulgaria",
  "Mozambique",
  "Niue",
  "Estonia",
  "Italy",
  "Malta",
  "Slovenia",
  "India",
  "Peru",
  "Burundi",
  "Lithuania",
  "United States",
  "Honduras",
  "Tonga",
  "Saudi Arabia",
  "Suriname",
  "Qatar",
  "Gibraltar",
  "Northern Mariana Islands",
  "Mauritius",
  "Barbados",
  "Réunion",
  "British Indian Ocean Territory",
  "Syria",
  "Egypt",
  "São Tomé and Príncipe",
  "Kiribati",
  "Timor-Leste",
  "Lesotho",
  "Solomon Islands",
  "Libya",
  "South Korea",
  "Liechtenstein",
  "Nicaragua",
  "Ecuador",
  "Maldives",
  "Algeria",
  "Kyrgyzstan",
  "Finland",
  "Kenya",
  "Cuba",
  "Montserrat",
  "Poland",
  "Åland Islands",
  "Ethiopia",
  "Togo",
  "Bosnia and Herzegovina",
  "Uruguay",
  "Guam",
  "Cape Verde",
  "Chad",
  "Vatican City",
  "Palau",
  "Haiti",
  "Yemen",
  "Eswatini",
  "Zimbabwe",
  "Greece",
  "Israel",
  "Saint Martin",
  "Antigua and Barbuda",
  "Cyprus",
  "Sint Maarten",
  "Monaco",
  "Fiji",
  "Ukraine",
  "Martinique",
  "Hong Kong",
  "Portugal",
  "Bhutan",
  "Nepal",
  "France",
  "Ireland",
  "United Arab Emirates",
  "Guernsey",
  "Saint Lucia",
  "Dominican Republic",
  "Serbia",
  "Botswana",
  "Ivory Coast",
  "Ghana",
  "Comoros",
  "Azerbaijan",
  "United Kingdom",
  "Central African Republic",
  "Palestine",
  "Caribbean Netherlands",
  "Taiwan",
  "Pitcairn Islands",
  "San Marino",
  "Svalbard and Jan Mayen",
  "Djibouti",
  "Wallis and Futuna",
  "Denmark",
  "Papua New Guinea",
  "Madagascar",
  "Bouvet Island",
  "Hungary",
  "Tokelau",
  "Trinidad and Tobago",
  "Gambia",
  "Luxembourg",
  "Cocos (Keeling) Islands",
  "Republic of the Congo",
  "Argentina",
  "DR Congo",
  "Greenland",
  "Jordan",
  "Belgium",
  "Switzerland",
  "Indonesia",
  "Lebanon",
  "Malaysia",
  "Cayman Islands",
  "Slovakia",
  "Armenia",
  "Christmas Island",
  "Mongolia",
  "Saint Pierre and Miquelon",
  "Japan",
  "South Africa",
  "Philippines",
  "Micronesia",
  "Germany",
  "Latvia",
  "Jamaica",
  "Macau",
  "Nauru",
  "Faroe Islands",
  "Guyana",
  "Burkina Faso",
  "Sudan",
  "Russia",
  "Mayotte",
  "Australia",
  "Liberia",
  "Mexico",
  "Tunisia",
  "Aruba",
  "Kazakhstan",
  "Oman",
  "French Guiana",
  "Niger",
  "Turkmenistan",
  "Sierra Leone",
  "Samoa",
  "Senegal",
  "Georgia",
  "Namibia",
  "South Sudan",
  "Thailand",
  "Bahrain",
  "Falkland Islands",
  "Jersey",
  "Vietnam",
  "Guatemala",
  "Moldova",
  "North Macedonia",
  "Uzbekistan",
  "Romania",
  "Uganda",
  "El Salvador",
  "Zambia",
  "Gabon",
  "Equatorial Guinea",
  "Spain",
  "Netherlands",
  "British Virgin Islands",
  "Benin",
  "Pakistan",
  "Panama",
  "Turks and Caicos Islands",
  "Angola",
  "American Samoa",
  "Venezuela",
  "Costa Rica",
  "Puerto Rico",
  "Seychelles",
];
