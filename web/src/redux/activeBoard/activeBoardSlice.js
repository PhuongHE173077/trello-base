import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash';
import axios from "~/Utils/axiosCustomiz";
import { generatePlaceholderCard } from '~/Utils/fomatter';
import { mapOrder } from '~/Utils/sortArrayByotherArray';

//declare value state of slice in redux
const initialState = {
  currentActiveBoard: null,
}

//xử lí catching api bất đồng bộ
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    return await axios.get(`v1/boards/${boardId}`)
  }
)

//declare silce in redux store
export const activeboardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // reducer : nơi xửu lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      /**action.payload là chuẩn đặt tên dữ liẹu vào reducer, ở đây chúng 
      ta đặt tên có ý nhĩa hơnhơn  */

      const board = action.payload

      //update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board
    },


  },
  //extraReducers: Nơi xửu lý dũ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      //action.payload là cài return dữ liêụ ở hàm fetchBoardDetailsAPI
      let board = action.payload

      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(element => {
        if (isEmpty(element.cards)) {
          element.cards = [generatePlaceholderCard(element)]
          element.cardOrderIds = [generatePlaceholderCard(element)._id]
        }
      });

      //update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board
    })

  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard } = activeboardSlice.actions

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export const activeBoardReducer = activeboardSlice.reducer