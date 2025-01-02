import { Box } from '@mui/material';
import { ListColumn } from './ListColumn/ListColumn';
import { mapOrder } from '~/Utils/sortArrayByotherArray';
export const BoardContent = ({ board }) => {
  const orderColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#66FFFF'),
      }}
    >
      <ListColumn column={orderColumns} />
    </Box >
  )
}
