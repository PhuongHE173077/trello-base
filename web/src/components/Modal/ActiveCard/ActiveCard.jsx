import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

import { Button, Popover } from '@mui/material'
import { styled } from '@mui/material/styles'
import { DateCalendar } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateCardDetailsAPI } from '~/apis'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { updatedCardInBoard } from '~/redux/activeBoard/activeBoardSlice'
import { clearCard, selectCurrentActiveCard, updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { CARD_MEMBER_ACTION } from '~/Utils/constants'
import { singleFileValidator } from '~/Utils/validators'
import CardActivitySection from './CardActivitySection'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardUserGroup from './CardUserGroup'
import dayjs from 'dayjs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
  backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
  padding: '10px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    '&.active': {
      color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
      backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
    }
  }
}))


function ActiveCard() {

  const [anchorEl, setAnchorEl] = useState(null);

  const [startDateUpdate, setStartDateUpdate] = useState(null)
  const [endDateUpdate, setEndDateUpdate] = useState(null)

  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    setStartDateUpdate(null)
    setEndDateUpdate(null)
  }, [])

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    console.log("Selected Date:", newDate.format("YYYY-MM-DD"));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const dispath = useDispatch()

  const activeCard = useSelector(selectCurrentActiveCard)
  const currentUser = useSelector(selectCurrentUser)

  const handleCloseModal = () => {
    dispath(clearCard())
  }

  const callApiUpdateCard = async (updatedData) => {
    const updateCard = await updateCardDetailsAPI(activeCard._id, updatedData)

    dispath(updateCurrentActiveCard(updateCard))

    dispath(updatedCardInBoard(updateCard))

    return updateCard
  }

  const onUpdateCardTitle = (newTitle) => {
    callApiUpdateCard({ title: newTitle.trim() })
  }

  const onUpdateCardDescription = (description) => {
    callApiUpdateCard({ description: description })
  }

  const onUploadCardCover = (event) => {
    console.log(event.target?.files[0])
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', event.target?.files[0])

    toast.promise(
      callApiUpdateCard(reqData),
      {
        pending: 'Uploading card cover...',
        success: 'Card cover uploaded successfully',
        error: 'Failed to upload card cover'
      }
    )
  }

  const onAddCardComment = async (commentToAdd) => {
    await callApiUpdateCard({ commentToAdd })
  }

  const handleUpdateDate = async () => {
    const dueDate = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: selectedDate.format("YYYY-MM-DD"),
      status: false
    }
    await callApiUpdateCard({ dueDate })
    handleClose()
  }

  const checkStatusDoing = (startDate, endDate) => {
    const today = dayjs();

    if (today.isBefore(dayjs(startDate))) {
      return 'To Do';
    } else if (
      today.isSame(dayjs(startDate), 'day') ||
      today.isSame(dayjs(endDate), 'day') ||
      (today.isAfter(dayjs(startDate)) && today.isBefore(dayjs(endDate)))
    ) {
      return 'Doing';
    } else if (today.isAfter(dayjs(endDate))) {
      return 'Overdue';
    }
  }

  const handleDateRangeChange = (newDate) => {
    if (newDate[0] !== null && newDate[1] !== null) {
      setStartDateUpdate(newDate[0].format("YYYY-MM-DD"))
      setEndDateUpdate(newDate[1].format("YYYY-MM-DD"))
    }
  }

  const handleUpdateChangeDate = async () => {
    if (!startDateUpdate || !endDateUpdate) return
    const dueDate = {
      startDate: startDateUpdate,
      endDate: endDateUpdate,
      status: false
    }

    await callApiUpdateCard({ dueDate })

    handleClose()
  }


  const handleRemoveDate = async () => {
    const dueDate = {
      startDate: startDateUpdate,
      endDate: endDateUpdate,
      status: false
    }


    await callApiUpdateCard({ dueDate, type: 'delete' })

    handleClose()
  }




  return (
    <Modal
      disableScrollLock
      open={true}
      onClose={handleCloseModal}
      sx={{ overflowY: 'auto' }}>
      <Box sx={{
        position: 'relative',
        width: 900,
        maxWidth: 900,
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: '8px',
        border: 'none',
        outline: 0,
        padding: '40px 20px 20px',
        margin: '50px auto',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '12px',
          right: '10px',
          cursor: 'pointer'
        }}>
          <CancelIcon color="error" sx={{ '&:hover': { color: 'error.light' } }} onClick={handleCloseModal} />
        </Box>

        <Box sx={{ mb: 4 }}>
          {activeCard?.cover &&
            <img
              style={{ width: '100%', height: '320px', borderRadius: '6px', objectFit: 'cover' }}
              src={activeCard?.cover}
              alt="card-cover"
            />
          }

        </Box>

        <Box sx={{ mb: 1, mt: -3, pr: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCardIcon />

          {/* Feature 01: Xử lý tiêu đề của Card */}
          <ToggleFocusInput
            inputFontSize='22px'
            value={activeCard?.title}
            onChangedValue={onUpdateCardTitle} />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Left side */}
          <Grid xs={12} sm={9}>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Members</Typography>

              <Box display={'flex'} gap={5}>
                {/* Feature 02: Xử lý các thành viên của Card */}
                <CardUserGroup cardMemberIds={activeCard.memberIds} onUpdateCard={callApiUpdateCard} />
                {activeCard?.dueDate && activeCard?.dueDate?.startDate && (
                  <Button variant="contained"

                    color={
                      activeCard?.dueDate?.status ? 'success' :
                        (checkStatusDoing(activeCard?.dueDate?.startDate, activeCard?.dueDate?.endDate) === 'Doing' ? 'warning' :
                          (checkStatusDoing(activeCard?.dueDate?.startDate, activeCard?.dueDate?.endDate) === 'Overdue' ? 'error' : 'inherit'))}
                  >{activeCard?.dueDate?.status ?
                    <Typography style={{}}>Complete</Typography>
                    :
                    <Typography style={{
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>{checkStatusDoing(activeCard?.dueDate?.startDate, activeCard?.dueDate?.endDate)}</Typography>

                    }</Button>
                )}
              </Box>
              {activeCard?.dueDate && activeCard?.dueDate?.startDate && (
                <Box sx={{ mt: 2, cursor: 'pointer' }} onClick={handleClick}>
                  <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Dates</Typography>
                  <Typography sx={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px', width: '40%', display: 'flex', justifyContent: 'space-between' }}>

                    <Typography> {activeCard?.dueDate?.startDate} - {activeCard?.dueDate?.endDate}</Typography>

                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      {activeCard?.dueDate?.status ?
                        <Typography style={{ color: 'green' }}>Complete</Typography>
                        :
                        <Typography style={{
                          color: (checkStatusDoing(activeCard?.dueDate?.startDate, activeCard?.dueDate?.endDate) === 'Doing' ? 'warning' :
                            (checkStatusDoing(activeCard?.dueDate?.startDate, activeCard?.dueDate?.endDate) === 'Overdue' ? 'error' : 'info')),
                          fontWeight: '600',
                          fontSize: '14px'
                        }}>{checkStatusDoing(activeCard?.dueDate?.startDate, activeCard?.dueDate?.endDate)}</Typography>
                      }
                      <KeyboardArrowDownIcon fontSize='small' />
                    </Box>

                  </Typography>
                </Box>)}

            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>Description</Typography>
              </Box>

              {/* Feature 03: Xử lý mô tả của Card */}
              <CardDescriptionMdEditor
                cardDescriptionProps={activeCard?.description}
                handleUpdateCardDescription={onUpdateCardDescription}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DvrOutlinedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>Activity</Typography>
              </Box>

              {/* Feature 04: Xử lý các hành động, ví dụ comment vào Card */}
              <CardActivitySection
                cardComments={activeCard?.comments}
                onAddCardComment={onAddCardComment}
              />
            </Box>
          </Grid>

          {/* Right side */}
          <Grid xs={12} sm={3}>
            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Add To Card</Typography>
            <Stack direction="column" spacing={1}>
              {/* Feature 05: Xử lý hành động bản thân user tự join vào card */}
              {!activeCard?.memberIds?.includes(currentUser._id) &&
                <SidebarItem className="active" onClick={() => callApiUpdateCard({
                  incomingMemberInfor: {
                    userId: currentUser._id,
                    action: CARD_MEMBER_ACTION.ADD
                  }
                })}>
                  <PersonOutlineOutlinedIcon fontSize="small" />
                  Join
                </SidebarItem>
              }

              {/* Feature 06: Xử lý hành động cập nhật ảnh Cover của Card */}
              <SidebarItem className="active" component="label">
                <ImageOutlinedIcon fontSize="small" />
                Cover
                <VisuallyHiddenInput type="file" onChange={onUploadCardCover} />
              </SidebarItem>

              <SidebarItem><AttachFileOutlinedIcon fontSize="small" />Attachment</SidebarItem>
              <SidebarItem><LocalOfferOutlinedIcon fontSize="small" />Labels</SidebarItem>
              <SidebarItem><TaskAltOutlinedIcon fontSize="small" />Checklist</SidebarItem>
              <SidebarItem onClick={handleClick}><WatchLaterOutlinedIcon fontSize="small" />Dates</SidebarItem>
              <SidebarItem><AutoFixHighOutlinedIcon fontSize="small" />Custom Fields</SidebarItem>
            </Stack>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}

            >
              {(!activeCard?.dueDate || !activeCard?.dueDate?.startDate) ?
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar value={selectedDate} onChange={handleDateChange} />
                    <Box sx={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                      <Box>
                        <p>Start Date:</p>
                        {dayjs().format("YYYY-MM-DD")}
                      </Box>
                      <Box>
                        <p>Due Date:</p>
                        {selectedDate.format("YYYY-MM-DD")}
                      </Box>
                    </Box>


                  </LocalizationProvider>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }} >
                    <Button onClick={handleUpdateDate} variant='contained' sx={{
                      width: '80%',
                      '&:hover': {
                        backgroundColor: '#e056fd'
                      },
                      marginBottom: '10px'
                    }}>Save</Button>

                  </Box >


                </>
                :
                <Box mr={2}>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
                      <DateRangeCalendar
                        defaultValue={[dayjs(activeCard?.dueDate?.startDate), dayjs(activeCard?.dueDate?.endDate)]}
                        onChange={handleDateRangeChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <Typography>  {startDateUpdate && endDateUpdate ? `Start Date: ${startDateUpdate} ` : `Start Date: ${activeCard?.dueDate?.startDate} `}</Typography>
                    <Typography>  {startDateUpdate && endDateUpdate ? `-End Date: ${endDateUpdate}` : `-End Date: ${activeCard?.dueDate?.endDate}`}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                      <Button onClick={handleUpdateChangeDate} variant='contained' sx={{
                        width: '100%',
                        '&:hover': {
                          backgroundColor: '#e056fd'
                        }
                      }}>Update</Button>
                    </Box >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button onClick={handleRemoveDate} variant='contained' sx={{
                        width: '100%', '&:hover': {
                          backgroundColor: '#e056fd'
                        }
                      }}>Remove</Button>
                    </Box>
                  </Box>


                </Box>

              }

            </Popover>
            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Power-Ups</Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem><AspectRatioOutlinedIcon fontSize="small" />Card Size</SidebarItem>
              <SidebarItem><AddToDriveOutlinedIcon fontSize="small" />Google Drive</SidebarItem>
              <SidebarItem><AddOutlinedIcon fontSize="small" />Add Power-Ups</SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Actions</Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem><ArrowForwardOutlinedIcon fontSize="small" />Move</SidebarItem>
              <SidebarItem><ContentCopyOutlinedIcon fontSize="small" />Copy</SidebarItem>
              <SidebarItem><AutoAwesomeOutlinedIcon fontSize="small" />Make Template</SidebarItem>
              <SidebarItem><ArchiveOutlinedIcon fontSize="small" />Archive</SidebarItem>
              <SidebarItem><ShareOutlinedIcon fontSize="small" />Share</SidebarItem>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ActiveCard