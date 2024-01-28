"use client";
import { GlobalContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";

export default function Booking() {
  const { isAuthUser, bookingFormData, setBookingFormData } =
    useContext(GlobalContext);
  const router = useRouter();

  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: bookingFormData || {
      name: "",
      email: "",
      phoneNumber: "",
      country: "",
      noOfChildren: 0,
      tripDate: "",
      noOfGuests: 0,
      total: 0,
      message: "",
    },
  });
  const watchAllFields = watch();

  const onSubmit = (data) => {
    console.log("Booking form submitted: ", data);
  };

  return (
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
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  size="small"
                  options={countries}
                  {...field}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                />
              )}
            />
            <TextField
              required
              size="small"
              label="Number of Adult"
              type="text"
              variant="outlined"
              {...register("noOfGuests", {
                valueAsNumber: true,
              })}
            />
            <TextField
              required
              size="small"
              label="Number of Adult"
              type="text"
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
          {mapHelper.map((item) => (
            <div key={item.id}>
              <p>{`${item.label}: ${watchAllFields[item.id] || ""}`}</p>
            </div>
          ))}
        </div>
      </div>
      <Notification />
    </div>
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
  { label: "Andorra", dialCode: "+376" },
  { label: "French Southern and Antarctic Lands", dialCode: "+262" },
  { label: "Laos", dialCode: "+856" },
  { label: "Canada", dialCode: "+1" },
  { label: "Nigeria", dialCode: "+234" },
  { label: "Vanuatu", dialCode: "+678" },
  { label: "Czechia", dialCode: "+420" },
  { label: "Malawi", dialCode: "+265" },
  { label: "Mali", dialCode: "+223" },
  { label: "Iceland", dialCode: "+354" },
  { label: "Norway", dialCode: "+47" },
  { label: "Saint Vincent and the Grenadines", dialCode: "+1784" },
  { label: "Guadeloupe", dialCode: "+590" },
  { label: "Chile", dialCode: "+56" },
  { label: "Bermuda", dialCode: "+1441" },
  { label: "Kuwait", dialCode: "+965" },
  { label: "Dominica", dialCode: "+1767" },
  { label: "Montenegro", dialCode: "+382" },
  { label: "United States Virgin Islands", dialCode: "+1340" },
  { label: "Cameroon", dialCode: "+237" },
  { label: "Sri Lanka", dialCode: "+94" },
  { label: "China", dialCode: "+86" },
  { label: "Bangladesh", dialCode: "+880" },
  { label: "Sweden", dialCode: "+46" },
  { label: "Grenada", dialCode: "+1473" },
  { label: "Turkey", dialCode: "+90" },
  { label: "Guinea", dialCode: "+224" },
  { label: "Tanzania", dialCode: "+255" },
  { label: "Rwanda", dialCode: "+250" },
  { label: "Singapore", dialCode: "+65" },
  { label: "Morocco", dialCode: "+212" },
  { label: "Saint Barthélemy", dialCode: "+590" },
  { label: "Iraq", dialCode: "+964" },
  { label: "Brunei", dialCode: "+673" },
  { label: "Isle of Man", dialCode: "+44" },
  { label: "North Korea", dialCode: "+850" },
  { label: "Iran", dialCode: "+98" },
  { label: "Curaçao", dialCode: "+599" },
  { label: "Paraguay", dialCode: "+595" },
  { label: "Albania", dialCode: "+355" },
  { label: "Tajikistan", dialCode: "+992" },
  { label: "Bolivia", dialCode: "+591" },
  { label: "Austria", dialCode: "+43" },
  { label: "Saint Kitts and Nevis", dialCode: "+1869" },
  { label: "United States Minor Outlying Islands", dialCode: "+268" },
  { label: "Colombia", dialCode: "+57" },
  { label: "Kosovo", dialCode: "+383" },
  { label: "Belize", dialCode: "+501" },
  { label: "Guinea-Bissau", dialCode: "+245" },
  { label: "Marshall Islands", dialCode: "+692" },
  { label: "Myanmar", dialCode: "+95" },
  { label: "French Polynesia", dialCode: "+689" },
  { label: "Brazil", dialCode: "+55" },
  { label: "Croatia", dialCode: "+385" },
  { label: "Somalia", dialCode: "+252" },
  { label: "Afghanistan", dialCode: "+93" },
  { label: "Anguilla", dialCode: "+1264" },
  { label: "Cook Islands", dialCode: "+682" },
  { label: "New Zealand", dialCode: "+64" },
  { label: "Eritrea", dialCode: "+291" },
  { label: "Cambodia", dialCode: "+855" },
  { label: "Bahamas", dialCode: "+1242" },
  { label: "Belarus", dialCode: "+375" },
  { label: "Norfolk Island", dialCode: "+672" },
  { label: "Tuvalu", dialCode: "+688" },
  { label: "South Georgia", dialCode: "+500" },
  { label: "Mauritania", dialCode: "+222" },
  { label: "New Caledonia", dialCode: "+687" },
  { label: "Bulgaria", dialCode: "+359" },
  { label: "Mozambique", dialCode: "+258" },
  { label: "Niue", dialCode: "+683" },
  { label: "Estonia", dialCode: "+372" },
  { label: "Italy", dialCode: "+39" },
  { label: "Malta", dialCode: "+356" },
  { label: "Slovenia", dialCode: "+386" },
  { label: "India", dialCode: "+91" },
  { label: "Peru", dialCode: "+51" },
  { label: "Burundi", dialCode: "+257" },
  { label: "Lithuania", dialCode: "+370" },
  { label: "United States", dialCode: "+1" },
  { label: "Honduras", dialCode: "+504" },
  { label: "Tonga", dialCode: "+676" },
  { label: "Saudi Arabia", dialCode: "+966" },
  { label: "Suriname", dialCode: "+597" },
  { label: "Qatar", dialCode: "+974" },
  { label: "Gibraltar", dialCode: "+350" },
  { label: "Northern Mariana Islands", dialCode: "+1670" },
  { label: "Mauritius", dialCode: "+230" },
  { label: "Barbados", dialCode: "+1246" },
  { label: "Réunion", dialCode: "+262" },
  { label: "British Indian Ocean Territory", dialCode: "+246" },
  { label: "Syria", dialCode: "+963" },
  { label: "Egypt", dialCode: "+20" },
  { label: "São Tomé and Príncipe", dialCode: "+239" },
  { label: "Kiribati", dialCode: "+686" },
  { label: "Timor-Leste", dialCode: "+670" },
  { label: "Lesotho", dialCode: "+266" },
  { label: "Solomon Islands", dialCode: "+677" },
  { label: "Libya", dialCode: "+218" },
  { label: "South Korea", dialCode: "+82" },
  { label: "Liechtenstein", dialCode: "+423" },
  { label: "Nicaragua", dialCode: "+505" },
  { label: "Ecuador", dialCode: "+593" },
  { label: "Maldives", dialCode: "+960" },
  { label: "Algeria", dialCode: "+213" },
  { label: "Kyrgyzstan", dialCode: "+996" },
  { label: "Finland", dialCode: "+358" },
  { label: "Kenya", dialCode: "+254" },
  { label: "Cuba", dialCode: "+53" },
  { label: "Montserrat", dialCode: "+1664" },
  { label: "Poland", dialCode: "+48" },
  { label: "Åland Islands", dialCode: "+35818" },
  { label: "Ethiopia", dialCode: "+251" },
  { label: "Togo", dialCode: "+228" },
  { label: "Bosnia and Herzegovina", dialCode: "+387" },
  { label: "Uruguay", dialCode: "+598" },
  { label: "Guam", dialCode: "+1671" },
  { label: "Cape Verde", dialCode: "+238" },
  { label: "Chad", dialCode: "+235" },
  { label: "Vatican City", dialCode: "+3906698,79" },
  { label: "Palau", dialCode: "+680" },
  { label: "Haiti", dialCode: "+509" },
  { label: "Yemen", dialCode: "+967" },
  { label: "Eswatini", dialCode: "+268" },
  { label: "Zimbabwe", dialCode: "+263" },
  { label: "Greece", dialCode: "+30" },
  { label: "Israel", dialCode: "+972" },
  { label: "Saint Martin", dialCode: "+590" },
  { label: "Antigua and Barbuda", dialCode: "+1268" },
  { label: "Cyprus", dialCode: "+357" },
  { label: "Sint Maarten", dialCode: "+1721" },
  { label: "Monaco", dialCode: "+377" },
  { label: "Fiji", dialCode: "+679" },
  { label: "Ukraine", dialCode: "+380" },
  { label: "Martinique", dialCode: "+596" },
  { label: "Hong Kong", dialCode: "+852" },
  { label: "Portugal", dialCode: "+351" },
  { label: "Bhutan", dialCode: "+975" },
  { label: "Nepal", dialCode: "+977" },
  { label: "France", dialCode: "+33" },
  { label: "Ireland", dialCode: "+353" },
  { label: "United Arab Emirates", dialCode: "+971" },
  { label: "Guernsey", dialCode: "+44" },
  { label: "Saint Lucia", dialCode: "+1758" },
  { label: "Dominican Republic", dialCode: "+1809,829,849" },
  { label: "Serbia", dialCode: "+381" },
  { label: "Botswana", dialCode: "+267" },
  { label: "Ivory Coast", dialCode: "+225" },
  { label: "Ghana", dialCode: "+233" },
  { label: "Comoros", dialCode: "+269" },
  { label: "Azerbaijan", dialCode: "+994" },
  { label: "United Kingdom", dialCode: "+44" },
  { label: "Central African Republic", dialCode: "+236" },
  { label: "Palestine", dialCode: "+970" },
  { label: "Caribbean Netherlands", dialCode: "+599" },
  { label: "Taiwan", dialCode: "+886" },
  { label: "Pitcairn Islands", dialCode: "+64" },
  { label: "San Marino", dialCode: "+378" },
  { label: "Svalbard and Jan Mayen", dialCode: "+4779" },
  { label: "Djibouti", dialCode: "+253" },
  { label: "Wallis and Futuna", dialCode: "+681" },
  { label: "Denmark", dialCode: "+45" },
  { label: "Papua New Guinea", dialCode: "+675" },
  { label: "Madagascar", dialCode: "+261" },
  { label: "Bouvet Island", dialCode: "+47" },
  { label: "Hungary", dialCode: "+36" },
  { label: "Tokelau", dialCode: "+690" },
  { label: "Trinidad and Tobago", dialCode: "+1868" },
  { label: "Gambia", dialCode: "+220" },
  { label: "Luxembourg", dialCode: "+352" },
  { label: "Cocos (Keeling) Islands", dialCode: "+61" },
  { label: "Republic of the Congo", dialCode: "+242" },
  { label: "Argentina", dialCode: "+54" },
  { label: "DR Congo", dialCode: "+243" },
  { label: "Greenland", dialCode: "+299" },
  { label: "Jordan", dialCode: "+962" },
  { label: "Belgium", dialCode: "+32" },
  { label: "Switzerland", dialCode: "+41" },
  { label: "Indonesia", dialCode: "+62" },
  { label: "Lebanon", dialCode: "+961" },
  { label: "Malaysia", dialCode: "+60" },
  { label: "Cayman Islands", dialCode: "+1345" },
  { label: "Slovakia", dialCode: "+421" },
  { label: "Armenia", dialCode: "+374" },
  { label: "Christmas Island", dialCode: "+61" },
  { label: "Mongolia", dialCode: "+976" },
  { label: "Saint Pierre and Miquelon", dialCode: "+508" },
  { label: "Japan", dialCode: "+81" },
  { label: "South Africa", dialCode: "+27" },
  { label: "Philippines", dialCode: "+63" },
  { label: "Micronesia", dialCode: "+691" },
  { label: "Germany", dialCode: "+49" },
  { label: "Latvia", dialCode: "+371" },
  { label: "Jamaica", dialCode: "+1876" },
  { label: "Macau", dialCode: "+853" },
  { label: "Nauru", dialCode: "+674" },
  { label: "Faroe Islands", dialCode: "+298" },
  { label: "Guyana", dialCode: "+592" },
  { label: "Burkina Faso", dialCode: "+226" },
  { label: "Sudan", dialCode: "+249" },
  { label: "Russia", dialCode: "+73,4,5,8,9" },
  { label: "Mayotte", dialCode: "+262" },
  { label: "Australia", dialCode: "+61" },
  { label: "Liberia", dialCode: "+231" },
  { label: "Mexico", dialCode: "+52" },
  { label: "Tunisia", dialCode: "+216" },
  { label: "Aruba", dialCode: "+297" },
  { label: "Kazakhstan", dialCode: "+76,7" },
  { label: "Oman", dialCode: "+968" },
  { label: "French Guiana", dialCode: "+594" },
  { label: "Niger", dialCode: "+227" },
  { label: "Turkmenistan", dialCode: "+993" },
  { label: "Sierra Leone", dialCode: "+232" },
  { label: "Samoa", dialCode: "+685" },
  { label: "Senegal", dialCode: "+221" },
  { label: "Georgia", dialCode: "+995" },
  { label: "Namibia", dialCode: "+264" },
  { label: "South Sudan", dialCode: "+211" },
  { label: "Thailand", dialCode: "+66" },
  { label: "Bahrain", dialCode: "+973" },
  { label: "Falkland Islands", dialCode: "+500" },
  { label: "Jersey", dialCode: "+44" },
  { label: "Vietnam", dialCode: "+84" },
  { label: "Guatemala", dialCode: "+502" },
  { label: "Moldova", dialCode: "+373" },
  { label: "North Macedonia", dialCode: "+389" },
  { label: "Uzbekistan", dialCode: "+998" },
  { label: "Romania", dialCode: "+40" },
  { label: "Uganda", dialCode: "+256" },
  { label: "El Salvador", dialCode: "+503" },
  { label: "Zambia", dialCode: "+260" },
  { label: "Gabon", dialCode: "+241" },
  { label: "Equatorial Guinea", dialCode: "+240" },
  { label: "Spain", dialCode: "+34" },
  { label: "Netherlands", dialCode: "+31" },
  { label: "British Virgin Islands", dialCode: "+1284" },
  { label: "Benin", dialCode: "+229" },
  { label: "Pakistan", dialCode: "+92" },
  { label: "Panama", dialCode: "+507" },
  { label: "Turks and Caicos Islands", dialCode: "+1649" },
  { label: "Angola", dialCode: "+244" },
  { label: "American Samoa", dialCode: "+1684" },
  { label: "Venezuela", dialCode: "+58" },
  { label: "Costa Rica", dialCode: "+506" },
  { label: "Puerto Rico", dialCode: "+1787,939" },
  { label: "Seychelles", dialCode: "+248" },
];
