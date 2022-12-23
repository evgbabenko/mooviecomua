import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from "../Header/Header";
import Detail from '../Detail/Detail';
import Nav from "../Nav/Nav";
import Catalogue from '../Catalogue/Catalogue';
import Contact from "../Contact/Contact";


function App() {

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>  
          <Route index element={<Header />} />
          <Route path="/:cat" element={<Catalogue />} >
            <Route path=":page" element={<Catalogue />} />
          </Route>
          <Route path='/info'>
          <Route path=":info/:id" element={<Detail />} />
          </Route>
          <Route path="contacts" element={<Contact/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
