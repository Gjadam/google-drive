import axios from "axios";
const localStorageData = JSON.parse(localStorage.getItem("user"))

const apiRequest = axios.create({
    baseURL: "http://fastdrivev2.pythonanywhere.com/api",
    headers : { 
        'Authorization': `Token ${localStorageData.token}`
    }
})

export default apiRequest