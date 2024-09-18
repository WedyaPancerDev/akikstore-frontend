import loadable from "@loadable/component";
import { createBrowserRouter, Navigate } from "react-router-dom";

// ==> Layouts
import FullLayout from "layouts/full/FullLayout";
import BlankLayout from "layouts/blank/BlankLayout";
const UserLandingLayout = loadable(
  () => import("layouts/blank/UserLandingLayout")
);

import NotFound from "pages/404";
import Login from "pages/auth/login";
import Register from "pages/auth/register";

// ==> Admin
const Dashboard = loadable(() => import("pages/dashboard"));
const Pelanggan = loadable(() => import("pages/pelanggan"));
const Income = loadable(() => import("pages/income"));
const Produk = loadable(() => import("pages/produk"));
const Kategori = loadable(() => import("pages/category"));
const Transaksi = loadable(() => import("pages/transaksi"));
const SettingToko = loadable(() => import("pages/setting-toko"));

const Kupon = loadable(() => import("pages/kupon"));
const KuponTambah = loadable(() => import("pages/kupon/create"));

// ==> Pelanggan
const UserLanding = loadable(() => import("pages/customers/landing"));
const Transactions = loadable(() => import("pages/customers/transactions"));
const TransactionSuccess = loadable(
  () => import("pages/customers/transactions-success")
);

const CustomerDashboard = loadable(() => import("pages/customers/dashboard"));
const TransactionDetailDashboard = loadable(
  () => import("pages/customers/transactions-detail")
);

import Validate from "pages/validate";

import PublicRoute from "./middlewares/PublicRoute";
import AuthenticatedRoute from "./middlewares/AuthenticatedRoute";
import PaymentAuthenticated from "./middlewares/PaymentAuthenticated";

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
      { path: "list-kategori", element: <Kategori /> },
      { path: "pemasukan-dan-pengeluaran", element: <Income /> },

      { path: "setting-toko", element: <SettingToko /> },

      { path: "kupon", element: <Kupon /> },
      { path: "kupon/tambah", element: <KuponTambah /> },
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
      { index: true, element: <Navigate to="/pelanggan/dashboard" replace /> },
      { path: "dashboard", element: <CustomerDashboard /> },
      { path: "transaksi", element: <TransactionDetailDashboard /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <UserLandingLayout />,
    children: [
      {
        index: true,
        element: <UserLanding />,
      },
      {
        path: "/transaksi/pembayaran",
        element: (
          <PaymentAuthenticated>
            <Transactions />
          </PaymentAuthenticated>
        ),
      },
      {
        path: "/transaksi/berhasil/:transactionId",
        element: (
          <PaymentAuthenticated>
            <TransactionSuccess />
          </PaymentAuthenticated>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        path: "masuk",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "daftar",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default routers;
