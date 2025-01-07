import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AddCardIcon from '@mui/icons-material/AddCard';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import { TrelloCard } from './Card/Card';
import { toast } from 'react-toastify';


export const ListCard = ({ cards }) => {
  const [open, setOpen] = useState(false)
  const [titleCard, setTitleCard] = useState('')

  const toggleOpenForm = () => { setOpen(!open) }

  const handleAddCard = () => {
    if (!titleCard) {
      toast.error('Card title is empty !', {
        position: 'bottom-left'
      })
    }
  }
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: '0 5px 5px 5px',
          m: '0 5px',
          minHeight: '5px',
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight})`
        }}
      >
        {cards?.map((card, index) => <TrelloCard key={index} card={card} />)}

      </Box>
      {open ?
        <Card

          sx={{
            maxWidth: 345,
            overflow: 'unset',
            boxShadow: '0px 1px 1px rga(0, 0, 0, 0.2)',

          }}>



          <CardContent
            sx={{
              p: 1.5,
              '&:last-child': {
                pb: 1.5,
              }
            }}
          >
            <TextField
              autoFocus
              label='Card name'
              fullWidth
              variant="outlined"
              sx={{
                '& label': { color: "#6ab04c " },
                '& label.Mui-focused': { color: '#6ab04c ' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#badc58' },
                  '&: hover fieldset': { borderColor: '#badc58' },
                  '&.Mui-focused fieldset': { borderColor: '#badc58' },
                }
              }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', gap: '5px' }}>
              <Button
                startIcon={<AddCardIcon />}
                sx={{
                  color: 'primary.dark',
                  bgcolor: '#dff9fb',
                  '&:hover ': { bgcolor: "#c7ecee" },

                }}
                onClick={handleAddCard}
                variant='contained'
              >
                Add a card
              </Button>
              <Tooltip title='close add columns' onClick={toggleOpenForm}>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>

          </CardContent>


        </Card>
        : <Box
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
            onClick={toggleOpenForm}
          >
            Add a card
          </Button>
        </Box>}

    </SortableContext>

  )
}
