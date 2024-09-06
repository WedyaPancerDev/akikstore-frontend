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

export const country = [
  {
    label: "Indonesia",
    value: "indonesia",
  },
  {
    label: "Malaysia",
    value: "malaysia",
  },
  {
    label: "Other",
    value: "other",
  },
];

const rawCity = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Semarang",
  "Yogyakarta",
  "Bali",
  "Lombok",
  "Makassar",
  "Medan",
  "Padang",
  "Palembang",
  "Pekanbaru",
  "Pontianak",
  "Samarinda",
  "Banjarmasin",
  "Manado",
  "Ambon",
  "Jayapura",
  "Batam",
  "Bogor",
  "Bekasi",
  "Depok",
  "Tangerang",
  "Bekasi",
  "Tangerang",
  "Bogor",
  "Cirebon",
  "Purwokerto",
  "Pekalongan",
  "Tegal",
  "Salatiga",
  "Magelang",
  "Kudus",
  "Rembang",
  "Blora",
  "Kendal",
  "Demak",
  "Pati",
  "Jepara",
  "Brebes",
  "Pemalang",
  "Purbalingga",
  "Wonosobo",
  "Kebumen",
  "Banjar",
  "Cilacap",
  "Banyumas",
  "Tasikmalaya",
  "Garut",
  "Ciamis",
  "Pangandaran",
  "Cianjur",
  "Sukabumi",
  "Purwakarta",
  "Karawang",
  "Subang",
  "Indramayu",
  "Cirebon",
  "Kuningan",
  "Majalengka",
  "LAINNYA",
];

export const city = rawCity.map((item) => ({
  label: item,
  value: item?.toLowerCase(),
}));
