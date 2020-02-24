import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, Grid } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DragAndDrop from './Drag&Drop'
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
import "./styles.css";


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



class Offer extends React.Component {
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
            start_time: ' ',
            end_time: ' ',
            Voucher: ' ',
            terms: ' ',
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
        const { image, title, start_date, end_date, start_time, end_time, description, voucher, terms, items } = this.state;
        const userData = { image, title, start_date, end_date, start_time, end_time, description, voucher, terms, items };
        console.log(userData);
        this.props.handleDataDisplay(userData)
    }

    handleSubmit = e => {
        e.preventDefault()
        const { image, title, start_date, end_date, start_time, end_time, description, voucher, terms, items } = this.state;
        const userData = { image, title, start_date, end_date, start_time, end_time, description, voucher, terms, items };
        console.log(userData);
        this.setState({image:[],title:'',start_date:'',end_date:'',start_time:'',end_time:'', description:'',voucher:'',terms:'', tag:'',items:[], error:null})
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

        //        
        const { tab } = this.state;

        const { classes } = this.props;
        const { title, description, voucher, terms , tag} = this.state;

        return (
            <div>
                <Container maxWidth="xs" className={classes.contain} >
                    <Paper style={{  paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px' }}>
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
                            <form className={classes.root} noValidate >
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
                                    id="offer"
                                    label="Offer Title"
                                    name="title"
                                    autoComplete="offer"
                                    autoFocus
                                    size="small"
                                    value={title}
                                    onChange={this.handleChange}
                                    helperText="Eg: 20% off on this store"
                                />
                                {/* <FormControlLabel
                        InputProps={{ classes: { root: classes.inputRoot } }}
                        InputLabelProps={{
                            classes: {
                                root: classes.labelRoot,
                                focused: classes.labelFocused
                            }
                        }}
                        value="time"
                        onChange={this.handleChangeTime}
                        control={<Switch color="primary" size="small" />}
                        label={<span style={{ fontSize: '14px' }}>Add Time</span>}
                        labelPlacement="start"

                    /> */}


                                {/* {this.state.time === true
                        ? */}
                                <Grid container spacing={0}>
                                    <Grid md={8} xs={8}>

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
<Grid md={12} xs={12}>
                        < MaterialUIPickersStartDate
                            startDate={this.getStartDate}
                        />
                        </Grid>
                     }

                    {this.state.time === true
                        ? 
                         */}
                                <Grid container spacing={0}>
                                    <Grid md={8} xs={8}>

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

                        <MaterialUIPickersEndDate
                            endDate={this.getEndDate}
                        />

                    } */}

                                <ExpansionPanel elevation={0} className={classes.root}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        size="small"
                                    >
                                        <Typography
                                            style={{ fontSize: "14px" }}
                                        >
                                            Additional Details(optional)</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
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
                                            label="Offer Description"
                                            name="description"
                                            autoComplete="desc"
                                            autoFocus
                                            size="small"
                                            value={description}
                                            onChange={this.handleChange}
                                            rows={3}
                                            multiline={true}
                                        />
                                    </ExpansionPanelDetails>

                                    <ExpansionPanelDetails>

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
                                            fullWidth
                                            id="code"
                                            label="Voucher code"
                                            name="voucher"
                                            autoComplete="code"
                                            autoFocus
                                            size="small"
                                            value={voucher}
                                            onChange={this.handleChange}
                                            helperText="optional"
                                        />
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelDetails>


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
                                            fullWidth
                                            id="terms and conditions"
                                            label="Terms and Conditions"
                                            name="terms"
                                            autoComplete="terms and conditions"
                                            autoFocus
                                            size="small"
                                            value={terms}
                                            onChange={this.handleChange}
                                            helperText="optional"
                                        />

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <Divider />

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

                        </div></Paper></Container>
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

export default withStyles(styles)(Offer);
