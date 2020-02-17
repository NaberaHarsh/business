import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
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


export default function MaterialUIPickersEndDate(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
const {endDate} =props;
const classes = useStyles();


  const handleDateChange = date => {
    setSelectedDate(date);
    console.log(date)
  endDate(date);
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
        }} 
          margin="normal"
          style={{width:'95%'}}
          id="date-picker-dialog"
          label="End Date"
          format="dd/MM/yyyy"
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