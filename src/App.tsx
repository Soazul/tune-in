import React from 'react';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import LandingPage from './home_page/landing_page';
import Timer from './timer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div>
      <LandingPage/>
      <Timer/>
    </div>
    // <HashRouter>
    //   <div>
    //     <Routes>
    //       <Route path="/" element={<LandingPage />} />
    //       <Route path ='/timer' element={<Timer/>}/>
          
    //       {/* Define other routes here */}
    //     </Routes>
    //   </div>
    // </HashRouter>
  );
}

