import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HouseCard from "../components/houseCard";
import { auth, postsCol } from "../firebase";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser) getPosts();
  }, [currentUser]);

  const getPosts = async () => {
    setIsLoading(true);
    const myPostQuery = query(
      postsCol,
      where("createdBy", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(myPostQuery);
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id });
    });
    setPosts(list);
    setIsLoading(false);
  };

  const deletePost = async (id) => {
    await deleteDoc(doc(postsCol, id));
    await getPosts();
  };

  return (
    <Box>
      {isLoading && (
        <Box position='absolute' left='50%' bottom='45%'>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && posts.length === 0 && (
        <Box
          position='absolute'
          style={{
            left: "calc(50% - 150px)",
            top: "calc(50% - 150px)",
          }}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'>
          <img src='images/undraw_void_3ggu.png' width={300} />
          <Typography variant='h5' mt={2}>
            No posts yet
          </Typography>
        </Box>
      )}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 16 }}>
        {posts.map((post, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <HouseCard
              key={index}
              image={post.image}
              furnishingStatus={post.furnishingStatus}
              location={post.location}
              title={post.title}
              waterSupply={post.waterSupply}
              onClick={() => navigate(`/detail/${post.id}`)}
              onDelete={() => {
                deletePost(post.id);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyPosts;
