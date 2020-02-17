import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
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

class Offer extends React.Component {
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
            start_time: ' ',
            end_time: ' ',
            Voucher: ' ',
            terms: ' '
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
        const { image, title, start_date, end_date, start_time, end_time, description, voucher, terms } = this.state;
        const userData = { image, title, start_date, end_date, start_time, end_time, description, voucher, terms };
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
        const { classes } = this.props;
        const { title, description, voucher, terms } = this.state;

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
                    <FormControlLabel
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

                    />


                    {this.state.time === true
                        ?
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
                        :

                        < MaterialUIPickersStartDate
                            startDate={this.getStartDate}
                        />
                    }

                    {this.state.time === true
                        ?
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
                        :

                        <MaterialUIPickersEndDate
                            endDate={this.getEndDate}
                        />

                    }

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

export default withStyles(styles)(Offer);
