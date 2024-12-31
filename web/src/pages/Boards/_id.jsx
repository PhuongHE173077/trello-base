import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { ModalSelect } from '../../components/ModeSelect';
import { AppBar } from '../../components/AppBar';
import { BoardBar } from './BoardBar';
import { BoardContent } from './BoardContent';
export const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}
