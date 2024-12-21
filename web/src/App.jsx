import { useState } from 'react'
import { Button } from '@mui/material';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>hello</p>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
