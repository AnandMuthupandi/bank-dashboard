import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import CustomersPageLayout from "../pages/customers/CustomersPageLayout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import Dashboard from "../pages/dashboard/Dashboard";

const appRoutes: RouteType[] = [
  {
    index: true,
    path: "/",
    element: <HomePage />,
    state: "home",
  },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  //   state: "dashboard",
  //   sidebarProps: {
  //     displayText: "Dashboard",
  //     icon: <DashboardOutlinedIcon />,
  //   },
  // },
  {
    path: "/customers",
    element: <CustomersPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Customers",
      icon: <PersonOutlineOutlinedIcon />,
    },
  },
];

export default appRoutes;
