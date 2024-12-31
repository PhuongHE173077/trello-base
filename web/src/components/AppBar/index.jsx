import { Badge, Box, SvgIcon, TextField, Typography } from '@mui/material'
import { ModalSelect } from '../ModeSelect'
import { ReactComponent as TrelloIcon } from '~/assets/Trello.svg';
import { Workspaces } from './Menus/Workspaces';
import { Recent } from './Menus/Recent';
import { Starred } from './Menus/Starred';
import { Template } from './Menus/Template';
import Create from './Menus/Create';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';
export const AppBar = () => {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.appBarHeight,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <SvgIcon component={TrelloIcon} inheritViewBox fontSize='large' sx={{ color: 'primary.main' }} />
        <Typography variant='span' sx={{ fontSize: '20px', fontWeight: 'bold', color: 'primary.main' }}> Trello</Typography>
        <Workspaces />
        <Recent />
        <Starred />
        <Template />
        <Create />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'primary.main' }}>
        <TextField id="outlined-basic" label="Search ..." variant="outlined" size='small' />
        <ModalSelect />
        <Tooltip title="Delete">
          <Badge badgeContent={2}
            sx={{

              color: red[500]
            }}
          >
            <NotificationsNoneOutlinedIcon color="action" />
          </Badge>
        </Tooltip>
        <Typography>abc</Typography>
      </Box>
    </Box>
  )
}
