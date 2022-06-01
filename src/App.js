import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/navBar";
import Home from "./pages/home";
import Login from "./pages/login";
import Post from "./pages/post";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
