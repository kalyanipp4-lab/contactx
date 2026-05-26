import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Add from "./components/Add";
import View from "./components/View";
import ContactList from "./components/Contact";
import CategoryPage from "./components/Categorypage";
import Profile from "./components/Profile"; 
import Admin from "./components/Admin";
  
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<Add />} />
        <Route path="/view" element={<View />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;