import {Routes, Route} from 'react-router-dom'

import FurnitureList from '../FurnitureList';


const Catalog = () => {
    return (
        <section id="catalog-page" className="catalog">
       

            <section>
                
                  
              <Routes>
                 <Route path="/" element={<FurnitureList />} />
              </Routes>
                
            </section>

        </section>
        
    );
}

export default Catalog;