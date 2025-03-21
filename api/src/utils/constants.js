import { env } from "~/config/environment"


export const WHITELIST_DOMAINS = [
  'http://localhost:5173',
  'http://localhost:3039/'
]


export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}


export const DEFAULT_PAGE = 1


export const DEFAULT_ITEMS_PER_PAGE = 12


export const WEBSITE_DOMAIN = (env.BUILD_MODE === 'production') ? env.WEBSITE_DOMAIN_PRODUCTION : env.WEBSITE_DOMAIN_DEVELOPMENT


export const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

export const INVITATION_TYPE = {
  BOARD_INVITATION: 'BOARD_INVITATION'
}

export const CARD_MEMBER_ACTION = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}

export const DUE_DATE_STATUS = {
  OVERDUE: 'OVERDUE',
  DONE: 'DONE'
}

export const FAVORITE_UPDATE_STATUS = {
  PUSH: 'PUSH',
  PULL: "PULL"
}