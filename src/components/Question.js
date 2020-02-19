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
import { isThisHour } from 'date-fns';
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
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';



const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

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
        alignItems: "initial"

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


class Question extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            button: 0,
            file:[],
            // file: false,
            // file: null,
            question: '',
            answer:'',
            option1:'',
            option2:'',
            option3:'',
            option4:'',
            option5:'',
            option6:'',
            option7:'',
            option8:'',
            option9:'',
            option10:'',
            count: 2,         
               tab: "upload",
            options: ["Add option " + 1],

        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getFile = this.getFile.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.getImage = this.getImage.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    addQuestion = e => {
        this.setState({ count: this.state.count + 1 })
        e.preventDefault()
        let option = this.state.options.concat(['Add option ' + this.state.count])
        this.setState({
            options: option
        })
    }

    addOption() {
        this.setState({ count: this.state.count + 1 })
        console.log(this.state.count)
    }
    getFile(file) {
        this.setState({ file: file })
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { file, question, answer, option1,option2, option3, option4,option5, option6, option7,option8, option9,option10} = this.state;
        const userData = { file, question, answer, option1,option2, option3, option4,option5, option6, option7,option8, option9,option10 };
        console.log(userData);
        this.setState({file:'',question:'', answer:''})
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
    //     this.setState({file:true})
    // }

    getImage(file) {
        this.setState({ file: file })
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
        const { question, answer, option1,option2, option3, option4,option5, option6, option7,option8, option9,option10 } = this.state;

        const { classes } = this.props;
        const { tab } = this.state;

        return (
            <div>
                 <Container maxWidth="xs" className={classes.contain} >
                    <Paper style={{ marginTop: '10px', paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <div className={classes.contain}>
                            <Paper variant='outlined' style={{ width: "90%" }} >
                            {this.state.file.length != 0 
                              ?
                              <div className={classes.showImage}>
                              {this.state.file.map(file=> <img style={{width:'100%',height:'100%', paddingBottom:'0px'}} src={file.preview} /> )}
                                  </div>
                            :
                            <div className={classes.image} >
                            <AddAPhotoIcon onClick={() => { this.handleOpen() }} style={{ color: '#1a73e8', fontSize: '32px' }} />
                            <br />
                            <div style={{ color: '#1a73e8', textAlign: "center", fontSize: "14px" }}>Make your post stand out with a photo</div>
                        </div>}
                </Paper>
                <form  noValidate >

                    <TextField
                    InputProps={{ classes: { root: classes.inputRoot } }}
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused
                      }
                    }}
                    size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="option"
                        label="Add Question"
                        name="question"
                        autoComplete="product"
                        autoFocus
                        multiline={true}
                        value={question}
                        onChange={this.handleChange}
                    />
                    <FormControl
                    InputProps={{ classes: { root: classes.inputRoot } }}
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused
                      }
                    }}
                         style={{ width: '80%' }}
                        variant="outlined"
                        size="small" >
                        <InputLabel htmlFor="outlined-age-native-simple"
                        style={{fontSize:"14px"}}>
                            Select answer type
        </InputLabel>
                        <Select
                        style={{fontSize:"14px"}}
                            native
                            value={this.state.value}
                            onChange={this.handleChangeCategory}
                        >
                            <option value="" />
                            <option value={1}>Single Answer</option>
                            <option value={2}>Multiple Answer</option>


                        </Select>
                    </FormControl>
                    {this.state.options.map((option, index) => (
                        <span key={index}>
                            {
                                this.state.value == 1 || this.state.value == 2 ?
                                    <TextField
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                     InputLabelProps={{
                       classes: {
                         root: classes.labelRoot,
                         focused: classes.labelFocused
                       }
                     }}
                     size="small"
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="option"
                                        label={option}
                                        name="answer"
                                        autoComplete="option"
                                        autoFocus
                                        value={answer}
                                        onChange={this.handleChange} />
                                    :
                                    <TextField
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                     InputLabelProps={{
                       classes: {
                         root: classes.labelRoot,
                         focused: classes.labelFocused
                       }
                     }}
                     size="small"
                                        variant="outlined"
                                        margin="normal"
                                        disabled
                                        fullWidth
                                        id="option"
                                        label={option}
                                        name="answer"
                                        autoComplete="option"
                                        autoFocus
                                        value={answer}
                                        onChange={this.handleChange}
                                    />
                            }
                        </span>

                    ))}
                    <Button variant='contained' color='primary'
                        onClick={this.addQuestion}  
                        style={{fontSize:"12px", width:'100%'}}                  >
                        Add Option</Button>


                    <br />
                    <Divider />
                    <br />
                    <Grid style={{ textAlign: "right" }}>
                                    <Button variant='contained' color='primary' onClick={(e) => { this.handleSubmit(e) }}
                                        style={{ fontSize: '12px' }}>Submit</Button>
                                </Grid>
                </form>
</div></Paper>
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

export default withStyles(styles)(Question);
