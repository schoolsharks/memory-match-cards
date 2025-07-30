import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroScreen from './pages/IntroScreen';
import GameScreen from './pages/GameScreen';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
