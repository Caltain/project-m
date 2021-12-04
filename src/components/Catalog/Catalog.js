import {Routes, Route} from 'react-router-dom'

import FurnitureList from '../FurnitureList';


const Catalog = () => {
    return (
        <section id="catalog-page" className="catalog">
       

            <section>
                
                    <h1>Furniture</h1>
              <Routes>
                 <Route path="/" element={<FurnitureList />} />
              </Routes>
                
            </section>

        </section>
        
    );
}

export default Catalog;