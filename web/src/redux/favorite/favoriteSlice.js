import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "~/Utils/axiosCustomiz";

const initialState = {
  favoriteUser: null
}

export const fetchFavoriteAPIs = createAsyncThunk(
  'favoriteUser/fetchFavoriteAPI',
  async () => {
    return await axios.get(`v1/favorites`)
  }
)

export const updateFavAPIs = createAsyncThunk(
  'favoriteUser/updateFav',
  async (boardId) => {
    return await axios.put(`v1/favorites`, boardId)
  }
)


export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavoriteUser: (state) => {
      state.favoriteUser = null
    },

    updateFavoriteUser: (state, action) => {
      const favoriteUser = action.payload
      state.favoriteUser = favoriteUser
    },

    addFavoriteUser: (state, action) => {
      const favoriteUser = action.payload
      state.favoriteUser.favoriteBoards.unshift(favoriteUser)
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteAPIs.fulfilled, (state, action) => {

      state.favoriteUser = action.payload
    })
    builder.addCase(updateFavAPIs.fulfilled, (state, action) => {
      state.favoriteUser = action.payload
    })
  }
})

export const { clearFavoriteUser, updateFavoriteUser, addFavoriteUser } = favoriteSlice.actions

export const selectFavorite = (state) => {
  return state.favorites.favoriteUser
}

export const favoritesReducer = favoriteSlice.reducer