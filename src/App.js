

import { Routes, Route } from 'react-router';
import Catalog from './components/Catalog/Catalog';

import Header from './components/Header';

function App() {
  return (
    <div id="container">
         <Header/>
     
      <main className = "site-content">
          <Routes>
          <Route path ="/catalog/*" element={<Catalog/>} />
          </Routes>

      </main>

    </div>
  )
}

export default App;
