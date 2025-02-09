import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import BoardUserGroup from './BoardUserGroup';

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
  // console.log(mocData);

  return (
    <Box
      sx={{
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid green',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#444444' : '#F0F8FF',
        overflowX: 'auto'
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

        {/* handle show user in board */}
        <BoardUserGroup />

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
      </Box>
    </Box>
  )
}
