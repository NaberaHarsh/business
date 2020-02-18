import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid, CardHeader } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';



const styles = theme => ({
    paper: {
        display: "flex",
        flexDirection: "row",
    },
    root: {
        width:160
        
            }
})

class Files extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value: 0,
            button: 0,
            menu:null,
            data:[
                {
                      image:'https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/harrypotter-mosscovers.jpg',
                      title:'Harry Potter ',
                      desc:'This is Harry Potter collection',
                      price:'2499',
                    },
                    {
                      image:'https://www.nypl.org/sites/default/files/lesbooks_zps6c776c00.png',
                      title:'GOT',
                      desc:'This is Got book',
                      price:'2000',
                    }
                ,
                {
                    image:'https://images-na.ssl-images-amazon.com/images/I/61Fh66VqDPL._SX329_BO1,204,203,200_.jpg',
                    title:'13 Reason Why',
                    desc:'This is 13 reason why book',
                    price:'1500',
                },
                {
                  image:'https://images-na.ssl-images-amazon.com/images/I/81yAo5ElQlL.jpg',
                  title:'Fault in our stars',
                  desc:'This is fault in our stars book',
                  price:'500',
              },
              
            ]
            
        }

    }

    handleClick = event => {
        this.setState({menu:event.currentTarget});
      };
    
       handleClose = () => {
       this.setState({menu:null});
      };

    render(){

        const { classes } = this.props;

        return (
            <div >
                              <Grid container spacing={2}>
                 
                  {this.state.data.map((product)=>
                  <Card className={classes.root} style={{marginLeft:'20px', marginTop:'10px'}}>                        
      <CardMedia
    style={{height:'120px', width:'100%'}}
        image={product.image}
      />
      <CardHeader
       
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
           <MenuItem onClick={this.handleClose}>Remove</MenuItem>
         </Menu>
          </IconButton>
          
        }
    title={ <span style={{fontSize:'12px' }}>{product.title}</span>}
      />
     
          </Card>
)}
</Grid>
          </div>
    
        )
    }
}
export default withStyles(styles)(Files);