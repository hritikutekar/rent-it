import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

const Detail = () => {
  const { id } = useParams();

  // States
  const [post, setPost] = useState();

  // Effects
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const post = await getDoc(doc(db, "posts", id));
    setPost(post.data());
  };

  return (
    <Container>
      {!post ? (
        <Box position='absolute' left='50%' bottom='45%'>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={2}>
          <Box display='flex' flexDirection='row'>
            <img
              src={post.image}
              height={300}
              width={500}
              style={{ objectFit: "cover" }}
            />
            <Box display='flex' flexDirection='column'>
              <Typography ml={2} variant='h4'>
                {post.title}
              </Typography>
              <Typography ml={2} variant='h5' color='gray'>
                {post.location}
              </Typography>

              <Box
                display='flex'
                flex={1}
                flexDirection='column'
                justifyContent='center'>
                <Typography ml={2} variant='h5'>
                  Rent: ₹{post.rent}
                </Typography>
                <Typography ml={2} variant='h5' mt={1.5}>
                  Deposit: ₹{post.deposit}
                </Typography>
              </Box>

              <Typography ml={2} variant='h6' color='gray'>
                Contact number:{" "}
                {post.phoneNumber ? post.phoneNumber : "not provided"}
              </Typography>
              <Typography ml={2} variant='h6' color='gray'>
                WhatsApp:{" "}
                <a href={`https://wa.me/91${post.phoneNumber}`} target='_blank'>
                  open WhatsApp
                </a>
              </Typography>
            </Box>
          </Box>

          <Box mt={2}>
            <ul>
              <li>
                <Typography variant='h5' color='gray'>
                  Furnishing Status: {post.furnishingStatus}
                </Typography>
              </li>
              <li>
                <Typography variant='h5' color='gray'>
                  Water Supply: {post.waterSupply}
                </Typography>
              </li>
            </ul>

            <Box display='flex' mt={2}>
              <Grid container spacing={1}>
                {post.images.map((el) => (
                  <Grid item xs={2}>
                    <img
                      src={el}
                      height={180}
                      width={180}
                      style={{ objectFit: "cover" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Detail;
