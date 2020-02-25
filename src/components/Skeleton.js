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

const useStyles = makeStyles(theme => ({
    
  card: {
    maxWidth: 345,
    marginTop: theme.spacing(12),
    width:'100%',
    position:"fixed"
  },
  media: {
    height: 200,
  },
}));

function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();
  const {name, price, description, startDate, endDate, photo} = props;

  return (
      <div className={classes.root} >
    <Card className={classes.card} >
      <CardHeader
        avatar={
         
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
         
        }
        action={
             null 
                  }
        title={
          name != null ? 
          name
          :
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} /> 
                     
        }
      />
      {photo != null ?
      photo.map(file =>
<img  src={file.preview} />
        )
       :
      <Skeleton animation="wave" variant="rect" className={classes.media} />

      }
      

      <CardContent>
      <Typography variant="h6">
        {price || (startDate && endDate)   != null 
       ?
         price || (`${startDate}-${endDate}`)
         
       : 
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
       }
       </Typography>
       
<Typography variant="h6">
        {startDate && endDate != null 
       ?
            startDate - endDate  
       : 
       <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
      }
      </Typography>

       <Typography variant="h6">
        {description != null 
       ?
         description        
       : 
       <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
      }
      </Typography>



          
       
      </CardContent>
    </Card>
    </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Facebook(props) {
const {name, price, description, startDate, endDate, photo} = props
 console.log(name, price, description, startDate, endDate, photo)
  return (
    <div>
      <Media loading name={name} price={price} description={description} startDate={startDate} endDate={endDate} photo={photo}/>
    </div>
  );
}