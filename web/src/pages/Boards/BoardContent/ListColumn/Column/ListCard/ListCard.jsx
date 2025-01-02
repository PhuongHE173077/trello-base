import { Box } from '@mui/material';
import { TrelloCard } from './Card/Card';

export const ListCard = ({ cards }) => {

  return (
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
  )
}
