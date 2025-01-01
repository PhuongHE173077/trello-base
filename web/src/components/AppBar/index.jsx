import { Badge, Box, InputAdornment, SvgIcon, TextField, Typography } from '@mui/material'
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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profile from './Menus/Profile';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
export const AppBar = () => {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.appBarHeight,
        backgroundColor: 'secondary.main',
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

        <Typography variant='span' sx={{ fontSize: '20px', fontWeight: 'bold', color: 'primary.main' }}> Trello</Typography>

        <Box sx={{ display: { xs: "none", md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Template />
          <Create />
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'primary.main' }}>

        <TextField
          id="outlined-basic"
          label="Search "
          variant="outlined"
          placeholder='Search...'
          size='small'
          sx={{
            minWidth: "120px",
            '& input ': {
              color: 'gray',
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
        />

        <ModalSelect />

        <Tooltip title="Delete">
          <Badge color='warning' badgeContent={2}
            sx={{
              color: red[500]
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ color: 'primary.main' }} color="action" />
          </Badge>
        </Tooltip>

        <Tooltip title="Delete">
          <HelpOutlineIcon />
        </Tooltip>

        <Profile />
      </Box>
    </Box >
  )
}
