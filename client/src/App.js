import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Boite from './BoiteDeReception';
import Login from './Login';
function App() {
  return (
   <BrowserRouter>
   <Routes>

    {/* <Route path='/' element={<Boite/>}></Route> */}
    <Route path='/' element={<Login/>}></Route>



    
   </Routes>
   </BrowserRouter>
  
  );
}

export default App;
