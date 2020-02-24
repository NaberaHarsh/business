
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, Grid } from '@material-ui/core';
import DragAndDrop from './Drag&Drop';
import Divider from '@material-ui/core/Divider';
import MaterialUIPickersStartDate from './StartDate'
import MaterialUIPickersEndDate from './EndDate'
import MaterialUIPickersEndTime from './EndTime'
import MaterialUIPickersStartTime from './StartTime'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Image from './Image'
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ImageTab from './ImageTab'
import Files from './Files'
import Typography from '@material-ui/core/Typography';
import "./styles.css";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

    },
    image: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    showImage:{
        marginBottom: theme.spacing(0),
        width:"100%",
        height:'100%'
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



class Event extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            button: 0,
            time: false,
            file: null,
            image: [],
            title: ' ',
            description: ' ',
            start_date: ' ',
            end_date: ' ',
            link: ' ',
            start_time: ' ',
            end_time: ' ',
            tab: "upload",
            open: false,
            items: [],
            tag: "",
            error: null,

        }
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getStartDate = this.getStartDate.bind(this);
        this.getEndDate = this.getEndDate.bind(this);
        this.getStartTime = this.getStartTime.bind(this);
        this.getEndTime = this.getEndTime.bind(this);
        // this.get = this.get.bind(this);
        this.getImage = this.getImage.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    handleKeyDown = evt => {
        if (["Enter", "Tab",","].includes(evt.key)) {
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
        else{
            this.setState({error:null})
        }
    
        return true;
      }
    
      isInList(item) {
        return this.state.items.includes(item);
      }
    
      isItem(item) {
        return /[\w\d\.-]+/.test(item);
      }



    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    getStartDate(startDate) {
        this.setState({ start_date: startDate })
    }
    getEndDate(endDate) {
        this.setState({ end_date: endDate })
    }
    getStartTime(startTime) {
        this.setState({ start_time: startTime })
    }
    getEndTime(endTime) {
        this.setState({ end_time: endTime })
    }

    handlePreview() {
        const { image, title, start_date, end_date, start_time, end_time, description, link, items } = this.state;
        const userData = { image, title, start_date, end_date, start_time, end_time, description, link, items };
        console.log(userData);
        this.props.handleDataDisplay(userData)
    }

    handleSubmit = e => {
        e.preventDefault()
        const { image, title, start_date, end_date, start_time, end_time, description, link, items } = this.state;
        const userData = { image, title, start_date, end_date, start_time, end_time, description, link, items };
        console.log(userData);
        this.setState({image:[],title:'',start_date:'',end_date:'',start_time:'',end_time:'', description:'',link:'', tag:'',items:[], error:null })


    }

    handleChangeDate = date => {
        this.setState({ selectedDate: date })
    };

    handleChangeButton(p) {
        this.setState({ button: p.target.value })
        console.log(p.target.value)
    };

    handleChangeTime() {
        this.setState({ time: !this.state.time })
        console.log(this.state.time)
    };


    // get(){
    //     this.setState({image:true})
    // }

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

        const { tab } = this.state;

        const { title, description, link, tag } = this.state;

        const { classes } = this.props;

        return (
            <div>
                <Container maxWidth="xs" className={classes.contain} >
                    <Paper style={{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <div className={classes.contain}>
                            <Paper variant='outlined' style={{ width: "90%" }}>
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
                                    id="event"
                                    label="Event Title"
                                    name="title"
                                    autoComplete="event"
                                    autoFocus
                                    size="small"
                                    value={title}
                                    onChange={this.handleChange}

                                />
                                {/* <FormControlLabel
                        style={{ marginTop: '10px' }}
                        value="time"
                        onChange={this.handleChangeTime}
                        control={<Switch color="primary" size="small" />}
                        label={<span style={{ fontSize: '14px' }}>Add Time</span>}
                        labelPlacement="start"
                    />


                    {this.state.time === true
                        ? */}
                                <Grid container spacing={0}>
                                    <Grid md={8} xs={8} >

                                        < MaterialUIPickersStartDate
                                            startDate={this.getStartDate}
                                        />

                                    </Grid>
                                    <Grid md={4} xs={4}>

                                        <MaterialUIPickersStartTime
                                            startTime={this.getStartTime}
                                        />
                                    </Grid>
                                </Grid>
                                {/* :
                        <div>

                            < MaterialUIPickersStartDate
                                startDate={this.getStartDate}
                            />
                        </div>
                    }

                    {this.state.time === true
                        ? */}
                                <Grid container spacing={0}>
                                    <Grid md={8} xs={8} >

                                        <MaterialUIPickersEndDate
                                            endDate={this.getEndDate}
                                        />
                                    </Grid>
                                    <Grid md={4} xs={4}>

                                        <MaterialUIPickersEndTime
                                            endTime={this.getEndTime}
                                        />
                                    </Grid>
                                </Grid>
                                {/* :
                        <div>

                            <MaterialUIPickersEndDate
                                endDate={this.getEndDate}
                            />
                        </div>
                    } */}


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
                                    id="desc"
                                    label="Event Description"
                                    name="description"
                                    autoComplete="desc"
                                    autoFocus
                                    size="small"
                                    multiline={true}
                                    rows={3}
                                    value={description}
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
                                    className={classes.root} style={{ width: '70%' }}
                                    variant="outlined"
                                    size="small" >
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
                                        <option value={4}>Book</option>
                                        <option value={5}>Sign Up</option>




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
                                    value={ tag  }
                                    onChange={this.handleChange}
                                />
                                       {this.state.error && <p className="error">{this.state.error}</p>}

                                <br />
                                <Divider />
                                <br />
                                <Grid container spacing={2}>
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

export default withStyles(styles)(Event);