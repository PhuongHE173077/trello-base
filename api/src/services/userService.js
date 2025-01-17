import { StatusCodes } from "http-status-codes"
import { userModal } from "~/models/userModal"
import ApiError from "~/utils/ApiError"
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import { pickUser } from "~/utils/slugify";
import { sendEmail } from "~/utils/sendMail";
import { WEBSITE_DOMAIN } from "~/utils/constants";
import { verifyForm } from "~/utils/fommat";
import { JwtProvider } from "~/providers/JwtProvider";
import { env } from "~/config/environment";
const createNew = async (req) => {
  try {
    //check email exits
    const userExits = await userModal.findOneByEmail(req.body.email)
    if (userExits) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email exits')
    }
    //create new user
    const formName = req.body.email.split('@')[0].toLowerCase()

    const newUser = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),

      username: formName,
      //set default display name , can be changed later
      displayName: formName,

      verifyToken: uuidv4()
    }

    const createUser = await userModal.createNew(newUser)

    const getNewuser = await userModal.findOneById(createUser.insertedId)

    //sent email for user to verify

    const linkVerify = `${WEBSITE_DOMAIN}/acount/verify?email=${req.body.email}&token=${getNewuser.verifyToken}`

    await sendEmail('Trello APP', req.body.email, 'Verify Email', verifyForm('Trello', linkVerify))

    //return data for controller
    return pickUser(getNewuser)
  } catch (error) {
    throw new Error(error)
  }
}

const verifityAccount = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //check email exits
    const userExits = await userModal.findOneByEmail(data.email)

    if (!userExits) throw new ApiError(StatusCodes.NOT_FOUND, 'Email not exits!')

    if (userExits.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'this account has been activated!')

    //check token valid
    if (data.token !== userExits.verifyToken) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Token is invalid!')

    //if don't have error, update isActive to true
    const updateData = {
      isActive: true,
      verifyToken: null
    }

    const updatedUser = await userModal.updateUser(userExits._id, updateData)

    return pickUser(updatedUser)
  } catch (error) {
    throw error
  }
}

const login = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const userExits = await userModal.findOneByEmail(data.email)

    if (!userExits) throw new ApiError(StatusCodes.NOT_FOUND, 'Email not exits!')

    if (!userExits.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'This account is not activated!')

    if (!bcrypt.compareSync(data.password, userExits.password)) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'The email or password is incorrect!')

    /** if it don't have error, create token return frontend */
    //create user info in jwt token
    const userInfo = { _id: userExits._id, email: userExits.email }

    // create access token and fresh token

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    )

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      env.REFRESH_TOKEN_LIFE
    )

    return {
      accessToken,
      refreshToken,
      ...pickUser(userExits)
    }
  } catch (error) {
    throw error
  }
}

export const userService = {
  createNew,
  login,
  verifityAccount
}