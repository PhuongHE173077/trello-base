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

export const invitationController = {
  createNew
}