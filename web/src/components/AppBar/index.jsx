import { Box } from '@mui/material'
import React from 'react'
import { ModalSelect } from '../ModeSelect'

export const AppBar = () => {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.appBarHeight,
        backgroundColor: 'primary.light',
        display: 'flex',
        alignItems: 'center',
      }}
    >

      <ModalSelect />
    </Box>
  )
}
