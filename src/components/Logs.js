import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';







function preventDefault(event) {
  event.preventDefault();
}




const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function Logs() {


  const [logs, addLogs] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/search"
      )
      .then(({ data }) => {


   
        addLogs([...logs,...data]);

      });
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <h1>ELS LOGS</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Message</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map(log => console.log(log) || (
            <TableRow key={log._id}>
              <TableCell>{log._source.message}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Load More Logs
        </Link>
      </div>
    </React.Fragment>
  );
}