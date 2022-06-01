import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import HouseCard from "../components/houseCard";
import { postsCol } from "../firebase";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(postsCol);
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setPosts(list);
    setIsLoading(false);
  };

  return (
    <Box>
      {isLoading && (
        <Box position='absolute' left='50%' bottom='45%'>
          <CircularProgress />
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
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
