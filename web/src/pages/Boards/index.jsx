import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2'

import { Link, useLocation } from 'react-router-dom'
import SidebarCreateBoardModal from './create'


import { styled } from '@mui/material/styles'
import { AppBar } from '~/components/AppBar'
import { fetchBoardsAPI } from '~/apis'
import { DEFAULT_ITEMS_PER_PAGE } from '~/Utils/constants'
import { CircularProgress } from '@mui/material'
import randomColor from 'randomcolor'

const SidebarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
    },
    '&.active': {
        color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
    }
}))


function Boards() {
    const [boards, setBoards] = useState([])
    const [totalBoards, setTotalBoards] = useState(null)


    const location = useLocation()


    const query = new URLSearchParams(location.search)


    const page = parseInt(query.get('page') || '1', 10)


    useEffect(() => {
        fetchBoardsAPI(location.search)
            .then(res => {
                setBoards(res.boards || [])
                setTotalBoards(res.totalBoards || 0)
            })
    }, [location.search])

    const afterCreateNewBoard = () => {
        fetchBoardsAPI(location.search)
            .then(res => {
                setBoards(res.boards || [])
                setTotalBoards(res.totalBoards || 0)
            })
    }


    // Lúc chưa tồn tại boards > đang chờ gọi api thì hiện loading
    if (!boards) {
        return <CircularProgress />

    }


    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
            <Box sx={{ paddingX: 2, my: 4 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={3}>
                        <Stack direction="column" spacing={1}>
                            <SidebarItem className="active">
                                <SpaceDashboardIcon fontSize="small" />
                                Boards
                            </SidebarItem>
                            <SidebarItem>
                                <ListAltIcon fontSize="small" />
                                Templates
                            </SidebarItem>
                            <SidebarItem>
                                <HomeIcon fontSize="small" />
                                Home
                            </SidebarItem>
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                        <Stack direction="column" spacing={1}>
                            <SidebarCreateBoardModal afterCreateNewBoard={afterCreateNewBoard} />
                        </Stack>
                    </Grid>

                    <Grid xs={12} sm={9} >
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Your boards:</Typography>

                        {boards?.length === 0 &&
                            <Typography variant="span" sx={{ fontWeight: 'bold', mb: 3 }}>No result found!</Typography>
                        }

                        {boards?.length > 0 &&
                            <Grid container spacing={2}>
                                {boards.map(b =>
                                    <Grid xs={2} sm={3} md={4} key={b}>
                                        <Card sx={{ width: '250px' }}>
                                            {b?.coverImage ?
                                                <Box
                                                    component={Link}
                                                    to={`/boards/${b._id}`}
                                                    sx={{
                                                        height: '150px',
                                                        backgroundImage: `url(${b?.coverImage})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        display: 'flex',
                                                        textDecoration: 'none',
                                                        color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                                                        transition: 'filter 0.3s ease-in-out, opacity 0.3s ease-in-out',
                                                        filter: 'brightness(100%)',
                                                        '&:hover': {
                                                            filter: 'brightness(120%)'
                                                        }
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                                        <Typography gutterBottom variant="h6" component="div">
                                                            {b?.title}
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                                :
                                                <Box
                                                    component={Link}
                                                    to={`/boards/${b._id}`}
                                                    sx={{
                                                        height: '150px',
                                                        backgroundColor: `${randomColor()}B3`,
                                                        border: `1px solid ${randomColor()}`,
                                                        borderRadius: '8px',
                                                        display: 'flex',
                                                        textDecoration: 'none',
                                                        color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                                                        transition: 'background-color 0.3s ease-in-out',
                                                        '&:hover': {
                                                            backgroundColor: (theme) =>
                                                                theme.palette.mode === 'dark' ? '#1A2027' : 'rgba(0, 0, 0, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                                        <Typography gutterBottom variant="h6" component="div">
                                                            {b.title}
                                                        </Typography>
                                                    </CardContent>
                                                </Box>

                                            }

                                        </Card>
                                    </Grid>
                                )}
                            </Grid>
                        }


                        {/* Trường hợp gọi API và có totalBoards trong Database trả về thì render khu vực phân trang  */}
                        {(totalBoards > 0) &&
                            <Box sx={{ my: 3, pr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Pagination
                                    size="large"
                                    color="secondary"
                                    showFirstButton
                                    showLastButton
                                    count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                                    page={page}
                                    renderItem={(item) => (
                                        <PaginationItem
                                            component={Link}
                                            to={`/boards${item.page === 1 ? '' : `?page=${item.page}`}`}
                                            {...item}
                                        />
                                    )}
                                />
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}


export default Boards