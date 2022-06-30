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
  Grid,
} from "@mui/material";
import CameraIcon from "@mui/icons-material/Camera";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef, useState } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { imagesRef, db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { purple } from "@mui/material/colors";

const Post = () => {
  // States
  const [image, setImage] = useState();
  const [images, setImages] = useState([]);
  const [imagesFile, setImagesFile] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [furnishingStatus, setFurnishingStatus] = useState("semi");
  const [waterSupply, setWaterSupply] = useState("borewell");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const fileInputRef = useRef();
  const filesInputRef = useRef();

  // Methods
  const handleSubmitPost = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const image = fileInputRef.current.files[0];

    if (!image) {
      alert("Please select an image");
      setIsLoading(false);
      return;
    }
    if (title.trim() === "") {
      alert("Please enter a title");
      setIsLoading(false);
      return;
    }
    if (location.trim() === "") {
      alert("Please enter location");
      setIsLoading(false);
      return;
    }
    if (phoneNumber.trim() === "") {
      alert("Please enter contact no.");
      setIsLoading(false);
      return;
    }
    if (rent.trim() === "") {
      alert("Please enter rent amount");
      setIsLoading(false);
      return;
    }
    if (deposit.trim() === "") {
      alert("Please enter deposit amount");
      setIsLoading(false);
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
      await addDoc(collection(db, "posts"), {
        image: downloadUrl,
        title,
        location,
        furnishingStatus,
        waterSupply,
        phoneNumber,
        rent,
        deposit,
        createdBy: auth.currentUser.uid,
        images: await uploadImages(),
      });
      window.location = "/";
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Something went wrong");
    }

    setIsLoading(false);
  };

  const uploadImages = async () => {
    return await Promise.all(
      Array.from(filesInputRef.current.files).map(async (file) => {
        // Upload image
        const uploadResult = await uploadBytes(
          ref(imagesRef, `${Date.now()}-${file.name}`),
          file
        );
        return await getDownloadURL(uploadResult.ref);
      })
    );
  };

  return (
    <Container maxWidth='xs'>
      <Typography mt={4} variant='h4' textAlign='center'>
        New post
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmitPost}
        display='flex'
        justifyContent='center'
        alignItems='center'
        pb='10%'
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
            backgroundColor: "#6C63FF",
            width: "100%",
            height: 180,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            margin: "16px 0",
            cursor: "pointer",
            color: "white",
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

        <Box width='100%' display='flex' flexGrow={1} flexWrap='wrap'>
          <input
            type='file'
            accept='image/*'
            style={{ display: "none" }}
            ref={filesInputRef}
            multiple
            onChange={(event) => {
              setImages([]);
              Array.from(event.target.files).forEach((file) => {
                let reader = new FileReader();
                reader.onload = (e) => {
                  setImages((prevState) => [...prevState, e.target.result]);
                };

                reader.readAsDataURL(file);
              });
            }}
          />

          <Grid container spacing={1} mt={1} mb={1}>
            <Grid item xs={2}>
              <Card
                onClick={() => {
                  filesInputRef.current.click();
                }}
                style={{
                  backgroundColor: "#6C63FF",
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  cursor: "pointer",
                  borderRadius: 4,
                  marginRight: 8,
                  color: "white",
                }}>
                <AddIcon color='white' style={{ fontSize: 32 }} />
              </Card>
            </Grid>

            {images.map((el) => {
              return (
                <Grid item xs={2} position='relative'>
                  <img
                    src={el}
                    style={{
                      objectFit: "cover",
                      width: 60,
                      height: 60,
                      borderRadius: 4,
                      marginRight: 8,
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <TextField
          id='outlined-required'
          size='small'
          label='Property name'
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
          label='Address'
          fullWidth
          margin='normal'
          placeholder='Eg. Dhanori'
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />

        <TextField
          id='outlined-required'
          size='small'
          label='Contact no.'
          type='tel'
          fullWidth
          margin='normal'
          placeholder='Eg. 9876543210'
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />

        <TextField
          id='outlined-required'
          size='small'
          label='Rent'
          type='number'
          fullWidth
          margin='normal'
          placeholder='Eg. 5000'
          onChange={(event) => {
            setRent(event.target.value);
          }}
        />

        <TextField
          id='outlined-required'
          size='small'
          label='Deposit'
          type='number'
          fullWidth
          margin='normal'
          placeholder='Eg. 10000'
          onChange={(event) => {
            setDeposit(event.target.value);
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
