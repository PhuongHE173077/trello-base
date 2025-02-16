import { StatusCodes } from "http-status-codes"
import { boardModal } from "~/models/boardModel"
import { invitationModal } from "~/models/invitationModal"
import { userModal } from "~/models/userModal"
import ApiError from "~/utils/ApiError"
import { BOARD_INVITATION_STATUS, INVITATION_TYPE } from "~/utils/constants"
import { pickUser } from "~/utils/slugify"


const createNew = async (inviterId, reqBody) => {
  try {
    const inviter = await userModal.findOneById(inviterId)

    const invitee = await userModal.findOneByEmail(reqBody.inviteeEmail)

    const board = await boardModal.findOneById(reqBody.boardId)

    if (!inviter || !invitee || !board) {
      throw new ApiError(StatusCodes.NOT_IMPLEMENTED, 'The Inviter or Invitee or Board not found')
    }

    const newInvitation = {
      inviterId,
      inviteeId: invitee._id.toString(),

      type: INVITATION_TYPE.BOARD_INVITATION,

      boardInvatation: {
        boardId: board._id.toString(),
        status: BOARD_INVITATION_STATUS.PENDING
      }
    }
    console.log("🚀 ~ createNew ~ newInvitation:", newInvitation)


    const createNewInvitation = await invitationModal.createNewInvitation(newInvitation)

    const getInvitation = await invitationModal.findOneById(createNewInvitation.insertedId)

    const resInvitation = {
      ...getInvitation,
      board,
      inviter: pickUser(inviter),
      invitee: pickUser(invitee)
    }

    return resInvitation
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}


export const invitationService = {
  createNew

}