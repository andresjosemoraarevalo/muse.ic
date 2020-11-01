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
import RepostIcon from '@material-ui/icons/Sync';

//Reduc stuff
import { connect } from "react-redux";
import { repostPublicacion} from "../redux/actions/userActions";
import { clearErrors} from "../redux/actions/dataActions"; 

const styles = {
  root: {
    marginTop: 15
  },
  submitButton: {
    position: "relative",
    marginTop: 20,
    marginBottom: 10,
    float: 'right',
    
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
};

class RepostPublicacion extends Component {
  state = {
    open: false,
    postBody: "",
    errors: {},
  };
  componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({
              errors: nextProps.UI.errors
          });
      };
      if(!nextProps.UI.errors && !nextProps.UI.loading){
          this.setState({ postBody: '', open: false, errors: {}});
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
      this.props.postPublicacion({ postBody: this.state.postBody })
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    return (
        
        <Fragment className={classes.root}>

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
            <CloseIcon/>
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
                placeholder="Crea una nueva publicacion para tus seguidores"
                error={errors.postBody ? true : false}
                helperText={errors.postBody}
                onChange={this.handleChange}
                fullWidth
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
    );
  }
}

RepostPublicacion.propTypes = {
  repostPublicacion: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { repostPublicacion, clearErrors })(
  withStyles(styles)(RepostPublicacion)
);
