import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MovieApp from "./page/MovieApp";
import MovieDescription from "./page/MovieDescription";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<MovieApp />} />
        <Route path="/description/:id" element={<MovieDescription />} />

      </Routes>
    </Router>
  );
}

export default App;
