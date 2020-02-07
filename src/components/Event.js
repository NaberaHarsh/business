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
import { Button, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DragAndDrop from './Drag&Drop';
import Divider from '@material-ui/core/Divider';




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
            file:null,
            title: ' ',
            description:' ',
            start_date:' ',
            end_date:' ',
            link:' ',
            start_time:' ',
            end_time:' ' 
        }
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
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
        const { title , start_date, end_date, start_time, end_time , description , link} = this.state;
        const userData = {  title ,start_date, end_date, start_time, end_time , description , link};
        console.log(userData);
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

   

    render() {
        const { title , start_date, end_date, start_time, end_time , description , link} = this.state;

        const { classes } = this.props;

        return (
            <div>

                <Paper variant='outlined'>
                    <div >
                        <DragAndDrop />
                      </div>
                </Paper>
                <form className={classes.root} noValidate >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="event"
                        label="Event Title"
                        name="title"
                        autoComplete="event"
                        autoFocus
                        value={title}
                        onChange={this.handleChange}
                        
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
                                    name="start_date"
                                    autoComplete="start date"
                                    autoFocus
                                    value={start_date}
                        onChange={this.handleChange}
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
                                    name="start_time"
                                    autoComplete="start time"
                                    autoFocus
                                    value={start_time}
                        onChange={this.handleChange}
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
                            name="start_date"
                            autoComplete="start date"
                            autoFocus
                            value={start_date}
                        onChange={this.handleChange}
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
                                    name="end_date "
                                    autoComplete="end date"
                                    autoFocus
                                    value={end_date}
                        onChange={this.handleChange}
                                
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
                                    name="end_time"
                                    autoComplete="end time"
                                    autoFocus
                                    value={end_time}
                        onChange={this.handleChange}
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
                            name="end_date"
                            autoComplete="end date"
                            autoFocus
                            value={end_date}
                            onChange={this.handleChange}
                        />
                    }


<TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="desc"
                            label="Event Description"
                            name="description"
                            autoComplete="desc"
                            autoFocus
                            multiline={true}
                            value={description}
                            onChange={this.handleChange}
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
                    <Grid container spacing={2}>
                        <Grid md={6} xs={6}></Grid>
                        <Grid md={3} xs={3} style={{textAlign:'center'}}>
                        <Button variant='contained' color='primary'  onClick={(e)=>{this.handleSubmit(e); this.props.handleOk()}}>Submit</Button>
                            </Grid>
                            <Grid md={3} xs={3} style={{textAlign:'center'}}>
                            <Button variant='contained' color='primary'  onClick={()=>{ this.props.handleCancel()}}>Cancel</Button>
                            </Grid>

                    </Grid>

                </form>


            </div>
        )
    }
}

export default withStyles(styles)(Event);
