import { StatusCodes } from "http-status-codes"
import { userModal } from "~/models/userModal"
import ApiError from "~/utils/ApiError"
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import { pickUser } from "~/utils/slugify";
import { sendEmail } from "~/utils/sendMail";
import { WEBSITE_DOMAIN } from "~/utils/constants";
import { verifyForm } from "~/utils/fommat";
const createNew = async (req, res, next) => {
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

    const linkVerify = `${WEBSITE_DOMAIN}/acount/verify?email?=${req.body.email}&token=${getNewuser.verifyToken}`

    await sendEmail('Trello APP', req.body.email, 'Verify Email', verifyForm('Trello', linkVerify))

    //return data for controller
    return pickUser(getNewuser)
  } catch (error) {
    throw new Error(error)
  }
}

export const userService = {
  createNew
}