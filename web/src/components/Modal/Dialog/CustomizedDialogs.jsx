import CloseIcon from '@mui/icons-material/Close';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, MenuItem, Tab, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createNewInvitationAPI } from '~/apis';
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "600px",
    maxWidth: "90%",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ open, setOpen }) {
  const [value, setValue] = React.useState('1');

  const [email, setEmail] = React.useState('')

  const [role, setRole] = React.useState('member')

  const activeBoard = useSelector(selectCurrentActiveBoard)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter email')
    } else {
      // console.log();

      toast.promise(
        createNewInvitationAPI({ inviteeEmail: email, role, boardId: activeBoard._id }),
        {
          pending: 'Inviting... ',
          success: 'Invited successfully',
        }
      )
    }
  }

  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Share board
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ width: '100%' }}>
          <form onSubmit={handleInvite}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TextField
                id="outlined-basic"
                size='small'
                type='email'
                sx={{ width: '65%' }}
                variant="outlined"
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField select value={role} size="small" onChange={(e) => setRole(e.target.value)}>
                <MenuItem value="member">MEMBER</MenuItem>
                <MenuItem value="admin">ADMIN </MenuItem>
              </TextField>
              <Button variant="contained" type='submit'>Invite</Button>
            </Box>
          </form>


          <Box sx={{ width: '100%' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Board members" value="1" />
                  <Tab label="Join requests" value="2" />

                </TabList>
              </Box>
              <TabPanel value="1">
                <Box>
                  {
                    activeBoard?.owners?.map((member) => (
                      <Box key={member?.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }} >
                          <Avatar
                            sx={{ width: 36, height: 36, cursor: 'pointer' }}
                            alt={member?.displayName}
                            src={member?.avatar}
                          />
                          <Typography variant='body2'>{member?.displayName}</Typography>
                        </Box>
                        <TextField select value='owner' size="small">
                          <MenuItem value="owner" >ADMIN </MenuItem>
                          <MenuItem value="member" disabled>
                            <Box >
                              <Typography variant='body2' >MEMBER</Typography>
                              <Typography variant='caption'>Board must have at least one admin</Typography>
                            </Box>
                          </MenuItem>
                        </TextField>
                      </Box>

                    ))
                  }

                  {
                    activeBoard?.members?.map((member) => (
                      <Box key={member?.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }} >
                          <Avatar
                            sx={{ width: 36, height: 36, cursor: 'pointer' }}
                            alt={member?.displayName}
                            src={member?.avatar}
                          />
                          <Typography variant='body2'>{member?.displayName}</Typography>
                        </Box>
                        <TextField select value='member' size="small">
                          <MenuItem value="member">MEMBER</MenuItem>
                          <MenuItem value="owner" disabled>ADMIN </MenuItem>
                        </TextField>
                      </Box>
                    ))
                  }
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box>

                  <Typography>There are no requests to join this board.</Typography>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}