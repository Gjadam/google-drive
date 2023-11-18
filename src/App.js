import { useRoutes } from 'react-router-dom';
import './App.css';
import AuthContext from './context/authContext';
import routes from './routes';
import { useEffect, useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false)
  const [userInfos, setUserInfos] = useState({})

  const router = useRoutes(routes)

  const login = (token) => {
    setToken(token)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify({ token }))
  }

  const logout = () => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    if (localStorageData) {
      fetch(`http://fastdrive.pythonanywhere.com/api/users/me/`, {
        headers: {
          'Authorization': `Token ${localStorageData.token}`
        }
      }).then(res => res.json())
      .then(userData => {
        setIsLoggedIn(true)
        setUserInfos(userData)
      })
    }
  }, [login])

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
      userInfos,
      login,
      logout,
    }}>
      {router}
    </AuthContext.Provider>

  );
}

export default App;
