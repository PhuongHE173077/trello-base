import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchBoardDetailsAPI } from '~/apis';
import { AppBar } from '../../components/AppBar';
import { BoardBar } from './BoardBar/BoardBar';
import { BoardContent } from './BoardContent/BoardContent';
export const Board = () => {
  const [board, setBoard] = useState(null)

  const boardId = '677aa7dfcc84b47c8bcc93ac'
  useEffect(() => {
    fetchBoardDetailsAPI(boardId)
      .then((boards) => {
        setBoard(boards);
      })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar mocData={board} />
      <BoardContent board={board} />
    </Container>
  )
}
