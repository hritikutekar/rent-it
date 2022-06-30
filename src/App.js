import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { green, purple, blueGrey } from "@mui/material/colors";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/navBar";
import Detail from "./pages/detail";
import Home from "./pages/home";
import Login from "./pages/login";
import MyPosts from "./pages/myPosts";
import Post from "./pages/post";
import Register from "./pages/register";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6C63FF",
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/post' element={<Post />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/my-posts' element={<MyPosts />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
