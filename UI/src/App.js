import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import MainNav from '../src/Components/Navigation/MainNav'
import './App.css'
import Index from './Components/Index/Index';
import MainRoute from './Routes/MainRoute'

function App() {
  return (
    <BrowserRouter>
      <MainNav />
      <MainRoute />
    </BrowserRouter>
  );
}

export default App;
