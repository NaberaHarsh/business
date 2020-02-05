import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DragAndDrop from './Drag&Drop'
import CloseIcon from '@material-ui/icons/Close';


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
            file: null

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
        this.deleteImage = this.deleteImage.bind(this)

    }
    handleClick(e) {
        this.refs.fileUploader.click();

    }
    handleChange(event) {
        event.stopPropagation();
        event.preventDefault();
        // var send = event.target.files[0];
        var file = URL.createObjectURL(event.target.files[0])
        console.log(file);
        this.setState({ file: file });
    }

    handleChangeCategory(e) {
        this.setState({ value: e.target.value })
        console.log(e.target.value)
    };
    handleDrop = (file) => {
        let fileList = this.state.file
        for (var i = 0; i < file.length; i++) {
            if (!file.name) return
            fileList.push(file.name)
        }
        this.setState({ file: fileList })
    }

    handleChangeButton(p) {
        this.setState({ button: p.target.value })
        console.log(p.target.value)
    };

deleteImage(){
    this.setState({file:null})
}

    // get(){
    //     console.log("hello")
    //     this.setState({image:true})
    // }






    render() {

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
                        {this.state.file != null
                            ?
                            <div style={{textAlign:'right'}} >
                             <CloseIcon style={{alignSelf:'right'}} onClick={this.deleteImage} />
                                <img src={this.state.file} style={{ maxheight: "100%", maxWidth: "100%" }} />
                            </div>
                            :
                            <div class={classes.paper} style={{ paddingBottom: '40px' }}>
                                <AddAPhotoIcon style={{ color: '#1a73e8', fontSize: '36px' }} onClick={this.handleClick} />
                                <input type="file" id="file" ref="fileUploader" onChange={this.handleChange} accept="image/*" style={{ display: "none" }} />
                                <br />
                                <div style={{ color: '#1a73e8', fontSize: "16px" }}>Make your post stand out with a photo</div>
                            </div>
                        }
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
                        label="Product price"
                        name="price"
                        autoComplete="price"
                        autoFocus
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
                                helperText="Eg: google.com"

                            />
                            :
                            " "
                    }

                </form>
                <DragAndDrop handleDrop={this.handleDrop}>
                    <div >
                    </div>

                </DragAndDrop>

            </div>
        )
    }
}

export default withStyles(styles)(Product);
