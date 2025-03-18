import { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HistoryIcon from '@mui/icons-material/History';
import ArchiveIcon from '@mui/icons-material/Archive';
import SettingsIcon from '@mui/icons-material/Settings';
import BrushIcon from '@mui/icons-material/Brush';
import AppsIcon from '@mui/icons-material/Apps';
import LabelIcon from '@mui/icons-material/Label';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const MoreOption = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><InfoOutlinedIcon /></ListItemIcon>
          <ListItemText>About this board</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><HistoryIcon /></ListItemIcon>
          <ListItemText>Activity</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><ArchiveIcon /></ListItemIcon>
          <ListItemText>Archived items</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><BrushIcon /></ListItemIcon>
          <ListItemText>Change background</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><AppsIcon /></ListItemIcon>
          <ListItemText>Power-Ups</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><LabelIcon /></ListItemIcon>
          <ListItemText>Labels</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><EmojiEmotionsIcon /></ListItemIcon>
          <ListItemText>Stickers</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon><VisibilityIcon /></ListItemIcon>
          <ListItemText>Watch</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><EmailIcon /></ListItemIcon>
          <ListItemText>Email-to-board</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><FileCopyIcon /></ListItemIcon>
          <ListItemText>Copy board</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MoreOption;
