import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import randomColor from 'randomcolor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteAPIs, selectFavorite } from '~/redux/favorite/favoriteSlice';

export const Starred = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const data = useSelector(selectFavorite)



  const dispath = useDispatch()
  const navigate = useNavigate()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispath(fetchFavoriteAPIs())
  }, [dispath])
  return (
    <Box>
      <Button
        id="basic-button-workspace"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Stared
      </Button>
      <Menu
        id="basic-menu-workspace"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {data?.favoriteBoards?.map((item, index) => (
          <>
            <MenuItem key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                '$:hover': { backgroundColor: '#1A2027' }
              }}
              onClick={() => navigate(`/boards/${item._id}`)}
            >
              {item?.coverImage ? <img src={item?.coverImage || ''} style={{ width: 100, height: 50, borderRadius: '8px' }} /> : <Box
                sx={{
                  backgroundColor: randomColor(),
                  width: 100, height: 50,
                  borderRadius: '8px'
                }}
              ></Box>}
              <Typography>{item?.title}</Typography>
            </MenuItem>
            {data?.favoriteBoards?.length - 1 !== index && <Divider />}
          </>

        ))}
      </Menu>
    </Box>
  )
}
