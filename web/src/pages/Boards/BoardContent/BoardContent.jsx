import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Column } from './ListColumn/Column/Column';
import { TrelloCard } from './ListColumn/Column/ListCard/Card/Card';
import { ListColumn } from './ListColumn/ListColumn';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/Utils/fomatter';
import { mapOrder } from '~/Utils/sortArrayByotherArray';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

export const BoardContent = ({
  board,
  moveColumn,
  moveCardInSameColumn,
  moveCardDifferentColumn

}) => {
  const [orderColumns, setOrderColumns] = useState([])

  const [activeDragId, setActiveDragId] = useState(null);
  const [activeDragType, setActiveDragType] = useState(null);
  const [data, setData] = useState(null)
  const [oldColumnDrag, setOldColumnDrag] = useState(null)
  useEffect(() => {
    //sort array column by columnOrderIds
    setOrderColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

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

  const handleDragStart = (event) => {
    // console.log('drag start:', event);
    setActiveDragId(event?.active?.id)
    setData(event?.active?.data?.current)
    setActiveDragType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE?.CARD : ACTIVE_DRAG_ITEM_TYPE?.COLUMN)
    //set again column drag because when going to dragOver, in dragEnd, the sate transfer to over column 
    if (event?.active?.data?.current?.columnId) {
      setOldColumnDrag(findColumnByCardId(event?.active?.data?.current._id))
    }
  }

  //handle when drag element
  const handleDragOver = (event) => {

    if (activeDragType === ACTIVE_DRAG_ITEM_TYPE?.COLUMN) return

    const { active, over } = event

    if (!active || !over) return

    const { id: activeCardId, data: { current: activeCardData } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeCardId)
    const overColumn = findColumnByCardId(overCardId)

    //check active or over is null
    if (!activeColumn || !overColumn) return

    //If the dragging column is different from the over column
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumn(
        overColumn,
        overCardId,
        over,
        active,
        activeColumn,
        activeCardId,
        activeCardData,
        'handleDragOver'
      )
    }

  }

  const moveCardBetweenDifferentColumn = (
    overColumn,
    overCardId,
    over,
    active,
    activeColumn,
    activeCardId,
    activeCardData,
    functionType
  ) => {
    setOrderColumns(prevColumns => {
      const overIndex = overColumn.cards.findIndex(c => c._id === overCardId)

      let NewCardIndex

      //get index of card in over column .flowing dnd kit code line (316)
      //https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx
      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top >
        over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      NewCardIndex = overIndex >= 0 ? overIndex + modifier : overColumn.length + 1;

      const nextColum = cloneDeep(prevColumns)
      const nextActiveColumn = nextColum.find(c => c._id === activeColumn._id)
      const nextOverColumn = nextColum.find(c => c._id === overColumn._id)
      //
      if (nextActiveColumn) {
        //remove card from active column
        nextActiveColumn.cards = nextActiveColumn.cards.filter(c => c._id !== activeCardId)

        // if cards is empty , i add one card in column because if the card array is empty then we don't drag and drop to this column 
        if (isEmpty(nextActiveColumn.cards)) {

          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        console.log('nextActiveColumn', nextActiveColumn.cards);


        //update cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(c => c._id)


      }
      if (nextOverColumn) {
        //if card exit in column ,they will remove card from column
        nextOverColumn.cards = nextOverColumn.cards.filter(c => c._id !== activeCardId)

        //add card to column
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(NewCardIndex, 0, activeCardData)

        //update cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(c => c._id)
      }

      if (functionType === 'handleDragEnd') {
        moveCardDifferentColumn(activeCardId, oldColumnDrag._id, overColumn._id, nextColum)
      }

      return nextColum
    })
  }

  const handleDragEnd = (event) => {

    const { active, over } = event

    //check over or active is null
    if (!active || !over) return

    //handle drag and drop Card
    if (activeDragType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeCardId, data: { current: activeCardData } } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeCardId)
      const overColumn = findColumnByCardId(overCardId)

      //check active or over is null
      if (!oldColumnDrag || !overColumn) return

      //transfer card from this column to that column
      if (oldColumnDrag._id !== overColumn._id) {

        //common function handle transfer card from this column to that column
        moveCardBetweenDifferentColumn(
          overColumn,
          overCardId,
          over,
          active,
          activeColumn,
          activeCardId,
          activeCardData,
          'handleDragEnd'
        )

      }
      //transfer card in this column 
      else {

        const oldIndex = oldColumnDrag.cards.findIndex(c => c._id === activeCardId)
        const newIndex = oldColumnDrag.cards.findIndex(c => c._id === overCardId)
        const swappedCards = arrayMove(oldColumnDrag?.cards, oldIndex, newIndex);

        setOrderColumns(prev => {

          const nextColumn = cloneDeep(prev)

          const targetColumn = nextColumn.find(c => c._id === oldColumnDrag._id)

          targetColumn.cards = swappedCards

          targetColumn.cardOrderIds = swappedCards.map(c => c._id)
          return nextColumn
        })

        moveCardInSameColumn(swappedCards, oldColumnDrag._id)

      }
    }

    //handle drag and drop columns
    if (activeDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {

        const oldIndex = orderColumns.findIndex(c => c._id === active.id)
        const newIndex = orderColumns.findIndex(c => c._id === over.id)

        //swap array by arrayMove function Of dnd kit (originArray, oldIndex, newIndex)
        const swappedColumns = arrayMove(orderColumns, oldIndex, newIndex);

        setOrderColumns(swappedColumns)

        moveColumn(swappedColumns)

      }
    }

    setActiveDragId(null)
    setData(null)
    setActiveDragType(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  const findColumnByCardId = (cardId) => {
    return orderColumns.find(col => col.cards.find(c => c._id === cardId))
  }


  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      {board?.coverImage ?
        <Box
          sx={{
            height: '87%',
            backgroundImage: `url(${board?.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragId && null}
            {(activeDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={data} />}
            {(activeDragType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <TrelloCard card={data} />}
          </DragOverlay>
          <ListColumn column={orderColumns} />
        </Box>

        :


        <Box
          sx={{
            height: '87%',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#66FFFF'),

          }}
        >

          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragId && null}
            {(activeDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={data} />}
            {(activeDragType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <TrelloCard card={data} />}
          </DragOverlay>
          <ListColumn column={orderColumns} />
        </Box >

      }

    </DndContext>
  )
}
