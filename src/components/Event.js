// import 'date-fns';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
import { Grid } from '@material-ui/core';
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

class Event extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            button: 0,
            time: false,
            file:null

        }
        this.handleClick = this.handleClick.bind(this);
     this.handleChange=this.handleChange.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
        this.deleteImage = this.deleteImage.bind(this)

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

    handleClick(e) {
        this.refs.fileUploader.click();
        
    }
    handleChange(event) {
        event.stopPropagation();
        event.preventDefault();
        // var send =  event.target.files[0];
        var file =  URL.createObjectURL(event.target.files[0])
        console.log(file);
        this.setState({file:file});
      }
    
      deleteImage(){
        this.setState({file:null})
    }

    render() {
        const { classes } = this.props;

        return (
            <div>

                <Paper variant='outlined'>
                    <div >
                    {this.state.file!= null
                        ?
                        <div style={{textAlign:'right'}}>
                       <CloseIcon style={{alignSelf:'right'}}  onClick={this.deleteImage} />
                        <img src={this.state.file}  style={{maxheight:"100%" , maxWidth:"100%"}}/>
                        </div>
                        :
                        <div class={classes.paper} style={{ paddingBottom: '40px' }}>
                        <AddAPhotoIcon style={{ color: '#1a73e8', fontSize: '36px' }} onClick={this.handleClick}  />
                        <input type="file" id="file" ref="fileUploader"  onChange={this.handleChange}  accept="image/*" style={{display: "none"}}/>
                                               <br />
 <div style={{ color: '#1a73e8', fontSize: "16px" }}>Make your post stand out with a photo</div>
                    </div>
                        }  </div>
                </Paper>
                <form className={classes.root} noValidate >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="event"
                        label="Event Title"
                        name="event"
                        autoComplete="event"
                        autoFocus
                        
                    />
                    <FormControlLabel
                        value="time"
                        onChange={this.handleChangeTime}
                        control={<Switch color="primary" />}
                        label="Add Time"
                        labelPlacement="start"
                    />

                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider> */}

        
                    {this.state.time === true
                        ?
                        <Grid container spacing={0}>
                            <Grid md={8} xs={8}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="start date"
                                    label="Start Date"
                                    name="start date"
                                    autoComplete="start date"
                                    autoFocus
                                />
                            </Grid>
                            <Grid md={4} xs={4}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="start time"
                                    label="Start Time"
                                    name="start time"
                                    autoComplete="start time"
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        :
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="start date"
                            label="Start Date"
                            name="start date"
                            autoComplete="start date"
                            autoFocus
                        />}

                    {this.state.time === true
                        ?
                        <Grid container spacing={0}>
                            <Grid md={8} xs={8}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="end date"
                                    label="End Date"
                                    name="end date "
                                    autoComplete="end date"
                                    autoFocus
                                />
                            </Grid>
                            <Grid md={4} xs={4}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="end time"
                                    label="End Time"
                                    name="end time"
                                    autoComplete="end time"
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        :
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="end date"
                            label="End Date"
                            name="end date"
                            autoComplete="end date"
                            autoFocus
                        />
                    }


<TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="desc"
                            label="Event Description"
                            name="desc"
                            autoComplete="desc"
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
                            <option value={4}>Book</option>
                            <option value={5}>Sign Up</option>




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

export default withStyles(styles)(Event);
