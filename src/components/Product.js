import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DragAndDrop from './Drag&Drop'
import { Button, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Image from './Image'
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ImageTab from './ImageTab'
import Files from './Files'

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    contain: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    inputRoot: {
        fontSize: 14
    },
    labelRoot: {
        fontSize: 14,

    },
    showImage:{
        marginBottom: theme.spacing(0),
        width:"100%",
        height:'100%'
    },    
    image: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        

    },
    root: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "initial",

    }
})


const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>

        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            image: [],
            button: 0,
            display: false,
            openImage: false,
            file: null,
            product_name: '',
            price: '',
            category: '',
            desc: '',
            link: '',
            open: false,
            imageDialog: true,
            tab: "upload"

        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.get = this.get.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.getImage = this.getImage.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    handleDisplay = () => {
        this.setState({ display: false });
    };
    handleToggle = () => {
        this.setState({ display: !this.state.display });
    };

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { image, product_name, category, price, desc, link } = this.state;
        const userData = { image, product_name, category, price, desc, link };
        console.log(userData);
        // this.props.handleData(userData);
        this.setState({image:'',product_name:'',category:'',price:'',desc:'',link:''})
    }

    handleChangeCategory(e) {
        this.setState({ value: e.target.value })
        console.log(e.target.value)
    };

    handleChangeButton(p) {
        this.setState({ button: p.target.value })
        console.log(p.target.value)
    };


    getImage(image) {
        this.setState({ image: image })
  }
    
    handleOpen() {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
        console.log(this.props.unit)
        // this.props.forTab(this.props.unit)

    };

    getValue(e) {
        console.log(e);
        if (e == 1) {
            this.setState({ tab: 'album' })
        }
        else {
            this.setState({ tab: 'upload' })
        }
    }

    render() {
        const { product_name, category, price, desc, link } = this.state;


        //         if(this.state.openImage === true){
        //             return(
        // <Image unit={this.props.unit} forTab={this.props.forTab}/>
        //             )
        //         }
        const { classes } = this.props;
        const { tab } = this.state;

        return (
            <div>
                <Container maxWidth="xs" className={classes.contain} >
                    <Paper style={{ marginTop: '10px', paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <div className={classes.contain}>
                            <Paper variant='outlined' style={{ width: "90%" }} >
                            {this.state.image.length != 0 
                              ?
                              <div className={classes.showImage}>
                              {this.state.image.map(file=> <img style={{width:'100%',height:'100%', paddingBottom:'0px'}} src={file.preview} /> )}
                                  </div>
                            :
                            <div className={classes.image} >
                            <AddAPhotoIcon onClick={() => { this.handleOpen() }} style={{ color: '#1a73e8', fontSize: '32px' }} />
                            <br />
                            <div style={{ color: '#1a73e8', textAlign: "center", fontSize: "14px" }}>Make your post stand out with a photo</div>
                        </div>}
                             
                               

                            </Paper>
                            <form noValidate >

                                <TextField
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.labelRoot,
                                            focused: classes.labelFocused
                                        }
                                    }}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="product"
                                    label="Product Name"
                                    name="product_name"
                                    autoComplete="product"
                                    autoFocus
                                    size="small"
                                    value={product_name}
                                    onChange={this.handleChange}
                                />
                                <FormControl
                                    className={classes.root} style={{ width: '70%' }}
                                    variant="outlined"
                                    size="small"
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.labelRoot,
                                            focused: classes.labelFocused
                                        }
                                    }}>

                                    <InputLabel htmlFor="outlined-age-native-simple"
                                        style={{ fontSize: "14px" }}
                                    >
                                        Select a category
        </InputLabel>
                                    <Select
                                        style={{ fontSize: "14px" }}
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
                                            InputProps={{ classes: { root: classes.inputRoot } }}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.labelRoot,
                                                    focused: classes.labelFocused
                                                }
                                            }}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="category"
                                            label="Product Category"
                                            name="category"
                                            autoComplete="category"
                                            autoFocus
                                            size="small"
                                            value={category}
                                            onChange={this.handleChange}
                                            helperText="Eg: Education, HealthCare..."
                                        />
                                        :
                                        " "
                                }
                                <TextField
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.labelRoot,
                                            focused: classes.labelFocused
                                        }
                                    }}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="price"
                                    label="Product price (INR)"
                                    name="price"
                                    autoComplete="price"
                                    autoFocus
                                    size="small"
                                    value={price}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.labelRoot,
                                            focused: classes.labelFocused
                                        }
                                    }}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Product Description"
                                    name="desc"
                                    autoComplete="description"
                                    autoFocus
                                    size="small"
                                    value={desc}
                                    onChange={this.handleChange}
                                    multiline={true}
                                />
                                <FormControl
                                    className={classes.root} style={{ width: '70%' }}
                                    variant="outlined"
                                    size="small"
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.labelRoot,
                                            focused: classes.labelFocused
                                        }
                                    }} >
                                    <InputLabel htmlFor="outlined-age-native-simple"
                                        style={{ fontSize: "14px" }}
                                    >
                                        Select a button
        </InputLabel>
                                    <Select
                                        style={{ fontSize: "14px" }}
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
                                            InputProps={{ classes: { root: classes.inputRoot } }}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.labelRoot,
                                                    focused: classes.labelFocused
                                                }
                                            }}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="link"
                                            label="Link from your button"
                                            name="link"
                                            autoComplete="link"
                                            autoFocus
                                            size="small"
                                            value={link}
                                            onChange={this.handleChange}
                                            helperText="Eg: google.com"

                                        />
                                        :
                                        " "
                                }
                                <br />
                                <Divider />
                                <br />
                                <Grid style={{ textAlign: "right" }}>
                                    <Button variant='contained' color='primary' onClick={(e) => { this.handleSubmit(e) }}
                                        style={{ fontSize: '12px' }}>Submit</Button>
                                </Grid>
                                {/* <Grid md={3} lg={3} sm={4} xs={4} style={{ textAlign: 'center' }}>
                            <Button variant='contained' color='primary' onClick={() => { this.props.handleCancel() }}
                                style={{ fontSize: '12px' }}>Cancel</Button>
                        </Grid> */}
                            </form>
                        </div>
                    </Paper>
                </Container>
                
                <Dialog onClose={this.handleClose} className={classes.root} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Select a file
          <ImageTab getValue={this.getValue} />
                    </DialogTitle>
                    <DialogContent dividers>
                        {tab == "upload" ? <DragAndDrop getImage={this.getImage} /> : ""}
                        {tab == "album" ? <Files /> : ""}

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Done
          </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default withStyles(styles)(Product);
