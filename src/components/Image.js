import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DragAndDrop from './Drag&Drop'



const styles = theme => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});



const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            file: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this)

    }


    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    handleDrop = (files) => {
        let fileList = this.state.files
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState({ files: fileList })
    }
    handleClick(e) {
        this.refs.fileUploader.click();

    }
    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
        console.log("hello")
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Open dialog
      </Button>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Select a file
        </DialogTitle>
                    <DialogContent dividers>


                        <Typography gutterBottom>
                            <Paper variant='outlined'>
                                <div class={classes.paper} style={{ paddingBottom: '40px' }}>
                                    {
                                        this.state.file != null
                                            ?
                                            <img src={this.state.file} />
                                            :
                                            <div className={classes.paper}>
                                                <AddAPhotoIcon style={{ color: '#1a73e8', fontSize: '36px' }} onClick={this.handleClick} onChange={this.handleChange} accept="image/*" />
                                                <br />
                                                <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} />
                                                <div style={{ color: '#1a73e8', fontSize: "16px", paddingLeft: '40px', paddingRight: '40px' }}>Drag your photo here</div>

                                            </div>}
                                </div>
                            </Paper>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Done          </Button>
                    </DialogActions>
                </Dialog>

                <DragAndDrop handleDrop={this.handleDrop}>
                    <div style={{ height: 300, width: 250 }}>
                        {
                            this.state.file != null
                                ?
                                <div>
                                    <img src={this.state.file} ></img>
                                    <div>{this.state.file}</div>
                                </div>
                                :
                                ""
                        }
                        <div >
                        </div>
                    </div>
                </DragAndDrop>
            </div>
        )
    }
}
export default withStyles(styles)(Image);