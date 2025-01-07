import { ToastContainer } from "react-toastify"
import { Board } from "~/pages/Boards/_id"

function App() {
  return (
    <>
      <Board />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
      />
    </>
  )
}

export default App
