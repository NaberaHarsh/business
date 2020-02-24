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
import "./styles.css";

import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const top100Films = [
    { title: 'Education' },
    { title: 'Hospital' },
    { title: 'Sports' }]


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
    showImage: {
        marginBottom: theme.spacing(0),
        width: "100%",
        height: '100%'
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
            tag: '',
            open: false,
            imageDialog: true,
            tab: "upload",
            items: [],
            tag: "",
            error: null,
            userData: '',
        }

        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOpen = this.handleOpen.bind(this);
        this.getImage = this.getImage.bind(this);
        this.getValue = this.getValue.bind(this);
    }


    handleKeyDown = evt => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();

            var tag = this.state.tag.trim();

            if (tag && this.isValid(tag)) {
                this.setState({
                    items: [...this.state.items, this.state.tag],
                    tag: ""
                });
            }
        }

    };

    handleChangeTag = evt => {
        this.setState({
            tag: evt.target.tag,
            error: null
        });
    };

    handleDelete = item => {
        this.setState({
            items: this.state.items.filter(i => i !== item)
        });
    };

    handlePaste = evt => {
        evt.preventDefault();

        var paste = evt.clipboardData.getData("text");
        var content = paste.match(/[\w\d\.-]+/g);

        if (content) {
            var toBeAdded = content.filter(item => !this.isInList(item));

            this.setState({
                items: [...this.state.items, ...toBeAdded]
            });
        }
    };

    isValid(item) {
        let error = null;

        if (this.isInList(item)) {
            error = `${item} has already been added.`;
        }

        if (!this.isItem(item)) {
            error = `${item} is not a valid item.`;
        }

        if (error) {
            this.setState({ error });
            return false;
        }
        else {
            this.setState({ error: null })
        }

        return true;
    }

    isInList(item) {
        return this.state.items.includes(item);
    }

    isItem(item) {
        return /[\w\d\.-]+/.test(item);
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

    handlePreview() {
        const { image, product_name, price, desc } = this.state;
        const userData = { image, product_name, price, desc };
        console.log(userData);
        this.props.handleDataDisplay(userData)
    }

    handleSubmit = e => {
        e.preventDefault()
        const { image, product_name, category, price, desc, link, items } = this.state;
        const userData = { image, product_name, category, price, desc, link, items };
        console.log(userData);
        // this.props.handleDataDisplay(userData)
        // this.props.handleData(userData);
        this.setState({ image: '', product_name: '', category: '', price: '', desc: '', link: '', tag: '', items: [], error: null })
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
        const { product_name, category, price, desc, link, tag } = this.state;

        const { classes } = this.props;
        const { tab } = this.state;

        return (
            <div>
                <Container maxWidth="xs" className={classes.contain} >
                    <Paper style={{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <div className={classes.contain}>
                            <Paper variant='outlined' style={{ width: "90%" }} >
                                {this.state.image.length != 0
                                    ?
                                    <div className={classes.showImage}>
                                        {this.state.image.map(file => <img style={{ width: '100%', height: '100%', paddingBottom: '0px' }} src={file.preview} />)}
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

                                <Autocomplete
                                    className={classes.root}
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.labelRoot,
                                            focused: classes.labelFocused
                                        }
                                    }}

                                    multiple
                                    size="small"
                                    id="checkboxes-tags-demo"
                                    options={top100Films}
                                    closeOnSelect
                                    getOptionLabel={option => option.title}
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 4, fontSize: '14px' }}
                                                checked={selected}
                                            />
                                            {option.title}
                                        </React.Fragment>
                                    )}
                                    renderInput={params => (
                                        <TextField
                                            InputProps={{ classes: { root: classes.inputRoot } }}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.labelRoot,
                                                    focused: classes.labelFocused
                                                }
                                            }}
                                            size="small"
                                            {...params}
                                            variant="outlined"
                                            label="Select Category"
                                            placeholder="Create new category"
                                            fullWidth
                                            name="category"
                                            autoComplete="category"
                                            autoFocus
                                            size="small"
                                            value={category}
                                            onChange={this.handleChange}
                                        />
                                    )}
                                />


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
                                    rows={3}
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
                                {this.state.items.length !== 0
                                    ?
                                    <br />
                                    :
                                    undefined
                                }


                                {this.state.items.map(item => (
                                    <div className="tag-item" key={item}>
                                        {item}
                                        <button
                                            type="button"
                                            className="button"
                                            onClick={() => this.handleDelete(item)}
                                        >
                                            &times;
            </button>
                                    </div>
                                ))}
                                <TextField
                                    className={"input " + (this.state.error && " has-error")}
                                    onKeyDown={this.handleKeyDown}
                                    onChange={this.handleChangeTag}
                                    onPaste={this.handlePaste}
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
                                    id="tag"
                                    label="Add Tag"
                                    name="tag"
                                    autoComplete="tag"
                                    autoFocus
                                    size="small"
                                    multiline={true}
                                    value={tag}
                                    onChange={this.handleChange}
                                />
                                {this.state.error && <p className="error">{this.state.error}</p>}

                                <br />
                                <Divider />
                                <br />
                                <Grid container spacing={2} >
                                    <Grid md={6} lg={6} sm={3} xs={3}></Grid>
                                    <Grid md={3} lg={3} sm={5} xs={5} style={{ textAlign: 'center' }}>
                                        <Button variant='contained' color='primary' onClick={() => { this.handlePreview() }}
                                            style={{ fontSize: '12px' }}>Preview</Button>
                                    </Grid>
                                    <Grid md={3} lg={3} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                        <Button variant='contained' color='primary' onClick={(e) => { this.handleSubmit(e) }}
                                            style={{ fontSize: '12px' }}>Submit</Button>
                                    </Grid>

                                </Grid>


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
