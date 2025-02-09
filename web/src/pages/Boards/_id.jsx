import { Container } from '@mui/material';
import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumDetalsAPI } from '~/apis';
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice';
import { AppBar } from '../../components/AppBar';
import { BoardBar } from './BoardBar/BoardBar';
import { BoardContent } from './BoardContent/BoardContent';
import { PageLoading } from '~/components/Loading/PageLoading';
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard';
import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice';

export const Board = () => {

  const dispath = useDispatch()

  const board = useSelector(selectCurrentActiveBoard)

  const card = useSelector(selectCurrentActiveCard)

  const { boardId } = useParams()

  // '677aa7dfcc84b47c8bcc93ac'
  useEffect(() => {

    dispath(fetchBoardDetailsAPI(boardId))
  }, [dispath, boardId])


  const moveColumn = async (swappedColumns) => {
    const swappedColumnsIds = swappedColumns.map(c => c._id)
    const newBoard = { ...board }

    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: swappedColumnsIds })
  }

  const moveCardInSameColumn = async (swappedCards, columnId) => {
    const arrayCardIds = swappedCards.map(c => c._id)
    const newBoard = cloneDeep(board)
    const columnFind = newBoard.columns.find(c => c._id == columnId)
    if (columnFind) {

      columnFind.cards = swappedCards
      columnFind.cardOrderIds = arrayCardIds
    }
    dispath(updateCurrentActiveBoard(newBoard))
    await updateColumDetalsAPI(columnId, { cardOrderIds: arrayCardIds })
  }

  const moveCardDifferentColumn = async (currentCardId, prevColumnId, nextColumId, dndOrderColumn) => {

    let prevCardOrderIds = dndOrderColumn.find(c => c._id === prevColumnId).cardOrderIds
    let nextCardOrderIds = dndOrderColumn.find(c => c._id === nextColumId).cardOrderIds
    const newBoard = { ...board }
    newBoard.columns = dndOrderColumn
    newBoard.columnOrderIds = dndOrderColumn.map(c => c._id)
    dispath(updateCurrentActiveBoard(newBoard))
    // fast log mess :  ctrl shift 2
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    nextCardOrderIds = nextCardOrderIds.filter(c => !c.includes('placeholder-card'))
    await moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumId,
      nextCardOrderIds,
    })

  }

  if (!board) {
    return <PageLoading caption='Loading ...' />
  }

  return (

    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      {card && <ActiveCard />}


      <AppBar />
      <BoardBar mocData={board} />
      <BoardContent
        board={board}
        moveColumn={moveColumn}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardDifferentColumn={moveCardDifferentColumn}

      />
    </Container>

  )
}
