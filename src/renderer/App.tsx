import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import MainWindow from './components/main_window';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainWindow />} />
      </Routes>
    </Router>
  );
}
