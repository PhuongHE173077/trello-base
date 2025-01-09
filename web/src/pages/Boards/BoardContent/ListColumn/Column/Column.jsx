import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography } from '@mui/material';
import MoreOption from '~/pages/Boards/BoardBar/MoreOption/MoreOption';
import { mapOrder } from '~/Utils/sortArrayByOtherArray';
import { ListCard } from './ListCard/ListCard';

export const Column = ({ column, createNewCard }) => {
  const cardOrder = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  });

  const dndKitColumnStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined,

  };

  return (
    <div ref={setNodeRef}
      style={dndKitColumnStyle} {...attributes} >
      <Box
        {...listeners}
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


        <ListCard cards={cardOrder} createNewCard={createNewCard} columnId={column._id} />



      </Box>
    </div>

  )
}
