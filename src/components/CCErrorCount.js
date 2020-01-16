import { useTheme ,makeStyles} from '@material-ui/core/styles';
import Chart from "react-google-charts";
import axios from "axios";
import React, { useState, useReducer, useEffect } from "react";
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';


const data = [
  ["Year", "Visitations", { role: "style" }],
  ["2010", 10, "color: gray"],
  ["2020", 14, "color: #76A7FA"],
  ["2030", 16, "color: blue"],
  ["2040", 22, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
  [
    "2050",
    28,
    "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2"
  ]
];


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CCErrorCount() {

  

  const [counts, addCounts] = useState([["Message Code","Error Count", { role: "style" }]]);
  const [countLog, addCountLog] = useState([["Message Code","Error Count", { role: "style" }]]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/count-grouped-messagecode"
      )
      .then(({ data }) => {


        data.rows.forEach(element => {

          element[0] = parseInt(element[0]);
          element.reverse();
          element.push("color: #703593");

        });

        addCounts([...counts,...data.rows]);

        var formatted = data.rows.map(element => [

         element[0], Math.log(parseInt(element[1])) , element[1]

        ]);

        addCountLog([...countLog,...formatted]);


          setLoading(false);

   


      });
  }, []);


  const [isDense, setDense] = useState(true);
  const [isLoading, setLoading] = useState(true);


  const handleChange = name => event => {

    console.log(countLog, counts);
    setDense(event.target.checked);

    
  };


  const classes = useStyles();



  if(isLoading){
    return (
      <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );

  }


  return (
      <div>
       <Switch
        checked={isDense}
        onChange={handleChange()}
        value="checkedB"
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />              <Chart chartType="ColumnChart" width="100%" height="300px" data={isDense ? countLog :  counts} />

      </div>
  );
}