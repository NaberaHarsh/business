import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Grid } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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

class Offer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            button: 0,
            time: false
        }
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)


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
                        id="offer"
                        label="Offer Title"
                        name="offer"
                        autoComplete="offer"
                        autoFocus
                        helperText="Eg: 20% off on this store"
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
          value={this.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /></Grid>
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

<ExpansionPanel  elevation={0} className={classes.root}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Additional Details(optional)</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="desc"
                            label="Offer Description"
                            name="desc"
                            autoComplete="desc"
                            autoFocus
                            multiline={true}
                        />     
                         </ExpansionPanelDetails>

        <ExpansionPanelDetails>

                         <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="code"
                            label="Voucher code"
                            name="code"
                            autoComplete="code"
                            autoFocus
                            helperText="optional"
                        />
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails>


                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="terms and conditions"
                            label="Terms and Conditions"
                            name="terms and conditions"
                            autoComplete="terms and conditions"
                            autoFocus
                            helperText="optional"


                        />
          
        </ExpansionPanelDetails>
      </ExpansionPanel>
                    
                    
                </form>


            </div>
        )
    }
}

export default withStyles(styles)(Offer);
