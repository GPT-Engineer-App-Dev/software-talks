import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import CreateThread from "./pages/CreateThread.jsx";
import Thread from "./pages/Thread.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/create-thread" element={<CreateThread />} />
        <Route exact path="/thread/:id" element={<Thread />} />
      </Routes>
    </Router>
  );
}

export default App;