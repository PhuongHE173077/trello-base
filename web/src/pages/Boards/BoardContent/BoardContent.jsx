import { Box } from '@mui/material';
import { ListColumn } from './ListColumn/ListColumn';
import { mapOrder } from '~/Utils/sortArrayByOtherArray';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
export const BoardContent = ({ board }) => {

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(
    mouseSensor,
    touchSensor
  )

  const [orderColumns, setOrderColumns] = useState([])

  useEffect(() => {
    setOrderColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [])

  const handleDrag = (event) => {
    console.log(event);

    const { active, over } = event

    //check over is null
    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderColumns.findIndex(c => c._id === active.id)
      const newIndex = orderColumns.findIndex(c => c._id === over.id)

      //swap array to 
      const swappedColumns = arrayMove(orderColumns, oldIndex, newIndex);

      //have array of ids to update database
      const swappedColumnsIds = swappedColumns.map(c => c._id)
      console.log(swappedColumnsIds);

      setOrderColumns(swappedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDrag} sensors={sensors}>
      <Box
        sx={{
          height: (theme) => theme.trello.boardContentHeight,
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#66FFFF'),
        }}
      >
        <ListColumn column={orderColumns} />
      </Box >
    </DndContext>
  )
}
