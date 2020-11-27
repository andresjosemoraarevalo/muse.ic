import React, { Component, Fragment } from "react";
import MyButton from "../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DialogContent, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { CardHeader } from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
//Iconos
import ShareIcon from "@material-ui/icons/Reply";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";

//Redux
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  postPublicacion,
  clearErrors,
  getPublicacion,
} from "../redux/actions/dataActions";

const styles = {
  root: {
    position: "relative",
    float: "right",
  },
  section1: {
    margin: 5,
    marginLeft: 24
  },
  submitButton: {
    position: "relative",
    marginTop: 20,
    marginBottom: 10,
    float: "right",
    textTransform: "none"
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
  TextField: {
    marginBottom: 20,
  },
};

const options = [
  "Rock Alternativo",
  "Ambiente",
  "Clasica",
  "Country",
  "Cumbia",
  "Dance",
  "EDM",
  "Dancehall",
  "Deep House",
  "Disco",
  "Drum & Bass",
  "Dubstep",
  "Electrónica",
  "Folk",
  "Hip Hop y Rap",
  "House",
  "Indie",
  "Jazz y Blues",
  "Latina",
  "Metal",
  "Piano",
  "Pop",
  "R&B y Soul",
  "Reggae",
  "Reguetón",
  "Rock",
  "Bandas Sonoras",
  "Techno",
  "Trance",
  "Trap",
  "Triphop",
  "Vallenato",
];

export class ShareButtom extends Component {
  state = {
    open: false,
    errors: {},
    postBody2: "",
    generos: [],
  };

  mapPostDetailsToState = (publicacion) => {
    this.setState({
      generos: publicacion.generos,
    });
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
    this.mapPostDetailsToState(this.props.publicacion);
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {}, generos: [] });
  };
  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postPublicacion({
      postBody: this.state.postBody2,
      remix: true,
      remixId: this.props.remixId,
      remixBody: this.props.remixBody,
      remixUsername: this.props.remixUsername,
      generos: this.state.generos,
    });
    this.handleClose();
  };

  onChangeGustos = (event, values) => {
    this.setState({
      generos: values,
    });
    console.log(this.state.generos);
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      publicacion: { postBody, postedBy, Fotolink, postId, remixeado, generos },
      username,
      UI: { loading },
    } = this.props;

    return (
      <div container className={classes.root}>
        <Fragment>
          <MyButton tip="Remixear" onClick={this.handleOpen}>
            <ShareIcon color="primary" />
          </MyButton>

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
            <DialogTitle>Remixea esta publicacion</DialogTitle>
            <Typography
                variant="h6"
                color="primary"
                component={Link}
                to={`/usuarios/${this.props.remixUsername}`}
                className={classes.section1}
              >
                {this.props.remixUsername}
              </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              className={classes.section1}
              variant="body1"
              component={Link}
              to={`/usuarios/${this.props.remixUsername}/publicacion/${postId}`}
            >
              {postBody}
            </Typography>
            
            <DialogContent>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  name="postBody2"
                  type="text"
                  label="Comenta algo sobre este remixeado"
                  multiline
                  rows="3"
                  placeholder="Remixea esta publicacion para tus seguidores"
                  error={errors.postBody2 ? true : false}
                  helperText={errors.postBody2}
                  onChange={this.handleChange}
                  fullWidth
                  className={classes.TextField}
                />

                <Autocomplete
                  multiple
                  id="combo-box-gustos"
                  options={options}
                  fullWidth
                  defaultValue={this.state.generos}
                  filterSelectedOptions
                  onChange={this.onChangeGustos}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Generos"
                      placeholder="Generos"
                      variant="outlined"
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  disabled={loading}
                >
                  Remixear
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

ShareButtom.propTypes = {
  remixId: PropTypes.string.isRequired,
  getPublicacion: PropTypes.func.isRequired,
  publicacion: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  remixUsername: PropTypes.string.isRequired,
  remixBody: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  getPublicacion,
  clearErrors,
  postPublicacion,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ShareButtom));
