export const userRole = {
  CLIENT: 'client',
  UPGRADED: 'upgraded',
  ADMIN: 'admin'
}

export const permissions = {
  VIEW_BOARD: 'view_board',
  CREATE_BOARD: 'create_board',
  UPDATE_BOARD: 'update_board',
  DELETE_BOARD: 'delete_board',
  VIEW_COLUMN: 'view_column',
  CREATE_COLUMN: 'create_column',
  UPDATE_COLUMN: 'update_column',
  DELETE_COLUMN: 'delete_column',
  VIEW_CARD: 'view_card',
  CREATE_CARD: 'create_card',
  UPDATE_CARD: 'update_card',
  DELETE_CARD: 'delete_card',
  VIEW_COMMENT: 'view_comment',
  CREATE_COMMENT: 'create_comment',
  UPDATE_COMMENT: 'update_comment',
  DELETE_COMMENT: 'delete_comment',
  VIEW_TABLE: 'view_table',
  VIEW_CALENDAR: 'view_calendar'
}

export const rolePermistions = {
  [userRole.CLIENT]: [
    permissions.VIEW_BOARD,
    permissions.VIEW_COLUMN,
    permissions.VIEW_CARD,
    permissions.VIEW_COMMENT,
    permissions.CREATE_BOARD,
    permissions.UPDATE_BOARD,
    permissions.DELETE_BOARD,
    permissions.CREATE_COLUMN,
    permissions.UPDATE_COLUMN,
    permissions.DELETE_COLUMN,
    permissions.CREATE_CARD,
    permissions.UPDATE_CARD,
    permissions.DELETE_CARD,
    permissions.CREATE_COMMENT,
    permissions.UPDATE_COMMENT,
    permissions.DELETE_COMMENT,
  ],

  [userRole.UPGRADED]: [
    permissions.VIEW_BOARD,
    permissions.VIEW_COLUMN,
    permissions.VIEW_CARD,
    permissions.VIEW_COMMENT,
    permissions.CREATE_BOARD,
    permissions.UPDATE_BOARD,
    permissions.DELETE_BOARD,
    permissions.CREATE_COLUMN,
    permissions.UPDATE_COLUMN,
    permissions.DELETE_COLUMN,
    permissions.CREATE_CARD,
    permissions.UPDATE_CARD,
    permissions.DELETE_CARD,
    permissions.CREATE_COMMENT,
    permissions.UPDATE_COMMENT,
    permissions.DELETE_COMMENT,
    permissions.VIEW_TABLE,
    permissions.VIEW_CALENDAR
  ],

  [userRole.ADMIN]: Object.values(permissions),

}

