import loadable from "@loadable/component";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Login = loadable(() => import("pages/auth/Login"));
const NotFound = loadable(() => import("pages/404"));

// ==> Admin
const Staff = loadable(() => import("pages/staff"));
const Dashboard = loadable(() => import("pages/dashboard"));
const Pelanggan = loadable(() => import("pages/pelanggan"));
const Income = loadable(() => import("pages/income"));
const Produk = loadable(() => import("pages/produk"));
const Transaksi = loadable(() => import("pages/transaksi"));
const SettingToko = loadable(() => import("pages/setting-toko"));

// ==> Pelanggan
const UserLanding = loadable(() => import("pages/customers/landing"));

// ==> Layouts
const FullLayout = loadable(() => import("layouts/full/FullLayout"));
const BlankLayout = loadable(() => import("layouts/blank/BlankLayout"));

import Validate from "pages/validate";

import PublicRoute from "./middlewares/PublicRoute";
import AuthenticatedRoute from "./middlewares/AuthenticatedRoute";

const routers = createBrowserRouter([
  {
    path: "/validate",
    children: [{ index: true, element: <Validate /> }],
  },
  {
    path: "/staff",
    element: (
      <AuthenticatedRoute>
        <FullLayout />
      </AuthenticatedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/staff/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "pelanggan-terdaftar", element: <Pelanggan /> },
      { path: "transaksi", element: <Transaksi /> },
      { path: "list-produk", element: <Produk /> },
      { path: "pemasukan-dan-pengeluaran", element: <Income /> },
      { path: "setting-toko", element: <SettingToko /> },
      { path: "manajemen-pengguna", element: <Staff /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/pelanggan",
    element: (
      <AuthenticatedRoute>
        <FullLayout />
      </AuthenticatedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <>PELANGGAN</> },
      { path: "transaksi", element: <>TRANSAKSI PELANGGAN</> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: (
      <>
        <BlankLayout />
      </>
    ),
    children: [
      { index: true, element: <UserLanding /> },
      { path: "masuk", element: <Login /> },
    ],
    errorElement: <NotFound />,
  },
]);

export default routers;
