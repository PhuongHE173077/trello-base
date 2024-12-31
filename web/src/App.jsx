import * as React from 'react';
import { useState } from 'react'
import { Button, Typography, useMediaQuery } from '@mui/material';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

function ModalSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <Box sx={{ mt: 1, ml: 2, minWidth: 120 }}>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="Model"
          onChange={handleChange}
        >
          <MenuItem value='light' >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <LightModeIcon fontSize='small' />
              Light
            </Box></MenuItem>

          <MenuItem value='dark'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <DarkModeIcon fontSize='small' />
              Dark
            </Box>
          </MenuItem>
          <MenuItem value='system'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <SettingsBrightnessIcon fontSize='small' />
              System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function App() {

  return (
    <div>
      <ModalSelect />
      <hr />
      <Typography variant="body2" color={'text.secondary'}> Dang Phuong dev </Typography>

      <Button variant="text" >Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

    </div>
  )
}

export default App
