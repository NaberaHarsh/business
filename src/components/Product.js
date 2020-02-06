import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DragAndDrop from './Drag&Drop'
import { Button } from '@material-ui/core';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

    },

    root: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "initial"

    }
})

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            button: 0,
            image: false,
            file: null,
            product_name:'',
            price:'',
            category:'',
            desc:'',
            link:''

        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)

    }
  

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
          [name]: value
        })
      }

      handleSubmit = e => {
        e.preventDefault()
        const { product_name, category, price, desc, link} = this.state;
        const userData = { product_name, category, price, desc, link };
        console.log(userData);
      }    

    handleChangeCategory(e) {
        this.setState({ value: e.target.value })
        console.log(e.target.value)
    };

    handleChangeButton(p) {
        this.setState({ button: p.target.value })
        console.log(p.target.value)
    };



    // get(){
    //     this.setState({image:true})
    // }






    render() {
        const { product_name, category, price, desc, link} = this.state;


        //         if(this.state.image === true){
        //             return(
        // <Image />
        //             )
        //         }
        const { classes } = this.props;

        return (
            <div>

                <Paper variant='outlined'>
                    <div>
                                <DragAndDrop/>   
                    </div>
                </Paper>
                <form className={classes.root} noValidate >
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="product"
                        label="Product Name"
                        name="product"
                        autoComplete="product"
                        autoFocus
                        // value={product_name}
                        onChange={this.handleChange}
                    />
                    <FormControl
                        className={classes.root} style={{ width: '70%' }}
                        variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Select a category
        </InputLabel>
                        <Select
                            native
                            value={this.state.value}
                            onChange={this.handleChangeCategory}
                        >
                            <option value="" />
                            <option value={1}>Create a new category</option>

                        </Select>
                    </FormControl>
                    {
                        this.state.value !== 0 ?
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="category"
                                label="Product Category"
                                name="category"
                                autoComplete="category"
                                autoFocus
                                value={category}
                                onChange={this.handleChange}
                                helperText="Eg: Education, HealthCare..."
                            />
                            :
                            " "
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Product price (INR)"
                        name="price"
                        autoComplete="price"
                        autoFocus
                        value={price}
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Product Description"
                        name="description"
                        autoComplete="description"
                        autoFocus
                        // value={desc}
                        onChange={this.handleChange}
                        multiline={true}
                    />
                    <FormControl
                        className={classes.root} style={{ width: '70%' }}
                        variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Select a button
        </InputLabel>
                        <Select
                            native
                            value={this.state.button}
                            onChange={this.handleChangeButton}
                        >
                            <option value="" />
                            <option value={1}>Order Online</option>
                            <option value={2}>Buy</option>
                            <option value={3}>Learn more</option>
                            <option value={4}>Get offer</option>


                        </Select>
                    </FormControl>
                    {
                        this.state.button !== 0 ?
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="link"
                                label="Link from your button"
                                name="link"
                                autoComplete="link"
                                autoFocus
                                value={link}
                                onChange={this.handleChange}
                                helperText="Eg: google.com"

                            />
                            :
                            " "
                    }
<Button onClick={()=>this.handleSubmit()}></Button>
                </form>

            </div>
        )
    }
}

export default withStyles(styles)(Product);
