import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const HouseCard = ({
  image,
  title,
  location,
  furnishingStatus,
  waterSupply,
  onClick,
  onDelete,
}) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "16px" }} onClick={onClick}>
      <CardActionArea>
        <CardMedia component='img' height='140' image={image} alt='image' />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Furnishing Status - {furnishingStatus} <br />
            Water Supply - {waterSupply} <br />
            Location - {location}
          </Typography>
        </CardContent>
      </CardActionArea>
      {onDelete && (
        <CardActions>
          <Button
            color='error'
            size='small'
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default HouseCard;
