import AppsIcon from '@mui/icons-material/Apps';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, SvgIcon, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as TrelloIcon } from '~/assets/Trello.svg';
import { ModalSelect } from '../ModeSelect';
import Create from './Menus/Create';
import Profile from './Menus/Profile';
import { Recent } from './Menus/Recent';
import { Starred } from './Menus/Starred';
import { Template } from './Menus/Template';
import { Workspaces } from './Menus/Workspaces';
import Notifications from './Notifications/Notifications';
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard';
export const AppBar = () => {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.appBarHeight,
        backgroundColor: 'linear-gradient(135deg, #2E1A47, #1A3E48)',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        overflowX: 'auto'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <AppsIcon sx={{ color: 'primary.main', ml: 1 }} fontSize='medium' />

        <SvgIcon component={TrelloIcon} inheritViewBox fontSize='medium' sx={{ color: 'primary.main' }} />

        <Typography variant='span' sx={{ fontSize: '20px', fontWeight: 'bold', color: 'primary.main', cursor: 'pointer' }} onClick={() => window.location.href = '/boards'}> Trello</Typography>

        <Box sx={{ display: { xs: "none", md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Template />
          <Create />
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'primary.main' }}>

        <AutoCompleteSearchBoard />

        <ModalSelect />

        <Notifications />

        <Tooltip title="Delete">
          <HelpOutlineIcon />
        </Tooltip>

        <Profile />
      </Box>
    </Box >
  )
}
