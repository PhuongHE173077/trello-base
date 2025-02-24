
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { teal } from '@mui/material/colors'
import { fetchBoardsAPI } from '~/apis'
import { useDebounceFn } from '~/hooks/useDebounceFn'


function AutoCompleteSearchBoard() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [boards, setBoards] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) { setBoards(null) }
  }, [open])

  const handleInputSearchChange = (event) => {
    const searchValue = event.target?.value
    if (!searchValue) return
    console.log(searchValue)

    const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`
    console.log(searchPath)

    fetchBoardsAPI(searchPath)
      .then(res => {
        setBoards(res.boards || [])
      })
      .finally(() => setLoading(false))
  }


  // Làm useDebounceFn...

  const deboundSearchBoard = useDebounceFn(handleInputSearchChange, 500)

  const handleSelectedBoard = (event, selectedBoard) => {
    if (!selectedBoard) return
    navigate(`/boards/${selectedBoard._id}`)
  }

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      // Cái text này hiện ra khi boards là null hoặc sau khi đã fetch boards nhưng rỗng - không có kết quả
      noOptionsText={!boards ? 'Type to search board...' : 'No board found!'}

      // Cụm này để handle việc đóng mở phần kết quả tìm kiếm
      open={open}
      onOpen={() => { setOpen(true) }}
      onClose={() => { setOpen(false) }}

      // getOptionLabel: để thằng Autocomplete nó lấy title của board và hiển thị ra
      getOptionLabel={(board) => board.title}

      // Options của Autocomplete nó cần đầu vào là 1 Array, mà boards của chúng ta ban đầu cần cho null để làm cái noOptionsText ở trên nên đoạn này cần thêm cái || [] vào
      options={boards || []}

      isOptionEqualToValue={(option, value) => option._id === value._id}

      // Loading thì đơn giản rồi nhé
      loading={loading}

      // onInputChange sẽ chạy khi gõ nội dung vào thẻ input, cần làm debounce để tránh việc bị spam gọi API
      onInputChange={deboundSearchBoard}

      // onChange của cả cái Autocomplete sẽ chạy khi chúng ta select một cái kết quả (ở đây là board)
      onChange={handleSelectedBoard}

      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to search..."
          size="small"

          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          sx={{
            '& label': { color: teal[400] },
            '& input': { color: teal[400] },
            '& label.Mui-focused': { color: teal[400] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: teal[400] },
              '&:hover fieldset': { borderColor: teal[400] },
              '&.Mui-focused fieldset': { borderColor: teal[400] }
            },
            '.MuiSvgIcon-root': { color: teal[400] }
          }}
        />
      )}
    />
  )
}

export default AutoCompleteSearchBoard
