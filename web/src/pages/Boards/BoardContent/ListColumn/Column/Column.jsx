import AddCardIcon from '@mui/icons-material/AddCard';
import { Box, Button, Typography } from '@mui/material';
import MoreOption from '~/pages/Boards/BoardBar/MoreOption/MoreOption';
import { ListCard } from './ListCard/ListCard';
import { mapOrder } from '~/Utils/sortArrayByOtherArray';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Column = ({ column }) => {
  const cardOrder = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({
    id: column._id,
    data: { ...column }
  });

  const dndKitColumnStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (

    <Box
      ref={setNodeRef}
      style={dndKitColumnStyle} {...attributes} {...listeners}
      sx={{
        minWidth: '272px',
        maxWidth: '272px',
        ml: 1,
        mt: 1,
        height: 'fit-content',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
        borderRadius: 2,
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,

      }}>

      {/* box column header */}
      <Box
        sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          display: 'flex',
          alignItems: 'center',
          ml: 1,
          justifyContent: 'space-between'
        }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: "1rem"
          }}
        >{column?.title}</Typography>
        <MoreOption />
      </Box>

      {/* Box list card  */}


      <ListCard cards={cardOrder} />


      <Box
        sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2
        }}
      >
        <Button
          startIcon={<AddCardIcon />}
          sx={{
            color: 'primary.dark'
          }}
        >
          Add a card
        </Button>
      </Box>

    </Box>
  )
}
