import FileInfo from "./Pages/FileInfo/FileInfo"
import Index from "./Pages/Index/Index"
import NotFound from "./Pages/NotFound/NotFound"


const routes = [
    { path: '/', element: <Index />},
    { path: '/file-info/:fileName', element: <FileInfo /> },
    { path: '*', element: <NotFound /> },
]

export default routes