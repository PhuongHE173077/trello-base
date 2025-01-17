import { StatusCodes } from "http-status-codes"
import ms from "ms"
import { userService } from "~/services/userService"

const createNew = async (req, res, next) => {
  try {
    const createBoard = await userService.createNew(req)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}
const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body)

    //handle cookie
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSize: 'none',
      maxAge: ms('14 days')
    })

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSize: 'none',
      maxAge: ms('14 days')
    })
    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
  }
}
const verifityAccount = async (req, res, next) => {
  try {
    const result = await userService.verifityAccount(req.body)

    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createNew,
  login,
  verifityAccount
}