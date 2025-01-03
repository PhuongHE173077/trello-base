import { Box } from '@mui/material';
import { TrelloCard } from './Card/Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const ListCard = ({ cards }) => {

  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: '0 5px 5px 5px',
          m: '0 5px',
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight})`
        }}
      >
        {cards?.map((card, index) => <TrelloCard key={index} card={card} />)}

      </Box>
    </SortableContext>

  )
}
