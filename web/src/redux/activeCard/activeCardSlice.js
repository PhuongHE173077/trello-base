import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentActiveCard: null,
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    updateCurrentActiveCard: (state, action) => {

      const card = action.payload

      state.currentActiveCard = card
    },

    clearCard: (state) => {
      state.currentActiveCard = null
    }
  },

  extraReducers: () => { }
})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveCard, clearCard } = activeCardSlice.actions


export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const activeCardReducer = activeCardSlice.reducer