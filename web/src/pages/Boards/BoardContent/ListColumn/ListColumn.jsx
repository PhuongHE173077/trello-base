import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Column } from './Column/Column';
import { toast } from 'react-toastify';
export const ListColumn = ({ column }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [titleNewColumn, setTitleNewColumn] = useState('')
  const toggleForm = () => { setOpenNewColumnForm(!openNewColumnForm) }

  const addColumn = () => {
    if (!titleNewColumn) {
      toast.error('NOT EMPTY')
      return
    }
    toggleForm()
    setTitleNewColumn('')
  }

  return (
    <SortableContext items={column?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}>
        {column?.map((col, index) => (
          <Column key={index} column={col} />
        ))}

        {!openNewColumnForm ? (
          <Box
            sx={{
              bgcolor: '#ffffff3d',
              height: 'fit-content',
              borderRadius: 2,
              m: 1,
              minWidth: '200px'

            }}
          >
            <Button
              onClick={toggleForm}
              startIcon={<AddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start'
              }}
            >Add Column</Button>
          </Box>
        ) : (
          <Box
            sx={{
              bgcolor: '#ffffff3d',
              height: 'fit-content',
              borderRadius: 2,
              m: 1,
              minWidth: '200px'

            }}
          >
            <TextField
              autoFocus
              label='Column name'
              size='small'
              variant="outlined"
              sx={{
                '& label': { color: "#FFB347 " },
                '& label.Mui-focused': { color: '#FFB347 ' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#FF6347' },
                  '&: hover fieldset': { borderColor: '#FF6347' },
                  '&.Mui-focused fieldset': { borderColor: '#FF6347' },
                }
              }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }} mt={'2px'} ml={'2px'}>
              <Button variant='contained' size='small' onClick={addColumn}>
                Add Columns
              </Button>
              <Tooltip title='close add columns' onClick={toggleForm}>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </Tooltip>


            </Box>
          </Box>
        )}


      </Box>
    </SortableContext>

  )
}
