import { GET_DB } from "~/config/mongodb"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "./validators"
import { ObjectId } from "mongodb"
import { BOARD_TYPES } from "~/utils/constants"
import { columnModal } from "./columnModal"
import { cardModal } from "./cardModal"


const Joi = require("joi")


const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(50).trim().strict(),
  slug: Joi.string().min(3).trim().strict(),
  description: Joi.string().min(5).max(255).trim().strict().required(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),


  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),


  // board Admins
  ownerIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),


  //board members
  memberIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),


  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})


const INVALID_UPDATE_FILEDS = ['_id', 'createdAt']


const validateBeforeCreate = async (data) => {
  return await BOARD_COLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}


const createNewBoard = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}


const findOneById = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}


const getDetail = async (id) => {
  try {
    try {
      const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false
          }
        },
        {
          $lookup: {
            from: columnModal.COLUMN_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: cardModal.CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ]).toArray()
      return result[0] || null
    } catch (error) {
      throw new Error(error)
    }
  } catch (error) {
    throw new Error(error)
  }
}




const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      { $push: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: 'after' }
    )
    //mongo db 6.0 return result
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}


const update = async (boardId, updatedData) => {
  try {
    Object.keys(updatedData).forEach((fieldName) => {
      if (INVALID_UPDATE_FILEDS.includes(fieldName)) {
        delete updatedData[fieldName]
      }
    })
    if (updatedData.columnOrderIds.length > 0) {
      updatedData.columnOrderIds = updatedData.columnOrderIds.map(id => new ObjectId(id))
    }


    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      { $set: updatedData },
      { returnDocument: 'after' }
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }


}


const pullOrderColummIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      { $pull: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: 'after' }
    )
    //mongo db 6.0 return result
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}


const getBoards = async (userId, page, itemsPerPage) => {
  try {
    const queryCondtion = [
      // condition 1 : board is not deleted
      { _destroy: false },


      // condition 2 : User must be owner or member in board
      {
        $or: [
          { ownerIds: { $all: [new ObjectId(userId)] } },
          { memberIds: { $all: [new ObjectId(userId)] } }
        ]
      }
    ]
    const query = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate(
      [
        { $match: { $and: queryCondtion } },
        //sort by name title
        { $sort: { title: 1 } },


        //handle many Workflow in 1 query
        {
          $facet: {
            // workflow 1 : query Boards
            'queryBoards': [
              { $skip: (page - 1) * itemsPerPage },//skip board before page
              { $limit: itemsPerPage } //Litmit max count return page
            ],
            // workflow 2 : query total Boards
            'querrTotalBoards': [{ $count: 'totalBoards' }]
          }
        }
      ],
      //fix sort (B -> a)
      { collation: { locale: 'en' } }
    ).toArray()


    const res = query[0]


    console.log("🚀 ~ res:", res)


    return {
      boards: res.queryBoards || [],
      totalBoards: res.querrTotalBoards[0]?.totalBoards || 0
    }
  } catch (error) {
    throw new Error(error)
  }
}


export const boardModal = {
  BOARD_COLLECTION_NAME,
  BOARD_COLECTION_SCHEMA,
  createNewBoard,
  findOneById,
  getDetail,
  pushColumnOrderIds,
  update,
  pullOrderColummIds,
  getBoards
}

