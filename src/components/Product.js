import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';



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
            button: 0
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)

    }

    handleChangeCategory(e) {
        this.setState({ value: e.target.value })
        console.log(e.target.value)
    };

    handleChangeButton(p) {
        this.setState({ button: p.target.value })
        console.log(p.target.value)
    };


    render() {
        const { classes } = this.props;

        return (
            <div>

                <Paper variant='outlined'>
                    <div class={classes.paper} style={{ paddingBottom: '40px' }}>
                        <AddAPhotoIcon style={{ color: '#1a73e8', fontSize: '36px' }} />
                        <br />
                        <div style={{ color: '#1a73e8', fontSize: "16px" }}>Make your post stand out with a photo</div>
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
                    <TextareaAutosize className={classes.root}
                        style={{ font: 'inherit', padding: "18.5px 14px" }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Product description"
                        name="description"
                        autoComplete="description"
                        autoFocus
                        aria-label="minimum height"
                        placeholder="Product Description"
                        rowsMin={3} />
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


            </div>
        )
    }
}

export default withStyles(styles)(Product);
