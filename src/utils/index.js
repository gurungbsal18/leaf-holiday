import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HikingIcon from "@mui/icons-material/Hiking";
import TerrainIcon from "@mui/icons-material/Terrain";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import RouteIcon from '@mui/icons-material/Route';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CollectionsIcon from '@mui/icons-material/Collections';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export const navItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "trekking",
    label: "Trekking",
    path: "/trekking",
  },
  {
    id: "kailashTours",
    label: "Kailash Tours",
    path: "/package/kjfdf",
  },
  {
    id: "outbound",
    label: "Outbound",
    path: "/outbound",
  },
  {
    id: "activities",
    label: "Activities",
    path: "/activities",
  },
  {
    id: "dayTour",
    label: "Day Tour",
    path: "/day-tour",
  },
  {
    id: "nepalTour",
    label: "Nepal Tour",
    path: "/nepal-tour",
  },
  {
    id: "admin-dashboard",
    label: "Admin View",
    path: "/admin",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
  },
];
export const adminNavItems = [
  {
    id: "dashboard",
    icon: <DashboardIcon />,
    label: "Dashboard",
    path: "/admin",
  },
  {
    id: "pages",
    icon: <AutoStoriesIcon />,
    label: "Pages",
    path: "/admin/pages",
  },
  {
    id: "packages",
    icon: <AirplanemodeActiveIcon />,
    label: "Packages",
    path: "/admin/packages",
  },
  {
    id: "destination",
    icon: <LocationOnIcon />,
    label: "Destination",
    path: "/admin/destination",
  },
  {
    id: "regions",
    icon: <MapIcon />,
    label: "Regions",
    path: "/admin/regions",
  },
  {
    id: "testimonials",
    icon: <RateReviewIcon />,
    label: "Testimonials",
    path: "/admin/testimonials",
  },
  {
    id: "blogs",
    icon: <ArticleIcon />,
    label: "Blogs",
    path: "/admin/blogs",
  },
  {
    id: "settings",
    icon: <SettingsIcon />,
    label: "Settings",
    path: "/admin/settings",
  },
  {
    id: "forms",
    icon: <AssignmentIcon />,
    label: "Forms",
    path: "/admin/forms",
  },
  {
    id: "profile",
    icon: <AccountCircleIcon />,
    label: "Profile",
    path: "/admin/profile",
  },
  {
    id: "logout",
    icon: <LogoutIcon />,
    label: "Log Out",
    path: "/",
  },
];
export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "Admin",
      },
      {
        id: "customer",
        label: "Customer",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];
export const packageNavItems = [
  {
    id: "overview",
    icon: <RemoveRedEyeIcon/>,
    label: "Overview",
    path: "#overview",
  },
  {
    id: "itinerary",
    icon: <RouteIcon/>,
    label: "Itinerary",
    path: "#itinerary",
  },
  {
    id: "map",
    icon:<MapIcon/>,
    label: "Map",
    path: "#map",
  },

  {
    id: "costInclueExclude",
    icon:<CurrencyExchangeIcon/>,
    label: "Cost Include/Exclude",
    path: "#costInclueExclude",
  },
  {
    id: "gallery",
    icon:<CollectionsIcon/>,
    label: "Gallery",
    path: "#gallery",
  },
  {
    id: "faq",
    icon:<ContactSupportIcon/>,
    label: "FAQ",
    path: "#faq",
  },

  {
    id: "review",
    icon:<RateReviewIcon/>,
    label: "Review",
    path: "#review",
  },
];

