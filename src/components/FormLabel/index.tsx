import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

const CustomFormLabel = styled((props: any) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '14px',
  display: 'block',
  color: '#6b7280 !important'
}))

export default CustomFormLabel
