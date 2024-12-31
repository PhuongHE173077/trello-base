import { Box } from '@mui/material'
import React from 'react'

export const BoardBar = () => {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.boardBarHeight,
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
      }}

    >
      Board Nav
    </Box>
  )
}
