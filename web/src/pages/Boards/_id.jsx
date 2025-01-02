import { Container } from '@mui/material';
import { AppBar } from '../../components/AppBar';
import { BoardBar } from './BoardBar/BoardBar';
import { BoardContent } from './BoardContent/BoardContent';
import { mocData } from '~/apis/MocData';
export const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar mocData={mocData?.board} />
      <BoardContent board={mocData?.board} />
    </Container>
  )
}
