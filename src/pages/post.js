import {
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CameraIcon from "@mui/icons-material/Camera";
import { useRef, useState } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { imagesRef, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Post = () => {
  // States
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [furnishingStatus, setFurnishingStatus] = useState("semi");
  const [waterSupply, setWaterSupply] = useState("borewell");
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const fileInputRef = useRef();

  // Methods
  const handleSubmitPost = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const image = fileInputRef.current.files[0];

    if (!image) {
      alert("Please select an image");
      return;
    }
    if (title.trim() === "") {
      alert("Please enter a title");
      return;
    }
    if (title.trim() === "") {
      alert("Please enter location");
      return;
    }

    // Upload image
    const uploadResult = await uploadBytes(
      ref(imagesRef, `${Date.now()}-${image.name}`),
      image
    );
    const downloadUrl = await getDownloadURL(uploadResult.ref);

    // Save post to firestore
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        image: downloadUrl,
        title,
        location,
        furnishingStatus,
        waterSupply,
      });
      window.location = "/";
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <Container maxWidth='xs'>
      <Typography mt={4} variant='h4'>
        New post
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmitPost}
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'>
        <input
          type='file'
          accept='image/*'
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(event) => {
            let reader = new FileReader();
            reader.onload = (e) => {
              setImage(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
          }}
        />
        <Card
          onClick={() => {
            fileInputRef.current.click();
          }}
          style={{
            backgroundColor: "lightsteelblue",
            width: "100%",
            height: 180,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            margin: "16px 0",
            cursor: "pointer",
          }}>
          {image ? (
            <img
              src={image}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <CameraIcon color='white' style={{ fontSize: 48 }} />
          )}
        </Card>

        <TextField
          id='outlined-required'
          size='small'
          label='Title'
          fullWidth
          margin='normal'
          placeholder='Eg. 2 BHK Apartment for rent'
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <TextField
          id='outlined-required'
          size='small'
          label='Location'
          fullWidth
          margin='normal'
          placeholder='Eg. Dhanori'
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />

        <Box display='flex' justifyContent='space-between' width='100%'>
          <FormControl margin='normal'>
            <FormLabel id='demo-controlled-radio-buttons-group'>
              Furnishing Status
            </FormLabel>
            <RadioGroup
              aria-labelledby='demo-controlled-radio-buttons-group'
              name='controlled-radio-buttons-group'
              value={furnishingStatus}
              onChange={(event) => {
                setFurnishingStatus(event.target.value);
              }}>
              <FormControlLabel
                value='semi'
                control={<Radio />}
                label='Semi Furnish'
              />
              <FormControlLabel
                value='fully'
                control={<Radio />}
                label='Fully Furnish'
              />
            </RadioGroup>
          </FormControl>

          <FormControl margin='normal'>
            <FormLabel id='demo-controlled-radio-buttons-group'>
              Water Supply
            </FormLabel>
            <RadioGroup
              aria-labelledby='demo-controlled-radio-buttons-group'
              name='controlled-radio-buttons-group'
              value={waterSupply}
              onChange={(event) => {
                setWaterSupply(event.target.value);
              }}>
              <FormControlLabel
                value='borewell'
                control={<Radio />}
                label='Borewell'
              />
              <FormControlLabel
                value='corporation'
                control={<Radio />}
                label='Corporation'
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Button
          disabled={isLoading}
          onClick={handleSubmitPost}
          type='submit'
          variant='outlined'
          style={{ marginTop: 16 }}
          fullWidth>
          <Typography variant='button'>Post</Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default Post;