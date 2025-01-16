import { Box, CircularProgress, Typography } from '@mui/material'

export const PageLoading = ({ caption }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw'
        ,
      }}>
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  )
}
