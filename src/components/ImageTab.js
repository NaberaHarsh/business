import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        minWidth: 132,
        width: 132,
        fontSize: '12px',
            },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
          display: "flex"
        }
      },
      sectionMobile: {
          
        display: "flex",
        [theme.breakpoints.up("md")]: {
          display: "none"
        }
    }
})

class ImageTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
        // console.log(newValue);
        this.props.getValue(newValue)
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
            <div className={classes.sectionDesktop} >
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    variant='fullWidth'
                    // width='20px'
                    textColor="primary"
                    aria-label="icon tabs example"
                >
                    <Tab 
                        className={classes.paper}
                        value={0} label="Upload" aria-label="upload" />
                    <Tab 
                        className={classes.paper}
                        value={1} aria-label="album" label="Album" />
                    
                </Tabs>
            </div>
            
         </div>
        )
    }
}
export default withStyles(styles)(ImageTab);