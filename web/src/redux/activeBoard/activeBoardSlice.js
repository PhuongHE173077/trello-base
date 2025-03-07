import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash';
import axios from "~/Utils/axiosCustomiz";
import { generatePlaceholderCard } from '~/Utils/fomatter';
import { mapOrder } from '~/Utils/sortArrayByotherArray';

const initialState = {
  currentActiveBoard: null,
}

export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    return await axios.get(`v1/boards/${boardId}`)
  }
)

export const removeMemberBoardAPI = createAsyncThunk(
  'activeBoard/removeMemberBoardAPI',
  async ({ boardId, data }) => {
    return await axios.put(`v1/boards/${boardId}`, data)
  }
)



export const activeboardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    updateCurrentActiveBoard: (state, action) => {


      const board = action.payload

      state.currentActiveBoard = board
    },

    reloadBoard: (state) => {
      state.currentActiveBoard = null
    },

    updatedCardInBoard: (state, action) => {

      const incomingCard = action.payload

      const column = state.currentActiveBoard.columns.find(c => c._id === incomingCard.columnId)
      if (column) {
        const card = column.cards.find(card => card._id === incomingCard._id)
        if (card) {
          Object.keys(incomingCard).forEach(key => {
            card[key] = incomingCard[key]
          })
        }
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload

      board.fnMembers = board.owners.concat(board.members)

      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(element => {
        if (isEmpty(element.cards)) {
          element.cards = [generatePlaceholderCard(element)]
          element.cardOrderIds = [generatePlaceholderCard(element)._id]
        }
      });

      state.currentActiveBoard = board
    })

    builder.addCase(removeMemberBoardAPI.fulfilled, (state, action) => {
      let incomingBoard = action.payload

      state.currentActiveBoard.memberIds = incomingBoard.memberIds

      state.currentActiveBoard.fnMembers = state.currentActiveBoard.fnMembers.filter(member => (incomingBoard.memberIds.includes(member._id) || incomingBoard.owners.includes(member._id)))

      if (incomingBoard.memberIds.length > 0) {
        state.currentActiveBoard.members = state.currentActiveBoard.members.filter(member => incomingBoard.memberIds.includes(member._id))
      } else {
        state.currentActiveBoard.members = []
      }
    })

  }
})

export const { updateCurrentActiveBoard, reloadBoard, updatedCardInBoard } = activeboardSlice.actions


export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export const activeBoardReducer = activeboardSlice.reducer