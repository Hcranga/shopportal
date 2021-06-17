import PharmecyDashboardPage from "views/Dashboard/PharmecyDashboard.js";
import Dashboard from "@material-ui/icons/Dashboard";

const pharmecyDashboardRoutes = [
    {
      path: "/pharmecydashboard",
      name: "Dashboard",
      icon: Dashboard,
      component: PharmecyDashboardPage,
      layout: "/shopuser",
    }
  ];

  export default pharmecyDashboardRoutes;