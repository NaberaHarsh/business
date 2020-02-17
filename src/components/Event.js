
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
import CloseIcon from '@material-ui/icons/Close';
import DragAndDrop from './Drag&Drop';
import Divider from '@material-ui/core/Divider';
import MaterialUIPickersStartDate from './StartDate'
import MaterialUIPickersEndDate from './EndDate'
import MaterialUIPickersEndTime from './EndTime'
import MaterialUIPickersStartTime from './StartTime'


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
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

class Event extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            button: 0,
            time: false,
            file: null,
            image: '',
            title: ' ',
            description: ' ',
            start_date: ' ',
            end_date: ' ',
            link: ' ',
            start_time: ' ',
            end_time: ' '
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
        this.getImage = this.getImage.bind(this);
    }

    getImage(image) {
        this.setState({ image: image })
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

    handleSubmit = e => {
        e.preventDefault()
        const { image, title, start_date, end_date, start_time, end_time, description, link } = this.state;
        const userData = { image, title, start_date, end_date, start_time, end_time, description, link };
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
        const { title, description, link } = this.state;

        const { classes } = this.props;

        return (
            <div>

                <Paper variant='outlined'>
                    <div >
                        <DragAndDrop getImage={this.getImage} />
                    </div>
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
                        id="event"
                        label="Event Title"
                        name="title"
                        autoComplete="event"
                        autoFocus
                        size="small"
                        value={title}
                        onChange={this.handleChange}

                    />
                    <FormControlLabel
                        style={{ marginTop: '10px' }}
                        value="time"
                        onChange={this.handleChangeTime}
                        control={<Switch color="primary" size="small" />}
                        label={<span style={{ fontSize: '14px' }}>Add Time</span>}
                        labelPlacement="start"
                    />


                    {this.state.time === true
                        ?
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
                        :
                        <div>

                            < MaterialUIPickersStartDate
                                startDate={this.getStartDate}
                            />
                        </div>
                    }

                    {this.state.time === true
                        ?
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
                        :
                        <div>

                            <MaterialUIPickersEndDate
                                endDate={this.getEndDate}
                            />
                        </div>
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
                        id="desc"
                        label="Event Description"
                        name="description"
                        autoComplete="desc"
                        autoFocus
                        size="small"
                        multiline={true}
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
                    <br />
                    <Divider />
                    <br />
                    <Grid container spacing={2}>
                        <Grid md={6} lg={6} sm={3} xs={3}></Grid>
                        <Grid md={3} lg={3} sm={5} xs={5} style={{ textAlign: 'center' }}>
                            <Button variant='contained'
                                style={{ fontSize: '12px' }}
                                color='primary' onClick={(e) => { this.handleSubmit(e); this.props.handleOk() }}>Submit</Button>
                        </Grid>
                        <Grid md={3} lg={3} sm={4} xs={4} style={{ textAlign: 'center' }}>
                            <Button variant='contained'
                                style={{ fontSize: '12px' }}
                                color='primary' onClick={() => { this.props.handleCancel() }}>Cancel</Button>
                        </Grid>

                    </Grid>

                </form>


            </div>
        )
    }
}

export default withStyles(styles)(Event);