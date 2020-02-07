import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
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
            time: false,
            file:null,
            title: ' ',
            description:' ',
            start_date:' ',
            end_date:' ',
            link:' ',
            start_time:' ',
            end_time:' ',
            Voucher:' ',
            terms:' '
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
        const { title , start_date, end_date, start_time, end_time , description , link, voucher, terms} = this.state;
        const userData = {  title , start_date, end_date, start_time, end_time , description , link, voucher, terms};
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
        const { title , start_date, end_date, start_time, end_time , description , link, voucher, terms} = this.state;

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
                        id="offer"
                        label="Offer Title"
                        name="title"
                        autoComplete="offer"
                        autoFocus
                        value={title}
                        onChange={this,this.handleChange}
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
                                    name="start_date"
                                    autoComplete="start date"
                                    value={start_date}
                        onChange={this.handleChange}
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
                            name="description"
                            autoComplete="desc"
                            autoFocus
                            value={description}
                            onChange={this.handleChange}
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
                            value={voucher}
                            onChange={this.handleChange}
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
                            name="terms"
                            autoComplete="terms and conditions"
                            autoFocus
                            value={terms}
                            onChange={this.handleChange}
                            helperText="optional"
                        />
          
        </ExpansionPanelDetails>
      </ExpansionPanel>
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

export default withStyles(styles)(Offer);
