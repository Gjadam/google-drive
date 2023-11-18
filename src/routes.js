import FileInfo from "./Pages/FileInfo/FileInfo"
import Index from "./Pages/Index/Index"
import LandingPage from "./Pages/LandingPage/LandingPage"
import Login from "./Pages/Login/Login"
import NotFound from "./Pages/NotFound/NotFound"
import SignUp from "./Pages/SignUp/SignUp"


const routes = [
    { path: '/', element: <LandingPage />},
    { path: '/fast-drive', element: <Index />},
    { path: '/file-info/:fileName', element: <FileInfo /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <NotFound /> },
]

export default routes