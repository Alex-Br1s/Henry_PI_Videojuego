import './App.css';
import LandingPage from './components/landing-page.jsx';
import { Routes, Route } from 'react-router-dom';
import './stylesheet/landing-page.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />}/>
      </Routes>
    </div>
  );
}

export default App;
