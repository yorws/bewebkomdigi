import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Aboutus from './pages/Aboutus.jsx';
import Ourteam from './pages/Ourteam.jsx';
import Product from './pages/Product.jsx';
import Ecosystem from './pages/Ecosystem.jsx';
import Career from './pages/Career.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/ourteam" element={<Ourteam />} />
        <Route path='/product' element={<Product />} />
        <Route path='/ecosystem' element={<Ecosystem />} />
        <Route path='/career' element={<Career />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;