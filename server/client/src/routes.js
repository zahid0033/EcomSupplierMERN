/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// admin auth
import authAdminComponent from "admin/adminServices/authAdminComponent";
// ####
import Dashboard from "admin/views/Dashboard.jsx";
import Notifications from "admin/views/Notifications.jsx";
import Icons from "admin/views/Icons.jsx";
import Typography from "admin/views/Typography.jsx";
import TableList from "admin/views/TableList.jsx";
import Maps from "admin/views/Maps.jsx";
import Upgrade from "admin/views/Upgrade.jsx";
import UserPage from "admin/views/UserPage.jsx";
import CreateAdmin from "./admin/views/CreateAdmin";
import ManageAdmins from "./admin/views/ManageAdmins";
import AllSuppliers from "./admin/views/AllSuppliers";
import ViewSupplierDetails from "./admin/views/ViewSupplierDetails";
import AdminLogin from "./admin/views/AdminLogin";
import ManageCategories from "./admin/views/ManageCategories";
import ManageBanners from "./admin/views/ManageBanners";
import CreateSuperAdmin from "./admin/views/CreateSuperAdmin";
import AdminProfile from "./admin/views/AdminProfile";
import ManageProducts from "./admin/views/ManageProducts";
import ViewProductsDetails from "./admin/views/ViewProductsDetails";
import ManageAdvertise from "./admin/views/ManageAdvertise";
// user
import Home from "./user/views/home";
import About from "./user/views/about";
import CategoryProductShow from "./user/views/categoryProductsShow";
import SubCategoryProductsShow from "./user/views/subCategoryProductsShow";
import ProductDetails from "./user/views/productDetails";
import ViewSupplier from "./user/views/viewSupplier";
import Test from "./user/views/test";
import SupplierSignup from "./user/views/supplierSignup";
import SupplierProfile from "./user/views/supplierProfile";
import SupplierSignin from "./user/views/supplierSignin";
import SupplierEmployee from "./user/views/supplierEmployee";
import SupplierProduct from "./user/views/supplierProduct";
import SearchProductOrSupplier from "./user/views/searchProductOrSupplier";
import ForgetPassword from "./user/views/forgetPassword";
import ResetPassword from "./user/views/resetPassword";
import EmailVerify from "./user/views/emailVerify";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: authAdminComponent(Dashboard),
    layout: "/admin",
    permission : ["superAdmin","Moderator"],
    sidebar: true
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: Icons,
    layout: "/admin",
    permission : ["superAdmin","Moderator"],
    sidebar: false
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "location_map-big",
    component: Maps,
    layout: "/admin",
    permission : ["superAdmin"],
    sidebar: false
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: Notifications,
    layout: "/admin",
    permission : ["superAdmin","Moderator"],
    sidebar: false
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: authAdminComponent(UserPage),
    layout: "/admin",
    permission : ["superAdmin"],
    sidebar: false
  },
  {
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: authAdminComponent(TableList),
    layout: "/admin",
    permission : ["superAdmin"],
    sidebar: false
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: authAdminComponent(Typography),
    layout: "/admin",
    permission : ["superAdmin"],
    sidebar: false
  },
  {
    path: "/createAdmin",
    name: "Create Admin",
    icon: "design-2_ruler-pencil",
    component: authAdminComponent(CreateAdmin),
    layout: "/admin",
    permission : ["superAdmin"],
    sidebar: false
  },
  {
    path: "/manageAdmins",
    name: "Manage Admins",
    icon: "clothes_tie-bow",
    component: authAdminComponent(ManageAdmins),
    layout: "/admin",
    permission : ["superAdmin"],
    sidebar: true
  },
  {
    path: "/allSuppliers",
    name: "All Suppliers",
    icon: "business_bank",
    component: authAdminComponent(AllSuppliers),
    layout: "/admin",
    permission : ["superAdmin","Moderator"],
    sidebar: true
  },
  {
    path: "/manageProducts",
    name: "All Products",
    icon: "design_app",
    component: authAdminComponent(ManageProducts),
    layout: "/admin",
    permission : ["superAdmin","Moderator","ProductAnalyst"],
    sidebar: true
  },
  {
    path: "/viewProductDetails/:productId",
    name: "Product Details",
    icon: "design-2_ruler-pencil",
    component: authAdminComponent(ViewProductsDetails),
    layout: "/admin",
    permission : ["superAdmin","Moderator","ProductAnalyst"],
    sidebar: false
  },
  {
    path: "/viewSupplierDetails/:supplierId",
    name: "Supplier Details",
    icon: "design-2_ruler-pencil",
    component: authAdminComponent(ViewSupplierDetails),
    layout: "/admin",
    permission : ["superAdmin","Moderator","ProductAnalyst"],
    sidebar: false
  },
  {
    path: "/manageBanners",
    name: "Manage Banners",
    icon: "location_map-big",
    component: authAdminComponent(ManageBanners),
    layout: "/admin",
    permission : ["superAdmin","Advertiser"],
    sidebar: true
  },
  {
    path: "/manageCategories",
    name: "Manage Categories",
    icon: "design_bullet-list-67",
    component: authAdminComponent(ManageCategories),
    layout: "/admin",
    permission : ["superAdmin","ProductAnalyst"],
    sidebar: true
  },
  {
    path: "/manageAdvertise",
    name: "Manage Advertise",
    icon: "files_single-copy-04",
    component: authAdminComponent(ManageAdvertise),
    layout: "/admin",
    permission : ["superAdmin","Advertiser"],
    sidebar: true
  },
  {
    path: "/login",
    name: "Login",
    icon: "design-2_ruler-pencil",
    component: AdminLogin,
    layout: "/admin",
    permission : ["All"],
    sidebar: true
  },
  {
    path: "/createSuperAdmin",
    name: "Create Super Admin",
    icon: "design-2_ruler-pencil",
    component: CreateSuperAdmin,
    layout: "/admin",
    permission : ["All"],
    sidebar: true
  },
  {
    path: "/profile",
    name: "Admin Profile",
    icon: "design-2_ruler-pencil",
    component: authAdminComponent(AdminProfile),
    layout: "/admin",
    permission : ["superAdmin","Moderator"],
    sidebar: false
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "objects_spaceship",
    component: Upgrade,
    layout: "/admin",
    permission : ["superAdmin"],
    sidebar: false
  }
];

