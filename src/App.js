import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Movies from './components/movies';
import Customers from './pages/customers';
import Login from './pages/login';
import Registration from './pages/registration';
import MovieForm from './components/movieForm';
import Error from './pages/error';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <div className="container width">
        <Routes>
          <Route path='/customers' element={<Customers />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/registration' element={<Registration />}/>
          <Route path='/movies/:id' element={<MovieForm />}/>
          <Route path='/' element={<Movies />}/>
          <Route path='/MoviesApp-Using-React-Funtional-Component-' element={<Movies />}/>
          <Route path='*' element={<Error />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
