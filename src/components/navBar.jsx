import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const NavBar = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsAuthenticated(user !== null);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <img
            src='images/logo.png'
            height={50}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <div style={{ flex: 1 }} />
          {isAuthenticated !== undefined && (
            <Box display='flex' alignItems='center'>
              {auth.currentUser && (
                <Box display='flex' alignItems='center'>
                  <Typography mr={3}>{auth.currentUser.email}</Typography>
                  <Button
                    color='inherit'
                    style={{ marginRight: 12 }}
                    onClick={() => {
                      navigate("/my-posts");
                    }}>
                    My Posts
                  </Button>
                  <Button
                    color='inherit'
                    style={{ marginRight: 12 }}
                    onClick={() => {
                      navigate("/post");
                    }}>
                    Create Post
                  </Button>
                </Box>
              )}
              <Button
                color='inherit'
                onClick={async () => {
                  if (isAuthenticated) {
                    await auth.signOut();
                    window.location = "/";
                  } else {
                    navigate("/login");
                  }
                }}>
                {isAuthenticated ? "Logout" : "Login"}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
