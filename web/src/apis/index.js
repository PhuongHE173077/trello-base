import { toast } from "react-toastify";
import axios from "~/Utils/axiosCustomiz";

//Board API 
// export const fetchBoardDetailsAPI = async (boardId) => {
//   return await axios.get(`v1/boards/${boardId}`)
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  return await axios.put(`v1/boards/${boardId}`, updateData)
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  return await axios.put(`v1/boards/supports/moving_cards`, updateData)
}

//Column API 
export const createNewColumAPI = async (columnData) => {
  return await axios.post(`v1/columns`, columnData)
}

export const updateColumDetalsAPI = async (columnId, updatedColumn) => {
  return await axios.put(`v1/columns/${columnId}`, updatedColumn)
}

export const deleteColumDetalsAPI = async (columnId) => {
  return await axios.delete(`v1/columns/${columnId}`)
}

//Card API 
export const createNewCardAPI = async (cardData) => {
  return await axios.post(`v1/cards`, cardData)
}


//User API
export const registerUserAPI = async (userData) => {
  const res = await axios.post(`v1/users/register`, userData)
  toast.success('Account created successfully!, Please check and verify your account before login.')
  return res
}

export const verifyUserAPI = async (data) => {
  const res = await axios.put(`v1/users/verify`, data)
  toast.success('Account verify successfully!, Now you can login to enjoy our services!')
  return res
}

export const refreshTokenAPI = async () => {
  return await axios.get(`v1/users/refresh_token`)
}