import { nanoid as uniqueId } from "nanoid";
import {
  IconBuildingStore,
  IconLayoutDashboard,
  IconNotes,
  IconShoppingCart,
  IconUsers,
  IconCashRegister,
  IconGiftCard,
  IconCategory,
} from "@tabler/icons-react";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

export const AdminMenuItems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(10),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/staff/dashboard",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "Transaksi",
    icon: IconCashRegister,
    href: "/staff/transaksi",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "List Produk",
    icon: IconShoppingCart,
    href: "/staff/list-produk",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "List Kategori",
    icon: IconCategory,
    href: "/staff/list-kategori",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "Pemasukan & Pengeluaran",
    icon: IconNotes,
    href: "/staff/pemasukan-dan-pengeluaran",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "Kupon",
    icon: IconGiftCard,
    href: "/staff/kupon",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "Setting Toko",
    icon: IconBuildingStore,
    href: "/staff/setting-toko",
    chipColor: "secondary",
  },
  {
    navlabel: true,
    subheader: "Applications",
  },
  {
    id: uniqueId(10),
    title: "Pelanggan Terdaftar",
    icon: IconUsers,
    href: "/staff/pelanggan-terdaftar",
    chipColor: "secondary",
  },
];

export const CustomerMenuItems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(10),
    title: "Dashboard Pelanggan",
    icon: IconLayoutDashboard,
    href: "/pelanggan/dashboard",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "Riwayat Transaksi",
    icon: IconCashRegister,
    href: "/pelanggan/transaksi",
    chipColor: "secondary",
  },
];
