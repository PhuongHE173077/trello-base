import { Box } from '@mui/material'
import React from 'react'

export const BoardContent = () => {
  return (
    <Box
      sx={{
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        backgroundColor: 'primary.light',
        display: 'flex',
        alignItems: 'center',
      }}
    >

      Bard Content
    </Box>
  )
}
