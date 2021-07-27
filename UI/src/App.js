import { BrowserRouter } from 'react-router-dom';
import MainNav from '../src/Components/Navigation/MainNav'
import './App.css'
import Footer from './Components/Footer/Footer';
import MainRoute from './Routes/MainRoute';

function App() {
  return (
    <BrowserRouter>
      <MainNav />
      <MainRoute />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
