import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "~/Utils/axiosCustomiz";

const initialState = {
  currentNotification: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    return await axios.get(`v1/invitations`)
  }
)

export const updateBoardInvitation = createAsyncThunk(
  'notifications/updateBoardInvitation',
  async ({ notificationId, status }) => {
    return await axios.put(`v1/invitations/board/${notificationId}`, { status })
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearCurrentNotification: (state) => {
      state.currentNotification = null
    },

    updateCurrentNotification: (state, action) => {
      const notification = action.payload
      state.currentNotification = notification
    },

    addNotification: (state, action) => {
      const notification = action.payload
      state.currentNotification.unshift(notification)
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {

      const imcommingInvitations = action.payload

      state.currentNotification = Array.isArray(imcommingInvitations) ? imcommingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitation.fulfilled, (state, action) => {
      state.currentNotification = action.payload
    })
  }
})

export const { clearCurrentNotification, updateCurrentNotification, addNotification } = notificationsSlice.actions

export const selectCurrentNotification = (state) => {
  return state.notifications.currentNotification
}

export const notificationsReducer = notificationsSlice.reducer