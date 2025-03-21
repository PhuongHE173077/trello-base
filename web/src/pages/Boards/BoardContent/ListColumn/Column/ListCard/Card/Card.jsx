import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DescriptionIcon from '@mui/icons-material/Description';
import { Avatar, Box, Button, Tooltip, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch } from 'react-redux';
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice';

export const TrelloCard = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  });

  const dispath = useDispatch()

  const dndKitCardStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #3498db' : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      onClick={() => dispath(updateCurrentActiveCard(card))}
      style={dndKitCardStyle} {...attributes} {...listeners}
      sx={{
        maxWidth: 345,
        overflow: 'unset',
        boxShadow: '0px 1px 1px rga(0, 0, 0, 0.2)',
        opacity: card.FE_PlaceholderCard ? '0' : '1',
        minWidth: card.FE_PlaceholderCard ? '280px' : 'unset',
        pointerEvents: card.FE_PlaceholderCard ? 'none' : 'unset',
        position: card.FE_PlaceholderCard ? 'fixed' : 'unset',
        cursor: 'pointer'
      }}>

      {card.cover ? (
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title="green iguana"
        />
      ) : null}

      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            pb: 1.5,
          }
        }}
      >
        <Typography gutterBottom variant="h7" component="div">
          {card?.title}
        </Typography>

      </CardContent>


      {card?.description && card?.attachments?.length > 0 && (
        <CardActions>
          {
            card?.description && (
              <Tooltip title="Description" sx={{
                color: 'primary.dark',
                cursor: 'pointer',
                fontSize: '20px'
              }}>
                <DescriptionIcon />
              </Tooltip>
            )
          }

          {card?.attachments?.length > 0 && (
            <Tooltip title="Attachment" sx={{
              color: 'primary.dark',
              cursor: 'pointer',
              fontSize: '20px'
            }}>
              <Button startIcon={<AttachmentIcon />}>
                <Typography>
                  {card?.attachments?.length}
                </Typography>
              </Button>
            </Tooltip>
          )}

        </CardActions>
      )}


      {/* <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        p: '0px 8px 8px 8px',
      }}>
        <Tooltip title="Do Dang phuong "
        >
          <Avatar sx={{ width: 24, height: 24 }} src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-1-1.jpg '></Avatar>
        </Tooltip>
      </Box> */}
    </Card>
  )
}