import Cloud from '@mui/icons-material/Cloud';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function MoreOption({ handleDeleteColumn, column }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          sx={{
            '&:hover': {
              color: 'primary.dark',
              '& .add-icon': { color: 'primary.dark' }
            }
          }}

          onClick={() => {
            handleClose()
            handleDeleteColumn(column._id)
          }}

        >
          <ListItemIcon>
            <ContentCut fontSize="small" className='add-icon' />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>

        </MenuItem>
        <MenuItem

          sx={{
            '&:hover': {
              color: 'primary.dark',
              '& .add-icon': { color: 'primary.dark' }
            }
          }}
        >
          <ListItemIcon>
            <ContentCopy fontSize="small" className='add-icon' />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>

          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem

          sx={{
            '&:hover': {
              color: 'primary.dark',
              '& .add-icon': { color: 'primary.dark' }
            }
          }}>
          <ListItemIcon>
            <Cloud fontSize="small" className='add-icon' />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}