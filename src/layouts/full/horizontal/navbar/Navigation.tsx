import {
  useMediaQuery,
  Box,
  Drawer,
  Container,
  type Theme
} from '@mui/material'
import NavListing from './NavListing/NavListing'
import Logo from 'components/Logo'
import { useSelector, useDispatch, type AppState } from 'store/Store'
import { setToggleMobileSidebar } from 'store/customizer/CustomizerSlice'
import SidebarItems from '../../vertical/sidebar/SidebarItems'

const Navigation = (): JSX.Element => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const customizer = useSelector((state: AppState) => state.customizer)
  const dispatch = useDispatch()

  if (lgUp) {
    return (
      <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} py={2}>
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important'
          }}
        >
          <NavListing />
        </Container>
      </Box>
    )
  }

  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() =>
        dispatch(setToggleMobileSidebar(!customizer.isMobileSidebar))
      }
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          border: '0 !important',
          boxShadow: (theme) => theme.shadows[8]
        }
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  )
}

export default Navigation
