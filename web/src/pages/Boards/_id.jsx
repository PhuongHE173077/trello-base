import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { createNewCardAPI, createNewColumAPI, fetchBoardDetailsAPI } from '~/apis';
import { AppBar } from '../../components/AppBar';
import { BoardBar } from './BoardBar/BoardBar';
import { BoardContent } from './BoardContent/BoardContent';
import { isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/Utils/fomatter';
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
      columnUpdate.cardOrderIds.push(createdNewCard.id)
      setBoard(newBoard)
    }
    return createdNewCard
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar mocData={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
    </Container>
  )
}
