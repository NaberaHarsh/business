import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    fontSize: 14
},
labelRoot: {
    fontSize: 14,

},
}));

export default function MaterialUIPickersStartDate(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
const {startDate} =props;
const classes = useStyles();

  const handleDateChange = date => {
    setSelectedDate(date);
    console.log(date)
startDate(date);
  };

  return (


    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        
        <KeyboardDatePicker
  InputProps={{ classes: { root: classes.inputRoot } }}
  InputLabelProps={{
      classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused
      }
  }}                format="dd/MM/yyyy"
          margin="normal"
          style={{width:'95%'}}
          id="date-picker-dialog"
          label="Start Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
    </MuiPickersUtilsProvider>
  );
}