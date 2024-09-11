import {
  Button,
  Box,
  styled,
  Avatar,
  Divider,
  Typography,
  Menu,
  useMediaQuery,
  Theme,
} from "@mui/material";
import {
  IconCashRegister,
  IconLayoutDashboard,
  IconShoppingBag,
  IconShoppingCartPlus,
  IconTrash,
  IconUserEdit,
} from "@tabler/icons-react";

import Logo from "components/Logo";
import useCart from "hooks/useCart";
import useCookie from "hooks/useCookie";
import useLogout from "hooks/useLogout";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppState, useSelector } from "store/Store";
import { ValidateProps } from "types";
import { formatPrice } from "utils/helpers";

const LabelShop = styled("span")(() => ({
  position: "absolute",
  top: "-3px",
  right: "-3px",
  display: "inline-block",
  width: "20px",
  height: "20px",
  backgroundColor: "#9ca3af",
  color: "#fff",
  borderRadius: "50%",
  textAlign: "center",
  fontSize: "0.8rem",
  lineHeight: "20px",
  fontWeight: "bold",
  zIndex: 1,
}));

const HeaderLandingCustomer = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { cartProduct } = useSelector((state: AppState) => state.cart);

  const { handleLogout, isLoadingLogout } = useLogout();
  const { handleDecreaseCart, handleIncreaseCart } = useCart();
  const { getCurrentCookie, getFromLocalStorage } = useCookie();

  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [anchorElTwo, setAnchorElTwo] = useState<any | null>(null);

  const token = getCurrentCookie();
  const secureValue = getFromLocalStorage(
    "validate"
  ) as unknown as ValidateProps;

  const handleClick = (event: React.SyntheticEvent<EventTarget>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleRedirectTransaction = (): void => {
    setAnchorElTwo(null);
    setAnchorEl(null);

    if (!token && !secureValue) {
      const redirectTo = encodeURIComponent("/transaksi/pembayaran");
      toast.error('Kamu harus masuk terlebih dahulu');

      navigate(`/masuk?to=${redirectTo}`);
      return;
    }

    navigate("/transaksi/pembayaran");
  };

  const handleCalculate = useCallback(
    (currentPrice: number, currentTotal: number) => {
      return currentPrice * currentTotal;
    },
    []
  );

  const handleCalculateTotalMemo = useMemo(() => {
    return cartProduct?.products?.reduce(
      (acc, curr) => acc + curr.price_sell * curr.stock,
      0
    );
  }, [cartProduct?.products]);

  return (
    <Box
      component="nav"
      sx={{
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "2px solid #d1d5db",
        borderRadius: "14px",
        borderBottom: "5px solid #d4d4d8",
        borderRight: "5px solid #d4d4d8",
        mx: mdUp ? 0 : "1rem",
      }}
    >
      <Logo />
      <Box
        component="div"
        className="menu-item"
        sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        {location.pathname !== "/transaksi/pembayaran" && (
          <>
            <Button
              type="button"
              variant="text"
              color="inherit"
              sx={{ position: "relative", cursor: "pointer" }}
              onClick={(event) => setAnchorElTwo(event.currentTarget)}
            >
              <LabelShop>{cartProduct?.products?.length ?? 0}</LabelShop>
              <IconShoppingBag size={30} />
            </Button>

            <Menu
              id="msgs-menu"
              anchorEl={anchorElTwo}
              keepMounted
              open={Boolean(anchorElTwo)}
              onClose={() => {
                setAnchorElTwo(null);
              }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              sx={{
                "& .MuiMenu-paper": {
                  width: "280px",
                  p: 2,
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  marginBottom: "10px",
                  fontSize: "1rem",
                }}
              >
                Keranjang Belanja
              </Typography>

              <Divider />

              <Box display="block" marginTop="10px">
                {cartProduct?.products?.length > 0 ? (
                  cartProduct?.products?.map((product, index) => {
                    return (
                      <Box
                        key={product.product_code}
                        display="flex"
                        flexDirection="column"
                        sx={{
                          borderBottom: "1px solid #d1d5db",
                          borderRadius: 0,
                        }}
                      >
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{
                            padding: "10px 0",
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap="5px"
                            marginBottom="10px"
                          >
                            <Avatar
                              variant="rounded"
                              src={product?.images ?? ""}
                              alt={product?.title}
                            />
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "0.875rem",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "150px",
                                }}
                              >
                                {product.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "150px",
                                  color: "#9ca3af",
                                }}
                              >
                                {formatPrice(
                                  handleCalculate(
                                    product.price_sell,
                                    product.stock
                                  )
                                )}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, fontSize: "1rem" }}
                          >
                            <b>{product.stock}</b> x
                          </Typography>
                        </Box>

                        <Box
                          gap="0.5rem"
                          display="flex"
                          marginBottom="10px"
                          justifyContent="flex-end"
                        >
                          <Button
                            variant="text"
                            color="error"
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              display: "flex",
                              alignItems: "center",
                              paddingY: 0,
                              gap: "3px",
                            }}
                            onClick={() => {
                              handleDecreaseCart({
                                ...product,
                              });
                            }}
                          >
                            <IconTrash size={16} />
                            <span>Hapus</span>
                          </Button>

                          <Button
                            variant="text"
                            color="primary"
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              display: "flex",
                              alignItems: "center",
                              paddingY: 0,
                              gap: "3px",
                            }}
                            onClick={() => {
                              handleIncreaseCart({
                                ...product,
                              });
                            }}
                          >
                            <IconShoppingCartPlus size={16} />
                            <span>Tambah</span>
                          </Button>
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      marginBottom: "10px",
                      marginTop: "20px",
                      fontSize: "0.875rem",
                      textAlign: "center",
                      color: "#9ca3af",
                    }}
                  >
                    😭 Keranjang Kosong
                  </Typography>
                )}

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  marginTop="30px"
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    Total Belanja
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    {formatPrice(handleCalculateTotalMemo)}
                  </Typography>
                </Box>

                <Button
                  type="button"
                  color="inherit"
                  variant="outlined"
                  disabled={cartProduct?.products?.length < 1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 700,
                    gap: "5px",
                    width: "100%",
                    marginTop: "10px",
                    border: "2px solid #4b5563",
                    borderBottom: "5px solid #4b5563",
                    borderRight: "5px solid #4b5563",
                    "&:hover": {
                      backgroundColor: "#d1d5db",
                    },
                  }}
                  onClick={handleRedirectTransaction}
                >
                  <IconCashRegister />
                  <span>Lanjut ke Pembayaran</span>
                </Button>
              </Box>
            </Menu>
          </>
        )}

        {secureValue?.status === "signin" && token ? (
          <>
            <Button
              type="button"
              variant="text"
              color="inherit"
              sx={{ position: "relative" }}
              onClick={handleClick}
            >
              <Avatar
                src={"/assets/images/avatar/default-avatar.svg"}
                alt={"ProfileImg"}
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </Button>

            <Menu
              id="msgs-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              sx={{
                "& .MuiMenu-paper": {
                  width: "280px",
                  p: 2,
                },
              }}
            >
              <Box display="block">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "10px",
                    fontSize: "1rem",
                  }}
                >
                  <b>Hi!</b> Selamat Datang
                </Typography>

                <Button
                  to="/pelanggan/dashboard"
                  component={Link}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 700,
                    gap: "5px",
                    marginBottom: "0.5rem",
                    border: "2px solid #4b5563",
                    borderBottom: "5px solid #4b5563",
                    borderRight: "5px solid #4b5563",
                    "&:hover": {
                      backgroundColor: "#d1d5db",
                    },
                  }}
                  variant="outlined"
                  color="inherit"
                >
                  <IconLayoutDashboard />
                  <span>Pergi Ke Dashboard</span>
                </Button>

                <Button
                  to="/pelanggan/ubah-profile"
                  component={Link}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 700,
                    gap: "5px",
                    border: "2px solid #4b5563",
                    borderBottom: "5px solid #4b5563",
                    borderRight: "5px solid #4b5563",
                    "&:hover": {
                      backgroundColor: "#d1d5db",
                    },
                  }}
                  variant="outlined"
                  color="inherit"
                >
                  <IconUserEdit />
                  <span>Ubah Profile Kamu</span>
                </Button>
              </Box>

              <Divider />
              <Box mt={2}>
                <Button
                  fullWidth
                  type="button"
                  color="error"
                  variant="outlined"
                  onClick={() => handleLogout("/")}
                  disabled={isLoadingLogout}
                >
                  {isLoadingLogout ? "Loading..." : "Keluar Akun"}
                </Button>
              </Box>
            </Menu>
          </>
        ) : (
          <Link
            to="/masuk"
            style={{ fontWeight: 600, fontSize: "0.875rem", padding: "0 10px" }}
          >
            Masuk
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default HeaderLandingCustomer;
