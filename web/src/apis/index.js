import axios from "~/Utils/axiosCustomiz";

export const fetchBoardDetailsAPI = async (boardId) => {
  return await axios.get(`v1/boards/${boardId}`)
}

