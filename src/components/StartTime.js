import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  inputRoot: {
    fontSize: 14
},
labelRoot: {
    fontSize: 14,

},
}));


export default function MaterialUIPickersStartTime(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
const {startTime}= props;
const classes = useStyles();


  const handleDateChange = time => {
    setSelectedDate(time);
    console.log(time)
    startTime(time)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        
        
        <KeyboardTimePicker
        InputProps={{ classes: { root: classes.inputRoot } }}
        InputLabelProps={{
            classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
            }
        }} 
        style={{width:'98%'}}
          margin="normal"
          id="time-picker"
          label="Start Time "
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}