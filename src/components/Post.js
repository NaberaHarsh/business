import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

    },

    root: {
width:300

    }
})

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            button: 0,
            menu:null,
data:[
    {
        image:'https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg',
        title:'Book',
        desc:'This is very impressive book',
        price:'499'
    },
    {
        image:'https://specials-images.forbesimg.com/imageserve/5d35eacaf1176b0008974b54/960x0.jpg?cropX1=790&cropX2=5350&cropY1=784&cropY2=3349',
        title:'Car',
        desc:'This is very impressive Car',
        price:'50,55,000'
    },
    {
        image:'https://auto.ndtvimg.com/bike-images/colors/yamaha/fz-s-v20-fi/yamaha-fz-s-v20-fi-lightning-cyan.webp?v=1',
        title:'Bike',
        desc:'This is very impressive Bike',
        price:'55,000'
    }
]
        }

    }

     handleClick = event => {
        this.setState({menu:event.currentTarget});
      };
    
       handleClose = () => {
       this.setState({menu:null});
      };

    render() {
        const { classes } = this.props;

        return (
            <div>

      <Container maxwidth='sm'>
          <div style={{paddingTop:"20px"}}>
              <Grid container spacing={2}>
                  {this.state.data.map((product)=>

                  <Card className={classes.root} style={{marginLeft:'20px'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            H
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon 
            onClick={this.handleClick}
            />
             <Menu
           id="simple-menu"
           anchorEl={this.state.menu}
           keepMounted
           open={Boolean(this.state.menu)}
           onClose={this.handleClose}
         >
           <MenuItem onClick={this.handleClose}>Edit</MenuItem>
           <MenuItem onClick={this.handleClose}>Delete</MenuItem>
         </Menu>
          </IconButton>
          
        }
        title={product.title}
      />
      <CardMedia
        style={{height:'140px'}}
        image={product.image}
      />
      <CardContent>
    <Typography variant="h6">{product.price}</Typography> 
        <Typography variant="body2" color="textSecondary" component="p">
          {product.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      
      </CardActions>
          </Card>
)}
              </Grid>
          </div>
        
      </Container>
 

            </div>
        )
    }
}

export default withStyles(styles)(Post);
