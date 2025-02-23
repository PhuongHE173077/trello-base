import DoneIcon from '@mui/icons-material/Done'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNotification, fetchInvitationsAPI, selectCurrentNotification, updateBoardInvitationStatus } from '~/redux/notification/notificationsSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { socketIo } from '~/socket'
import { BOARD_INVITATION_STATUS } from '~/Utils/constants'



function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [newNotification, setNewNotification] = useState(false)

  const dispath = useDispatch();
  const notifications = useSelector(selectCurrentNotification)

  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    dispath(fetchInvitationsAPI())

    const onReceiverInvitation = (invitation) => {
      if (invitation.inviteeId === currentUser._id) {
        //
        dispath(addNotification(invitation))

        setNewNotification(true)
      }

    }

    // listen event realtime from back-end return
    socketIo.on('BE_INVITED_TO_BOARD', onReceiverInvitation)

    //clean up event realtime
    return () => {
      socketIo.off('BE_INVITED_TO_BOARD', onReceiverInvitation)
    }

  }, [dispath, currentUser._id])



  const open = Boolean(anchorEl)
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
    setNewNotification(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigate = useNavigate()

  const updateBoardInvitation = (invitaionId, status) => {
    dispath(updateBoardInvitationStatus({ invitaionId, status }))
      .then((res) => {
        // console.log("🚀 ~ .then ~ res:", res)
        if (res.payload.boardInvatation.status === BOARD_INVITATION_STATUS.ACCEPTED) {
          navigate(`/boards/${res.payload.boardInvatation.boardId}`)
        }
      })
  }

  return (
    <Box>
      <Tooltip title="Notifications" >
        <Badge
          color="warning"
          variant={newNotification ? 'dot' : 'none'}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon sx={{
            // color: 'white'
            color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'grey'
          }} />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {(!notifications || notifications.length === 0) && <MenuItem sx={{ minWidth: 200 }}>You do not have any new notifications.</MenuItem>}
        {notifications?.map((notification, index) =>
          <Box key={index}>
            <MenuItem sx={{
              minWidth: 200,
              maxWidth: 360,
              overflowY: 'auto'
            }}>
              <Box sx={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'column', gap: 1 }}>
                {/* Nội dung của thông báo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box><GroupAddIcon fontSize="small" /></Box>
                  <Box><strong>{notification.inviter.username}</strong> had invited you to join the board <strong>{notification.board.title}</strong></Box>
                </Box>
                {notification.boardInvatation.status === BOARD_INVITATION_STATUS.PENDING &&
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => updateBoardInvitation(notification._id, BOARD_INVITATION_STATUS.ACCEPTED)}
                    >
                      Accept
                    </Button>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateBoardInvitation(notification._id, BOARD_INVITATION_STATUS.REJECTED)}
                    >
                      Reject
                    </Button>
                  </Box>
                }

                {/* Khi Status của thông báo này là ACCEPTED hoặc REJECTED thì sẽ hiện thông tin đó lên */}
                <Box Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>

                  {notification.boardInvatation.status === BOARD_INVITATION_STATUS.ACCEPTED && <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />}
                  {notification.boardInvatation.status === BOARD_INVITATION_STATUS.REJECTED && <Chip icon={<NotInterestedIcon />} label="Rejected" size="small" />}

                </Box>
                {/* Thời gian của thông báo */}
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="span" sx={{ fontSize: '13px' }}>
                    {moment(notification.createdAt).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
            {index !== (notifications.length - 1) && <Divider />}
          </Box>
        )
        }
      </Menu >
    </Box >
  )
}

export default Notifications
