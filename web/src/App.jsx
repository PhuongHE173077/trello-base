import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Board } from "~/pages/Boards/_id"
import NotFound from "./pages/404/NotFound"
import SignInSide from "./pages/Auth/sign-in/Login"
import SignUp from "./pages/Auth/sign-up/SignUp"
import { VerifyAccount } from "./pages/Auth/verifyAccount/VerifyAccount"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "./redux/user/userSlice"
import Settings from "./pages/Setting/Settings"
import Dashboard from "./pages/Boards"




const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />




  return <Outlet />
}
function App() {




  const currentUser = useSelector(selectCurrentUser)
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/boards/677aa7dfcc84b47c8bcc93ac`} />} replace={true} />


        <Route path="/boards" element={<Dashboard />} />


        <Route element={<ProtectedRoute user={currentUser} />}>




          <Route path="/boards/:boardId" element={<Board />} />




          <Route path="/settings/account" element={<Settings />} />




          <Route path="/settings/security" element={<Settings />} />




        </Route>




        <Route path="*" element={<NotFound />} />




        <Route path="/login" element={<SignInSide />} />




        <Route path="/register" element={<SignUp />} />




        <Route path="/acount/verify" element={<VerifyAccount />} />




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