export const pkgDetail = {
  headerImage: "/images/km.png",
  headerTitle: "Kailash Overland Tour - 13 Days",
  packageInformation: [
    {
      id: "duration",
      icon: <CalendarMonthIcon />,
      label: "Duration",
      information: "14 Days",
    },
    {
      id: "difficulty",
      icon: <HikingIcon />,
      label: "Difficulty",
      information: "Strenuous",
    },
    {
      id: "weather",
      icon: <ThunderstormIcon />,
      label: "Weather",
      information: "March-May & Sep-Nav",
    },
    {
      id: "altitude",
      icon: <TerrainIcon />,
      label: "Max Altitude",
      information: "5545m",
    },
  ],
  overviewTitle: "Experience the Allure of the Mount Kailash Overland Tour",
  overviewContent:
    "Leaf Holidays and Expedition provides you with the best experience. This is an extraordinary adventure that deals with spirituality, the beauty of Kailash, and the culture as well. The journey to Mount Kailash and Lake Manasarovar located in Tibet, China is quite amazing. It’s not just an expedition but has a spiritual value. The Mount Kailash Overland Tour is a typical adventure and makes your soul amazing. Mostly the Pilgrims visit Mount Kailash and Lake Manasarovar as it is considered one of the Holiest Peaks in Hinduism and Buddhism.It is believed that Mount Kailash is the abode of Lord Shiva and Lake Manasarovar is located nearer to his sacred lake and is believed to have a holy property. Yet with every step, you’ll also be moving closer to the spiritual essence of Mount Kailash. You may join us as we provide you with the best experience while traveling with us.",
  itinerary: [
    {
      id: 1,
      title: "Day 1: Arrival in Kathmandu (1400m)",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum rutrum at. Mauris ultricies et mauris convallis consectetur. Cras pulvinar dolor eget felis vulputate, sit amet vestibulum erat ultricies. Ut at velit quam. Mauris porttitor suscipit ipsum sit amet dapibus. Aliquam lobortis vulputate nunc. Fusce pretium ultricies urna sed consectetur. Praesent ut egestas ex. Morbi eu lacinia enim. Nullam id erat elementum, porta eros fringilla, rutrum enim. Pellentesque iaculis felis ac malesuada vestibulum. Etiam facilisis, metus sed pretium tristique, nibh felis pretium arcu, at vehicula enim tortor sit amet urna.",
    },
    {
      id: 2,
      title: "Day 2: Kathmandu to Lukla by flight",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum rutrum at. Mauris ultricies et mauris convallis consectetur. Cras pulvinar dolor eget felis vulputate, sit amet vestibulum erat ultricies. Ut at velit quam. Mauris porttitor suscipit ipsum sit amet dapibus. Aliquam lobortis vulputate nunc. Fusce pretium ultricies urna sed consectetur. Praesent ut egestas ex. Morbi eu lacinia enim. Nullam id erat elementum, porta eros fringilla, rutrum enim. Pellentesque iaculis felis ac malesuada vestibulum. Etiam facilisis, metus sed pretium tristique, nibh felis pretium arcu, at vehicula enim tortor sit amet urna.",
    },
    {
      id: 3,
      title: "Day 3: Lukla to Namche Bazaar",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum rutrum at. Mauris ultricies et mauris convallis consectetur. Cras pulvinar dolor eget felis vulputate, sit amet vestibulum erat ultricies. Ut at velit quam. Mauris porttitor suscipit ipsum sit amet dapibus. Aliquam lobortis vulputate nunc. Fusce pretium ultricies urna sed consectetur. Praesent ut egestas ex. Morbi eu lacinia enim. Nullam id erat elementum, porta eros fringilla, rutrum enim. Pellentesque iaculis felis ac malesuada vestibulum. Etiam facilisis, metus sed pretium tristique, nibh felis pretium arcu, at vehicula enim tortor sit amet urna.",
    },
    {
      id: 4,
      title: "Day 4: Namche Bazaar to Phakding",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum rutrum at. Mauris ultricies et mauris convallis consectetur. Cras pulvinar dolor eget felis vulputate, sit amet vestibulum erat ultricies. Ut at velit quam. Mauris porttitor suscipit ipsum sit amet dapibus. Aliquam lobortis vulputate nunc. Fusce pretium ultricies urna sed consectetur. Praesent ut egestas ex. Morbi eu lacinia enim. Nullam id erat elementum, porta eros fringilla, rutrum enim. Pellentesque iaculis felis ac malesuada vestibulum. Etiam facilisis, metus sed pretium tristique, nibh felis pretium arcu, at vehicula enim tortor sit amet urna.",
    },
    {
      id: 5,
      title: "Day 5: Phakding to Tengboche",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum rutrum at. Mauris ultricies et mauris convallis consectetur. Cras pulvinar dolor eget felis vulputate, sit amet vestibulum erat ultricies. Ut at velit quam. Mauris porttitor suscipit ipsum sit amet dapibus. Aliquam lobortis vulputate nunc. Fusce pretium ultricies urna sed consectetur. Praesent ut egestas ex. Morbi eu lacinia enim. Nullam id erat elementum, porta eros fringilla, rutrum enim. Pellentesque iaculis felis ac malesuada vestibulum. Etiam facilisis, metus sed pretium tristique, nibh felis pretium arcu, at vehicula enim tortor sit amet urna.",
    },
  ],
  costInclude: [
    {
      id: 1,
      content:
        "1 Cost Include Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
    {
      id: 2,
      content:
        "2 Cost Include Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
    {
      id: 3,
      content:
        "3 Cost Include Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
    {
      id: 4,
      content:
        "4 Cost Include Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
    {
      id: 5,
      content:
        "5 Cost Include Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
  ],
  costExclude: [
    {
      id: 1,
      content:
        "1 Cost Exclude Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
    {
      id: 2,
      content:
        "2 Cost Exclude Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
    {
      id: 3,
      content:
        "3 Cost Exclude Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
    {
      id: 4,
      content:
        "4 Cost Exclude Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
    {
      id: 5,
      content:
        "5 Cost Exclude Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra justo neque, eget accumsan ipsum",
    },
  ],
  mapImage: "/images/map.png",
};
