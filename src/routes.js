/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';
import TwoWheelerIcon from '@material-ui/icons/TwoWheeler';
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Orders from "views/Orders/Orders.js";
import AddItem from "views/AddItem/AddItem.js";
import Earnings from "views/Earnings/Earnings.js";
import Account from "views/Account/Account.js";
import ReadyToDeliver from "views/ReadyToDeliver/ReadyToDeliver.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  
  {
    path: "/additem",
    name: "Add Items",
    icon: LibraryBooks,
    component: AddItem,
    layout: "/shopuser",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: TwoWheelerIcon,
    component: Orders,
    layout: "/shopuser",
  },
  
  {
    path: "/earnings",
    name: "Earnings",
    icon: AttachMoneyIcon,
    component: Earnings,
    layout: "/shopuser",
  },

];

export default dashboardRoutes;
