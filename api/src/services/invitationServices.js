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

    const boardOwnerAndMemberIds = [...board.ownerIds, ...board.memberIds].toString()

    if (boardOwnerAndMemberIds.includes(invitee._id.toString())) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invitee already in board!')
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

const getInvitations = async (userId) => {
  try {
    const getInvitations = await invitationModal.findByUserId(userId)

    const resInvitation = getInvitations.map(invitation => {
      return {
        ...invitation,
        inviter: invitation.inviter[0],
        invitee: invitation.invitee[0],
        board: invitation.board[0]
      }
    })


    return resInvitation
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}

const updateInvitation = async (userId, invitationId, status) => {
  console.log("🚀 ~ updateInvitation ~ status:", status)
  try {
    //
    const getInvitations = await invitationModal.findOneById(invitationId)
    console.log("🚀 ~ updateInvitation ~ getInvitations:", getInvitations)

    if (!getInvitations) throw new ApiError(StatusCodes.NOT_FOUND, 'Invitation not found!')

    const boardId = getInvitations.boardInvatation.boardId

    const board = await boardModal.findOneById(boardId)

    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')

    const updateData = {
      boardInvatation: {
        ...getInvitations.boardInvatation,
        status: status.status
      }
    }



    const updateInvitation = await invitationModal.updateInvitation(invitationId, updateData)

    if (status.status === BOARD_INVITATION_STATUS.ACCEPTED) {
      await boardModal.pushMemberIds(boardId, userId)
    }

    return updateInvitation
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}


export const invitationService = {
  createNew,
  getInvitations,
  updateInvitation
}