export const userRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "pe-7s-bell",
    component: Home,
    layout: "/user"
  },
  {
    path: "/about",
    name: "About",
    icon: "pe-7s-bell",
    component: About,
    layout: "/user"
  },
  {
    path: "/mainCategory/:categoryId",
    name: "Main Category",
    icon: "pe-7s-bell",
    component: CategoryProductShow,
    layout: "/user"
  },
  {
    path: "/subCategory/:categoryId",
    name: "Sub Category",
    icon: "pe-7s-bell",
    component: SubCategoryProductsShow,
    layout: "/user"
  },
  {
    path: "/productDetails/:productId",
    name: "Product Details",
    icon: "pe-7s-bell",
    component: ProductDetails,
    layout: "/user"
  },
  {
    path: "/viewSupplier/:supplierId",
    name: "View Supplier",
    icon: "pe-7s-bell",
    component: ViewSupplier,
    layout: "/user"
  },
  {
    path: "/supplier/signin",
    name: "Supplier Signin",
    icon: "pe-7s-bell",
    component: SupplierSignin,
    layout: "/user"
  },
  {
    path: "/supplier/signup",
    name: "Supplier SignUp",
    icon: "pe-7s-bell",
    component: SupplierSignup,
    layout: "/user"
  },
  {
    path: "/emailVerify/:token",
    name: "Email Verify",
    icon: "pe-7s-bell",
    component: EmailVerify,
    layout: "/user"
  },
  {
    path: "/supplier/profile",
    name: "Supplier Profile",
    icon: "pe-7s-bell",
    component: SupplierProfile,
    layout: "/user"
  },
  {
    path: "/supplier/employee",
    name: "Supplier Employee",
    icon: "pe-7s-bell",
    component: SupplierEmployee,
    layout: "/user"
  },
  {
    path: "/supplier/product",
    name: "Supplier Product",
    icon: "pe-7s-bell",
    component: SupplierProduct,
    layout: "/user"
  },
  {
    path: "/search",
    name: "Product or Supplier Search",
    icon: "pe-7s-bell",
    component: SearchProductOrSupplier,
    layout: "/user"
  },
  {
    path: "/forgetPassword",
    name: "Forget Password",
    icon: "pe-7s-bell",
    component: ForgetPassword,
    layout: "/user"
  },
  {
    path: "/resetPassword/:token",
    name: "Reset Password",
    icon: "pe-7s-bell",
    component: ResetPassword,
    layout: "/user"
  },
  {
    path: "/test",
    name: "test",
    icon: "pe-7s-bell",
    component: Test,
    layout: "/user"
  }
];

export default dashRoutes;
