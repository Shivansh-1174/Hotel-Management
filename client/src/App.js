import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import BookRoom from './Pages/BookRoom';
import ViewList from './Pages/ViewList'
import EditBookings from './Pages/EditBookings'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookRoom />} />
          <Route path="/viewList" element={<ViewList />} />
          <Route path="/editBooking/:id" element={<EditBookings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
