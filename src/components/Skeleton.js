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
    marginTop: theme.spacing(12)
  },
  media: {
    height: 190,
  },
}));

function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();

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
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
         
          
        }
        subheader={ <Skeleton animation="wave" height={10} width="40%" />}
      />
        <Skeleton animation="wave" variant="rect" className={classes.media} />

      <CardContent>
       
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
       
      </CardContent>
    </Card>
    </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Facebook() {
  return (
    <div>
      <Media loading />
    </div>
  );
}