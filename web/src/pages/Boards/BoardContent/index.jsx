import { Box, Typography } from '@mui/material'
import MoreOption from '../BoardBar/MoreOption/MoreOption';
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "58px";
export const BoardContent = () => {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#66FFFF'),
        display: 'flex',

      }}
    >

      <Box sx={{
        minWidth: '300px',
        maxWidth: '300px',
        ml: 1,
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
        borderRadius: 2
      }}>
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            ml: 1,
            justifyContent: 'space-between'
          }}>
          <Typography >Column title</Typography>
          <MoreOption />
        </Box>

        <Box>
          List of cards
        </Box>

        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT
          }}
        >
          Footer
        </Box>

      </Box>
    </Box>
  )
}
