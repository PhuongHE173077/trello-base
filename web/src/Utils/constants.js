export const DEFAULT_PAGE = 1


export const DEFAULT_ITEMS_PER_PAGE = 12

export const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

let api_Root = ''

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  api_Root = 'http://localhost:8017'
} else {
  api_Root = 'adasd'
}

export const API_ROOT = api_Root

