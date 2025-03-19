import { favoriteModal } from "~/models/favoriteModel"
import { FAVORITE_UPDATE_STATUS } from "~/utils/constants"

const getBoardFavorite = async (userId) => {
  try {
    //
    const result = await favoriteModal.getBoardsFavorite(userId)
    return result
  } catch (error) {
    throw new Error(error)
  }

}

const update = async (userId, boardId) => {
  try {
    //
    let result
    const favoriteBoards = await favoriteModal.findFavoriteBoardByUserId(userId)
    if (!favoriteBoards) {
      return
    }
    else if (favoriteBoards.favoriteBoards.find(item => item.equals(boardId.toString()))) {
      result = await favoriteModal.update(favoriteBoards._id, boardId, FAVORITE_UPDATE_STATUS.PULL)
    } else {
      result = await favoriteModal.update(favoriteBoards._id, boardId, FAVORITE_UPDATE_STATUS.PUSH)
    }

    return result
  } catch (error) {
    throw new Error(error)
  }

}

export const favoriteService = {
  getBoardFavorite,
  update
}