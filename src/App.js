import { useRoutes } from 'react-router-dom';
import './App.css';
import AuthContext from './context/authContext';
import routes from './routes';
import { useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false)
  const [userInfos, setUserInfos] = useState({})

  const router = useRoutes(routes)

  const login = (token) => {
    setToken(token)
    localStorage.setItem('user', JSON.stringify({ token }))
  }

  const logout = () => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }

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
