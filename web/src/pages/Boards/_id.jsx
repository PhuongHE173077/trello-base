import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { createNewCardAPI, createNewColumAPI, deleteColumDetalsAPI, fetchBoardDetailsAPI, moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumDetalsAPI } from '~/apis';
import { AppBar } from '../../components/AppBar';
import { BoardBar } from './BoardBar/BoardBar';
import { BoardContent } from './BoardContent/BoardContent';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/Utils/fomatter';
import Swal from 'sweetalert2';
export const Board = () => {
  const [board, setBoard] = useState(null)

  const boardId = '677aa7dfcc84b47c8bcc93ac'
  useEffect(() => {
    fetchBoardDetailsAPI(boardId)
      .then((boards) => {

        boards.columns.forEach(element => {
          if (isEmpty(element.cards)) {
            element.cards = [generatePlaceholderCard(element)]
            element.cardOrderIds = [generatePlaceholderCard(element)._id]
          }
        });

        setBoard(boards);
      })
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdNewColumn = await createNewColumAPI({
      ...newColumnData,
      boardId: boardId
    })
    if (!createdNewColumn.statusCode) {
      const newBoard = { ...board }
      createdNewColumn.cards = [generatePlaceholderCard(createdNewColumn)]
      createdNewColumn.cardOrderIds = [generatePlaceholderCard(createdNewColumn)._id]
      newBoard.columns.push(createdNewColumn)
      newBoard.columnOrderIds.push(createdNewColumn._id)
      setBoard(newBoard)
    }

    return createdNewColumn
  }

  const createNewCard = async (newCardData) => {
    const createdNewCard = await createNewCardAPI({
      ...newCardData,
      boardId: boardId
    })
    if (!createdNewCard.statusCode) {
      const newBoard = { ...board }

      const columnUpdate = newBoard.columns.find(c => c._id.toString() == createdNewCard.columnId)

      columnUpdate.cards.push(createdNewCard)
      console.log(columnUpdate);

      columnUpdate.cardOrderIds.push(createdNewCard._id)
      setBoard(newBoard)
    }
    return createdNewCard
  }

  const moveColumn = async (swappedColumns) => {
    const swappedColumnsIds = swappedColumns.map(c => c._id)
    const newBoard = { ...board }

    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: swappedColumnsIds })
  }

  const moveCardInSameColumn = async (swappedCards, columnId) => {
    const arrayCardIds = swappedCards.map(c => c._id)

    await updateColumDetalsAPI(columnId, { cardOrderIds: arrayCardIds })
  }

  const moveCardDifferentColumn = async (currentCardId, prevColumnId, nextColumId, dndOrderColumn) => {

    let prevCardOrderIds = dndOrderColumn.find(c => c._id === prevColumnId).cardOrderIds
    let nextCardOrderIds = dndOrderColumn.find(c => c._id === nextColumId).cardOrderIds
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

  const handleDeleteColumn = (columnId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This action delete forever colum and card ! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        //
        const newBoard = cloneDeep(board)
        newBoard.columns = newBoard.columns.filter(c => c._id != columnId)
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(c => c != columnId)
        setBoard(newBoard)
        //
        await deleteColumDetalsAPI(columnId).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });

        })
      }
    });
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar mocData={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardDifferentColumn={moveCardDifferentColumn}
        handleDeleteColumn={handleDeleteColumn}
      />
    </Container>
  )
}
