import StarBorderIcon from '@mui/icons-material/StarBorder';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreOption from './MoreOption/MoreOption';

const MENU_STYLE = {
  '&:hover': {
    backgroundColor: '#CCCCCC	',
    borderRadius: 2
  },
  ml: 1,
  padding: "2px",
  cursor: 'pointer',
  border: "none",
}
export const BoardBar = ({ mocData }) => {
  console.log(mocData);

  return (
    <Box
      sx={{
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid green',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#444444' : '#F0F8FF',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography variant='h6' sx={MENU_STYLE}>{mocData?.title}</Typography>

        <Tooltip title="Click to star or un star this board. Starred boards show up at the top of your boards list.">
          <IconButton>
            <StarBorderIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Change visibility">
          <IconButton>
            <SupervisorAccountIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Board">
          <Button
            startIcon={<ViewColumnIcon />}
            sx={{
              backgroundColor: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#FFFFFF',
              }
            }}>BOARD</Button>
        </Tooltip>

        <Tooltip title="Customize view">
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

        <Tooltip title="Filter">

          <Button startIcon={<FilterListIcon />}>Filter</Button>

        </Tooltip>

        <AvatarGroup max={3} sx={{
          '& .MuiAvatar-root': {
            width: 30,
            height: 30,
            cursor: 'pointer',
            '&:first-of-type': {
              bgcolor: 'grey'
            }
          },
        }}>
          <Tooltip title="a">
            <Avatar alt="A" src="/static/images/avatar/1.jpg" />
          </Tooltip>

          <Tooltip title="B">
            <Avatar alt="B" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="C">
            <Avatar alt="C" src="/static/images/avatar/1.jpg" />
          </Tooltip> <Tooltip title="D">
            <Avatar alt="D" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>

        <Box>
          <Tooltip title="Share">
            <Button sx={{
              backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#FFFFFF',
              }
            }}>Share</Button>
          </Tooltip>

        </Box>

        <MoreOption />
      </Box>
    </Box>
  )
}
