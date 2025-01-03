import AttachmentIcon from '@mui/icons-material/Attachment';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Tooltip, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const TrelloCard = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  });

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
      style={dndKitCardStyle} {...attributes} {...listeners}
      sx={{
        maxWidth: 345, overflow: 'unset',
        boxShadow: '0px 1px 1px rga(0, 0, 0, 0.2)',
        position: 'relative',
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {card?.description}
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


      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        p: '0px 8px 8px 8px',
      }}>
        <Tooltip title="Do Dang phuong "
        >
          <Avatar sx={{ width: 24, height: 24 }} src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-1-1.jpg '></Avatar>
        </Tooltip>
      </Box>
    </Card>
  )
}
