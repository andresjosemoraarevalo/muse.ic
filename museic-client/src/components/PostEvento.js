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
import Autocomplete from '@material-ui/lab/Autocomplete';
//Reduc stuff
import { connect } from "react-redux";
import { postEvento, clearErrors } from "../redux/actions/dataActions";

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
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

class PostEvento extends Component {
  
  state = {
    open: false,
    postBody: "",
    nombre: "",
    precio: "",
    lugar: "",
    selectedDate: "",
    errors: {},
    generos:[]
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
      this.props.postEvento({ 
        postBody: this.state.postBody ,
        nombre: this.state.nombre,
        precio : this.state.precio,
        lugar: this.state.lugar,
        fecha: this.state.selectedDate,
        generos: this.state.generos
      })
  };
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  onChangeGustos = (event, values) => {
    this.setState({
        generos: values
    });
  };
  render() {
    const { selectedDate } = this.state;
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
          Crear Evento
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
          <DialogTitle>Crea un nuevo evento</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
            <TextField
                variant="outlined"
                name="nombre"
                type="text"
                multiline
                rows="1"
                placeholder="Nombre del evento"
                label="Nombre del evento"
                error={errors.nombre ? true : false}
                helperText={errors.nombre}
                onChange={this.handleChange}
                fullWidth
                className={classes.TextField}
              />
              <TextField
                variant="outlined"
                name="postBody"
                type="text"
                multiline
                rows="3"
                placeholder="Descripción del evento"
                label="Descripción del evento"
                error={errors.postBody ? true : false}
                helperText={errors.postBody}
                onChange={this.handleChange}
                fullWidth
                className={classes.TextField}
              />

              <TextField
                variant="outlined"
                name="precio"
                type="text"
                multiline
                rows="1"
                placeholder="Precio"
                label="Precio"
                error={errors.precio ? true : false}
                helperText={errors.precio}
                onChange={this.handleChange}
                fullWidth
                className={classes.TextField}
              />
              <TextField
                variant="outlined"
                name="lugar"
                type="text"
                multiline
                rows="1"
                placeholder="Lugar"
                label="Lugar"
                error={errors.lugar ? true : false}
                helperText={errors.lugar}
                onChange={this.handleChange}
                fullWidth
                className={classes.TextField}
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.grid} justify="space-around">
                <DatePicker
                  margin="normal"
                  label="Fecha"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
                <TimePicker
                  margin="normal"
                  label="Hora"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
              </Grid>
              
            </MuiPickersUtilsProvider>
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

PostEvento.propTypes = {
  postEvento: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postEvento, clearErrors })(
  withStyles(styles)(PostEvento)
);
