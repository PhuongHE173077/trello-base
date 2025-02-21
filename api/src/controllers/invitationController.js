import { StatusCodes } from "http-status-codes"
import { invitationService } from "~/services/invitationServices"
import { userService } from "~/services/userService"


const createNew = async (req, res, next) => {
  try {

    const inviterId = req.jwtDecoded._id

    const createBoard = await invitationService.createNew(inviterId, req.body)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}

const getInvitations = async (req, res, next) => {
  try {

    const userId = req.jwtDecoded._id

    const createBoard = await invitationService.getInvitations(userId)

    res.status(StatusCodes.OK).json(createBoard)
  } catch (error) {
    next(error)
  }
}

const updateInvitation = async (req, res, next) => {
  try {

    const userId = req.jwtDecoded._id

    const invitationId = req.params.id

    const status = req.body

    const createBoard = await invitationService.updateInvitation(userId, invitationId, status)

    res.status(StatusCodes.OK).json(createBoard)
  } catch (error) {
    next(error)
  }
}


export const invitationController = {
  createNew,
  getInvitations,
  updateInvitation
}