import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';


const useStyles = makeStyles(theme => ({
    
  card: {
    maxWidth: 345,
    marginTop: theme.spacing(12),
    width:'100%',
    position:"fixed"
  },
  media: {
    width:320,
    height: 220,
  },
}));

function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();
  const {name, price, desc, startDate, endDate,startTime, endTime, image} = props;
  return (
      <div className={classes.root} >
       <Card className={classes.root}>
      <CardActionArea>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            H
          </Avatar>
        }
       
        title={name}
      />
      <CardContent>
        <CardMedia
          className={classes.media}
              image={image.map(file=> file.preview)}
          
          title={`${name} image`}
        />
        
          <Typography gutterBottom variant="h5" component="h2">
           {price!= null ? price : ""} 
           {(startDate && endDate)   != null ? (`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()} - ${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()} `) : ""}

           {/* {(startDate && endDate)   != null ? (`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()} ${startTime==null ?" ": (`(${startTime.getHours()}: ${startTime.getMinutes()})`)  }  - ${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()} ${endTime==null? "" : (`(${endTime.getHours()}:${endTime.getMinutes()})`) }  `) : ""} */}
          </Typography>
          {/* {startTime!=null && endTime!=null ?
          <Typography>
{`${startTime.getHours()}:${startTime.getMinutes()} - ${endTime.getHours()}:${endTime.getMinutes()}`}
          </Typography>
        : ""
        } */}
          <Typography variant="body2" color="textSecondary" component="p">
           {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>

    </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Facebook(props) {
const {name, price, desc, startDate, endDate,startTime,endTime, image} = props
 console.log(name, price, desc, startDate, endDate,startTime, endTime, image)
  return (
    <div>
      <Media name={name} price={price} desc={desc} startDate={startDate} endDate={endDate} startTime={startTime} endTime={endTime} image={image}/>
    </div>
  );
}