import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router';

import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ErrorBoundary from './components/Common/ErrorBoundary';

import Header from './components/Header';
import Catalog from './components/Catalog/Catalog';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout/Logout';
import Home from './components/Home';
import Create from './components/Create';
import About from './components/About';
import Notification from './components/Common/Notification';
import GuardedRoute from './components/Common/GuardedRoute';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';


function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
    <NotificationProvider>

    <div id="container">
         <Header/>
      
         <Notification />

      <main className = "content">
          <Routes>
          <Route path ="/catalog/*" element={<Catalog/>} />
         
          <Route path ="/login" element={<Login/>} />
          <Route path ="/register" element={<Register/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/details/:furnitureId" element={<Details />} />
          <Route path="/" element={<Home />} />
          <Route element={<GuardedRoute />}>
                  <Route path ="/about" element={<About/>} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/edit/:furtnitureId" element={<Edit />} />
               </Route>
          </Routes>

      </main>
      <footer id="footer">
          <p>The best place to sell and find the furniture you are looking for! </p>
      </footer>
    </div>
    </NotificationProvider>
    </AuthProvider>
    </ErrorBoundary>
    
  )
}

export default App;
