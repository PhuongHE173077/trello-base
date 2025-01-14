import { Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Board } from "~/pages/Boards/_id"
import NotFound from "./pages/404/NotFound"
import SignInSide from "./pages/Auth/sign-in/Login"
import SignUp from "./pages/Auth/sign-up/SignUp"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/boards/678600f8c016a1df3cb4dff1`} />} replace={true} />

        <Route path="/boards/:boardId" element={<Board />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/login" element={<SignInSide />} />

        <Route path="/register" element={<SignUp />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
      />
    </>
  )
}

export default App
