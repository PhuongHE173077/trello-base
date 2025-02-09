import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { mapOrder } from '~/Utils/sortArrayByotherArray';
import ToggleFocusInput from '~/components/Form/ToggleFocusInput';
import MoreOption from '~/pages/Boards/BoardBar/MoreOption/MoreOption';
import { ListCard } from './ListCard/ListCard';
import { updateColumDetalsAPI } from '~/apis';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice';

export const Column = ({ column }) => {
  const cardOrder = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const dispatch = useDispatch()

  const board = useSelector(selectCurrentActiveBoard)

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


  const onUpdateColumTitle = (newTitle) => {
    console.log("🚀 ~ onUpdateColumTitle ~ newTitle:", newTitle)


    updateColumDetalsAPI(column._id, { title: newTitle })

    const newBoard = cloneDeep(board)

    const columnUpdate = newBoard.columns.find(c => c._id.toString() == column._id)

    columnUpdate.title = newTitle

    dispatch(updateCurrentActiveBoard(newBoard))

  }


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

          <ToggleFocusInput value={column?.title} onChangedValue={onUpdateColumTitle} />

          <MoreOption column={column} />
        </Box>

        {/* Box list card  */}


        <ListCard cards={cardOrder} columnId={column._id} />



      </Box>
    </div>

  )
}
