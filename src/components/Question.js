import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DragAndDrop from './Drag&Drop'
import { Button, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { isThisHour } from 'date-fns';



const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

    }, 
    inputRoot: {
        fontSize: 14
      },
      labelRoot: {
        fontSize: 14,
       
      },

    root: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "initial"

    }
})

class Question extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            file: '',
            button: 0,
            file: false,
            file: null,
            question: '',
            answer:'',
            option1:'',
            option2:'',
            option3:'',
            option4:'',
            option5:'',
            option6:'',
            option7:'',
            option8:'',
            option9:'',
            option10:'',
            count: 2,
            options: ["Add option " + 1],

        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getFile = this.getFile.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
    }

    addQuestion = e => {
        this.setState({ count: this.state.count + 1 })
        e.preventDefault()
        let option = this.state.options.concat(['Add option ' + this.state.count])
        this.setState({
            options: option
        })
    }

    addOption() {
        this.setState({ count: this.state.count + 1 })
        console.log(this.state.count)
    }
    getFile(file) {
        this.setState({ file: file })
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { file, question, answer, option1,option2, option3, option4,option5, option6, option7,option8, option9,option10} = this.state;
        const userData = { file, question, answer, option1,option2, option3, option4,option5, option6, option7,option8, option9,option10 };
        console.log(userData);
    }

    handleChangeCategory(e) {
        this.setState({ value: e.target.value })
        console.log(e.target.value)
    };

    handleChangeButton(p) {
        this.setState({ button: p.target.value })
        console.log(p.target.value)
    };



    // get(){
    //     this.setState({file:true})
    // }






    render() {
        const { question, answer, option1,option2, option3, option4,option5, option6, option7,option8, option9,option10 } = this.state;


        //         if(this.state.file === true){
        //             return(
        // <file />
        //             )
        //         }
        const { classes } = this.props;

        return (
            <div>
                <Paper variant='outlined'>
                    <div>
                        <DragAndDrop getImage={this.getFile} />
                    </div>
                </Paper>
                <form className={classes.root} noValidate >

                    <TextField
                    InputProps={{ classes: { root: classes.inputRoot } }}
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused
                      }
                    }}
                    size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="option"
                        label="Add Question"
                        name="question"
                        autoComplete="product"
                        autoFocus
                        multiline={true}
                        value={question}
                        onChange={this.handleChange}
                    />
                    <FormControl
                    InputProps={{ classes: { root: classes.inputRoot } }}
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused
                      }
                    }}
                        className={classes.root} style={{ width: '80%' }}
                        variant="outlined"
                        size="small" >
                        <InputLabel htmlFor="outlined-age-native-simple"
                        style={{fontSize:"14px"}}>
                            Select answer type
        </InputLabel>
                        <Select
                        style={{fontSize:"14px"}}
                            native
                            value={this.state.value}
                            onChange={this.handleChangeCategory}
                        >
                            <option value="" />
                            <option value={1}>Single Answer</option>
                            <option value={2}>Multiple Answer</option>


                        </Select>
                    </FormControl>
                    {this.state.options.map((option, index) => (
                        <span key={index}>
                            {
                                this.state.value == 1 || this.state.value == 2 ?
                                    <TextField
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                     InputLabelProps={{
                       classes: {
                         root: classes.labelRoot,
                         focused: classes.labelFocused
                       }
                     }}
                     size="small"
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="option"
                                        label={option}
                                        name="answer"
                                        autoComplete="option"
                                        autoFocus
                                        value={answer}
                                        onChange={this.handleChange} />
                                    :
                                    <TextField
                                    InputProps={{ classes: { root: classes.inputRoot } }}
                     InputLabelProps={{
                       classes: {
                         root: classes.labelRoot,
                         focused: classes.labelFocused
                       }
                     }}
                     size="small"
                                        variant="outlined"
                                        margin="normal"
                                        disabled
                                        fullWidth
                                        id="option"
                                        label={option}
                                        name="answer"
                                        autoComplete="option"
                                        autoFocus
                                        value={answer}
                                        onChange={this.handleChange}
                                    />
                            }
                        </span>

                    ))}
                    {/*                     
                    {
                        this.state.value == 1 || this.state.value == 2 ?
                        <>
                            <TextField                            
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="option"
                                label="Add option 1"
                                name="option1"
                                autoComplete="option"
                                autoFocus
                                value={option1}
                                onChange={this.handleChange}
                            />
                            <TextField                            
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="option"
                            label="Add option 2"
                            name="option2"
                            autoComplete="option"
                            autoFocus
                            value={option2}
                            onChange={this.handleChange}
                        />
                        <TextField                            
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="option"
                        label="Add option 3"
                        name="option3"
                        autoComplete="option"
                        autoFocus
                        value={option3}
                        onChange={this.handleChange}
                    />
                    <TextField                            
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="option"
                    label="Add option 4"
                    name="option4"
                    autoComplete="option"
                    autoFocus
                    value={option4}
                    onChange={this.handleChange}
                />
                </>
                            :
                            <>
                            <TextField                            
                            variant="outlined"
                            margin="normal"
                            disabled
                            fullWidth
                            id="option"
                            label="Add option 1"
                            name="option1"
                            autoComplete="option"
                            autoFocus
                            value={option1}
                            onChange={this.handleChange}
                        />
                        <TextField                            
                        variant="outlined"
                        margin="normal"
                        disabled
                        fullWidth
                        id="option"
                        label="Add option 2"
                        name="option2"
                        autoComplete="option"
                        autoFocus
                        value={option2}
                        onChange={this.handleChange}
                    />
                    <TextField                            
                    variant="outlined"
                    margin="normal"
                    disabled
                    fullWidth
                    id="option"
                    label="Add option 3"
                    name="option3"
                    autoComplete="option"
                    autoFocus
                    value={option3}
                    onChange={this.handleChange}
                />
                <TextField                            
                variant="outlined"
                margin="normal"
                disabled
                fullWidth
                id="option"
                label="Add option 4"
                name="option4"
                autoComplete="option"
                autoFocus
                value={option4}
                onChange={this.handleChange}
            />
            </>
                    } */}
                    <Button variant='contained' color='primary'
                        onClick={this.addQuestion}  
                        style={{fontSize:"12px"}}                  >
                        Add Option</Button>


                    <br />
                    <Divider />
                    <br />
                    <Grid container spacing={2}>
                        <Grid md={6} lg={6} sm={3} xs={3}></Grid>
                        <Grid md={3} lg={3} sm={5} xs={5} style={{ textAlign: 'center' }}>
                            <Button variant='contained' color='primary'
                            style={{fontSize:"12px"}}
                             onClick={(e) => { this.handleSubmit(e); this.props.handleOk() }}>Submit</Button>
                        </Grid>
                        <Grid md={3} lg={3} sm={4} xs={4} style={{ textAlign: 'center' }}>
                            <Button variant='contained' 
                            style={{fontSize:"12px"}}
                            color='primary' onClick={() => { this.props.handleCancel() }}>Cancel</Button>
                        </Grid>

                    </Grid>
                </form>

            </div>
        )
    }
}

export default withStyles(styles)(Question);
