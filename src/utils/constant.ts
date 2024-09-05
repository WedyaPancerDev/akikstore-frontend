const protectedRouteAdmin = [
  "/staff",
  "/staff/dashboard",
  "/staff/pelanggan-terdaftar",
  "/staff/transaksi",
  "/staff/list-produk",
  "/staff/pemasukan-dan-pengeluaran",
  "/staff/setting-toko",
  "/staff/manajemen-pengguna",
];

const protectedRoutePelanggan = [
  "/pelanggan",
  "/pelanggan/dashboard",
  "/pelanggan/transaksi",
];

export const allowedRouteByRole = {
  admin: protectedRouteAdmin,
  employee: protectedRouteAdmin,
  customer: protectedRoutePelanggan,
};
