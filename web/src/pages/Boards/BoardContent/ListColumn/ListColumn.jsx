import { Box, Button } from '@mui/material';
import { Column } from './Column/Column';
import AddIcon from '@mui/icons-material/Add';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
export const ListColumn = ({ column }) => {

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
        <Box

          sx={{
            bgcolor: '#ffffff3d',
            height: 'fit-content',
            borderRadius: 2,
            m: 1,
            minWidth: '200px'

          }}
        >
          <Button startIcon={<AddIcon />}
            sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start'
            }}
          >Add Column</Button>
        </Box>

      </Box>
    </SortableContext>

  )
}
