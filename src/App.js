import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/navBar";
import Detail from "./pages/detail";
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
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
