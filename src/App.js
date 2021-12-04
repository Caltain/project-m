import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router';

import { AuthContext } from './contexts/AuthContext';
import useLocalStorage from './hooks/useLocalStorage';
import Catalog from './components/Catalog/Catalog';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout/Logout';




const initialAuthState = {
  _id:"",
  email:"",
  accessToken:""
}

function App() {
  const [user, setUser] = useLocalStorage('user', initialAuthState)

  const login = (authhData) => {
    setUser({id:authhData._id,
    email:authhData.email,
    accessToken:authhData.accessToken})
  }

  const logout = () => {
    setUser(initialAuthState)
  }
  return (
    <AuthContext.Provider value={{user,login,logout}} >

    <div id="container">
         <Header/>
     
      <main className = "content">
          <Routes>
          <Route path ="/catalog/*" element={<Catalog/>} />
          <Route path ="/login" element={<Login/>} />
          <Route path ="/register" element={<Register/>} />
          <Route path="/logout" element={<Logout />} />

          </Routes>

      </main>
      <footer id="footer">
          <p>The best place to find the furniture you are looking for! </p>
      </footer>
    </div>
    </AuthContext.Provider>
    
  )
}

export default App;
