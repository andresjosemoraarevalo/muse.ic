import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { DialogContent, withStyles } from "@material-ui/core";
import MyButton from "../util/MyButton";
//MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

//Reduc stuff
import { connect } from "react-redux";
import { postPublicacion, clearErrors } from "../redux/actions/dataActions";
import Autocomplete from '@material-ui/lab/Autocomplete';
const styles = {
  root: {
    marginTop: 15
  },
  submitButton: {
    position: "relative",
    marginTop: 20,
    marginBottom: 10,
    float: 'right',
    textTransform: "none"
    
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "1%",
  },
  TextField: {
    marginBottom: 20
},
};

const options = ["Rock Alternativo", "Ambiente", "Clasica", "Country", "Cumbia", "Dance", "EDM", "Dancehall", "Deep House",
                 "Disco", "Drum & Bass", "Dubstep", "Electrónica", "Folk", "Hip Hop y Rap", "House",
                 "Indie", "Jazz y Blues", "Latina", "Metal", "Piano", "Pop", "R&B y Soul", "Reggae", 
                 "Reguetón", "Rock", "Bandas Sonoras", "Techno", "Trance", "Trap", "Triphop", "Vallenato"];

class PostPublicacion extends Component {
  state = {
    open: false,
    postBody: "",
    errors: {},
    generos:[],
  };
  componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({
              errors: nextProps.UI.errors
          });
      };
      if(!nextProps.UI.errors && !nextProps.UI.loading){
          this.setState({ postBody: '', open: false, errors: {}, generos:[]});
      }
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
      this.setState({ [event.target.name ]: event.target.value });
  };
  handleSubmit = (event) => {
      event.preventDefault();
      this.props.postPublicacion({ 
        postBody: this.state.postBody, 
        remix:false, 
        remixBody:"" ,
        remixUsername: "",
        remixId: "",
        generos: this.state.generos
      })
  }
  onChangeGustos = (event, values) => {
    this.setState({
        generos: values
    });
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <div container className={classes.root}>
        
         
      <Fragment className={classes.root}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          buttonStyle={{ borderRadius: 25 }}
          style={{ borderRadius: 25, textTransform: "none" }}
          onClick={this.handleOpen}
          startIcon={<PostAddIcon />}
        >
          Publicar
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Cerrar"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Crea una nueva publicacion</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                name="postBody"
                type="text"
                label="Escribe algo musical"
                multiline
                rows="3"
                className={classes.TextField}
                placeholder="Crea una nueva publicacion para tus seguidores"
                error={errors.postBody ? true : false}
                helperText={errors.postBody}
                onChange={this.handleChange}
                fullWidth
              />
              <Autocomplete
                multiple
                id="combo-box-gustos"
                options={options}
                fullWidth
                defaultValue={this.state.gustos}
                filterSelectedOptions                             
                onChange={this.onChangeGustos}
                renderInput={(params) => <TextField {...params} label="Generos" placeholder="Generos" variant="outlined"/>}
               />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Publicar
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
      </div>
    );
  }
}

PostPublicacion.propTypes = {
  postPublicacion: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(
  mapStateToProps, 
  { postPublicacion, clearErrors }
)
(
  withStyles(styles)
  (PostPublicacion)
);
