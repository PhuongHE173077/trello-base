import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  useColorScheme
} from '@mui/material/styles';
import React from 'react';
export const ModalSelect = () => {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          size='small'
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
