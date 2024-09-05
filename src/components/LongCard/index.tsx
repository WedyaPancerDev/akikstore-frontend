import type { FC } from 'react'

import {
  Box,
  Button,
  type Theme,
  Typography,
  useMediaQuery
} from '@mui/material'

interface ModuleSetting {
  position: number
  module_name: string
  test_codename: string
}

interface ILongCard {
  title: string
  moduleDiagnostic?: boolean
  moduleTestDiagnostic?: string
  moduleTest?: ModuleSetting[]
  method: () => void
  created_at: string
}

interface LongCardProps {
  data: ILongCard
  useIsDelete?: boolean
  style?: React.CSSProperties
}

const LongCard: FC<LongCardProps> = ({ data, useIsDelete, style = {} }) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const modules = data.moduleTest?.map((module) => module.module_name)

  return (
    <Box
      sx={{
        ...style,
        padding: '16px 18px',
        borderRadius: '8px',
        backgroundColor: '#FFF',
        border: '2px solid #D0D5DD',
        marginBottom: '12px',
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: mdUp ? '2fr 1fr' : '1fr'
      }}
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="body1" fontSize="18px" fontWeight={800}>
          {data.title}
        </Typography>
        <Box
          display="flex"
          paddingTop="14px"
          alignItems={mdUp ? 'center' : 'flex-start'}
          justifyContent="space-between"
          flexDirection={mdUp ? 'row' : 'column'}
          gap={mdUp ? '0px' : '8px'}
        >
          <Typography
            variant="body2"
            fontSize="16px"
            fontWeight={600}
            sx={{ color: '#98A2B3' }}
          >
            {data.moduleDiagnostic
              ? `Module Tes: ${data.moduleTestDiagnostic}`
              : `Alat Tes: ${modules?.join(', ')}`}
          </Typography>

          <Typography
            variant="body2"
            fontSize="16px"
            fontWeight={600}
            sx={{ color: '#98A2B3' }}
          >
            Dibuat: <span style={{ color: '#667085' }}>{data.created_at}</span>
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Button
          fullWidth={!mdUp}
          size="large"
          type="button"
          variant="outlined"
          color={useIsDelete ? 'error' : 'primary'}
          onClick={data.method}
          sx={{
            fontSize: '16px',
            fontWeight: 600
          }}
        >
          {useIsDelete ? 'Hapus' : 'Detail'}
        </Button>
      </Box>
    </Box>
  )
}

export default LongCard
