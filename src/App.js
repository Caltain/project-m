import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router';

import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/Common/ErrorBoundary';

import Catalog from './components/Catalog/Catalog';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout/Logout';
import Home from './components/Home';
import Create from './components/Create';
import About from './components/About';




const initialAuthState = {
  _id:"",
  email:"",
  accessToken:""
}

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>

    <div id="container">
         <Header/>
      
      <main className = "content">
          <Routes>
          <Route path ="/catalog/*" element={<Catalog/>} />
          <Route path ="/about" element={<About/>} />
          <Route path ="/create" element={<Create />} />
          <Route path ="/login" element={<Login/>} />
          <Route path ="/register" element={<Register/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />

          </Routes>

      </main>
      <footer id="footer">
          <p>The best place to sell and find the furniture you are looking for! </p>
      </footer>
    </div>
    </AuthProvider>
    </ErrorBoundary>
    
  )
}

export default App;
