import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const DisabledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100]
}))

export default DisabledButton
