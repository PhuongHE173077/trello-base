import axios from "~/Utils/axiosCustomiz";

//Board API 
export const fetchBoardDetailsAPI = async (boardId) => {
  return await axios.get(`v1/boards/${boardId}`)
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  return await axios.put(`v1/boards/${boardId}`, updateData)
}

//Column API 
export const createNewColumAPI = async (columnData) => {
  return await axios.post(`v1/columns`, columnData)
}

//Card API 
export const createNewCardAPI = async (cardData) => {
  return await axios.post(`v1/cards`, cardData)
}