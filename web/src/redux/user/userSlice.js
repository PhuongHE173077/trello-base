import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "~/Utils/axiosCustomiz";

//declare value state of slice in redux
const initialState = {
  currentUser: null,
}

//xử lí catching api bất đồng bộ
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    return await axios.post(`v1/users/login`, data)
  }
)

//declare silce in redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // reducer : nơi xửu lý dữ liệu đồng bộ
  reducers: {

  },
  //extraReducers: Nơi xửu lý dũ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      //action.payload là cài return dữ liêụ ở hàm fetchBoardDetailsAPI
      const user = action.payload
      state.currentUser = user
    })

  }
})

// Action creators are generated for each case reducer function
// export const { } = userSlice.actions

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer