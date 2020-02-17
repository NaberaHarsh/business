import React from "react";
import Dropzone from "react-dropzone";
import { withStyles } from "@material-ui/core/styles";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    paper1: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    paper2: {
        marginTop: theme.spacing(-2),
        marginBottom: theme.spacing(-1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }, 
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

    }
})


// for profile picture
class ImageUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            warningMsg: "",
            image:props.files 
}
this.deleteImage=this.deleteImage.bind(this)
    }
    
  

  onDrop = (accepted, rejected) => {
    if (Object.keys(rejected).length !== 0) {
      const message = "Please submit valid file type";
      this.setState({ warningMsg: message });
    } else {
      this.props.addFile(accepted);
      this.setState({ warningMsg: "" });
      console.log(accepted[0].preview);

      var blobPromise = new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(accepted[0]);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
      blobPromise.then(value => {
        // console.log(value);
      });
    }
  };
deleteImage(){  
    this.setState({image:null})
    console.log(this.state.image)
}
 

  render() {
    const { classes } = this.props;

    const { files } = this.props;
    const thumbsContainer = {
width:"100%",
marginTop:'0px',
marginBottom:'0px',
height:'100%'
    };

    const thumbs = files.map(file => (
      <img style={thumbsContainer} src={file.preview} alt="profile" />
    ));
    // console.log(thumbs);

    const render =
      Object.keys(files).length !== 0 ? 
      <div  style={{textAlign:'right'}}>
      {/* <CloseIcon style={{alignSelf:'right'}} onClick={this.deleteImage} /> */}
        {files.map(file => <aside>{thumbs}</aside>)}
      </div> 
      : (
        <div className={classes.root}>
             <AddAPhotoIcon style={{ color: '#1a73e8', fontSize: '32px' }} />
                                {/* <input type="file" id="file" ref="fileUploader"  accept="image/*" style={{ display: "none" }} /> */}
                                <br />
                                <div style={{ color: '#1a73e8',textAlign:"center", fontSize: "14px" }}>Make your post stand out with a photo</div>
        </div>
      );


    return (
      <div>
        <p>{this.state.warningMsg}</p>

        <Dropzone
        className={Object.keys(files).length !== 0 ?   classes.paper2: classes.paper1}
          multiple={false}
          accept="image/*"
          // accept="video/*"
          onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}
        >
          {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
            // for drag and drop warning statement
            if (isDragReject) return "Please submit a valid file";
            return render;
          }}
        </Dropzone>
      </div>
    );
  }
}

export default withStyles(styles)(ImageUpload);
