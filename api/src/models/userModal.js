const Joi = require("joi")
const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")
const { EMAIL_RULE, PASSWORD_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE_MESSAGE } = require("~/utils/validators")

const USER_ROLES = {
  CLIENT: 'client',
  ADMIN: 'admin'
}

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),
  password: Joi.string().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE).required(),

  username: Joi.string().min(3).max(50).trim().strict(),
  displayName: Joi.string().min(3).max(50).trim().strict(),
  avatar: Joi.string().default(null),
  role: Joi.string().valid(USER_ROLES.CLIENT, USER_ROLES.ADMIN).default(USER_ROLES.CLIENT),

  isActive: Joi.boolean().default(false),
  verifyToken: Joi.string(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FILEDS = ['_id', 'email', 'username', 'createdAt']

const validateData = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const findOneByEmail = async (email) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email: email })

  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })

  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validData = await validateData(data)
    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}


const updateUser = async (data) => {
  try {
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FILEDS.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(data._id) },
      { $set: data },
      { returnDocument: 'after' }
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}
export const userModal = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  findOneByEmail,
  findOneById,
  createNew,
  updateUser
}