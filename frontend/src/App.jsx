import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateShoe from './pages/CreateShoe';
import ShowShoe from './pages/ShowShoe';
import EditShoe from './pages/EditShoe';
import DeleteShoe from './pages/DeleteShoe';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shoes/create' element={<CreateShoe />} />
      <Route path='/shoes/details/:id' element={<ShowShoe />} />
      <Route path='/shoes/edit/:id' element={<EditShoe />} />
      <Route path='/shoes/delete/:id' element={<DeleteShoe />} />
    </Routes>
  );
};

export default App;