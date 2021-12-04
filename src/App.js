
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router';
import Catalog from './components/Catalog/Catalog';

import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';

function App() {
  return (
    <AuthContext.Provider >

    <div id="container">
         <Header/>
     
      <main className = "content">
          <Routes>
          <Route path ="/catalog/*" element={<Catalog/>} />
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
