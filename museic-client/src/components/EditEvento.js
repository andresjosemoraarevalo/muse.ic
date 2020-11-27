import React, { Component, Fragment } from "react";
import { DialogContent, TextField, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { deleteEvento, editEvento} from '../redux/actions/dataActions';

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

const styles = {
    TextField: {
        marginBottom: 20
    }, 
};

const options = ["Rock Alternativo", "Ambiente", "Clasica", "Country", "Cumbia", "Dance", "EDM", "Dancehall", "Deep House",
                 "Disco", "Drum & Bass", "Dubstep", "Electrónica", "Folk", "Hip Hop y Rap", "House",
                 "Indie", "Jazz y Blues", "Latina", "Metal", "Piano", "Pop", "R&B y Soul", "Reggae", 
                 "Reguetón", "Rock", "Bandas Sonoras", "Techno", "Trance", "Trap", "Triphop", "Vallenato"];

class EditEvento extends Component {
    state = {
        open: false,
        anchorEl: null,
        openEdit: false,
        postBody: "",
        nombre: "",
        precio: "",
        lugar: "",
        selectedDate: "",
        errors: {},
        generos:[]
        };
    mapPostDetailsToState = (evento) => {
        this.setState({
            postBody: evento.postBody,
            generos: evento.generos,
            nombre: evento.nombre,
            precio: evento.precio,
            lugar: evento.lugar,
            selectedDate: evento.fechaEvento

        });
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleOpenEdit = () => {
        this.setState({ openEdit: true });
        this.mapPostDetailsToState(this.props.evento);
    };
    handleOpenMenu = (event) => {
        this.setState({anchorEl: event.target });
    }
    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };
    handleClose = () => {
        this.setState({ open: false, openEdit: false, anchorEl: null });
    };
    deletePublicacion = () => {
        this.props.deleteEvento(this.props.postId);
        this.setState({ open: false });
    };
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value  
        });
        //console.log(this.state.postBody);
    };
    handleSubmit = () => {
        const postDetails = {
            postBody: this.state.postBody,
            postedBy: this.props.evento.postedBy,
            generos: this.state.generos,
            nombre: this.state.nombre,
            precio: this.state.precio,
            lugar: this.state.lugar,
            selectedDate: this.state.selectedDate,

        };
        this.props.editEvento(postDetails, this.props.postId);
        this.handleClose();
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
      };
    onChangeGustos = (event, values) => {
        this.setState({
            generos: values
        });
      }
    render() {
        const { classes } = this.props;
        const anchorEl = this.state.anchorEl;
        return (
            <Fragment> 
                <MyButton tip="Opciones" onClick={this.handleOpenMenu} btnClassName={classes.deleteButton}>
                    <MoreVertIcon color="secondary"/>
                </MyButton>
                <Menu 
                    id="post-menu" 
                    anchorEl={anchorEl} 
                    keepMounted 
                    open={Boolean(anchorEl)} 
                    onClose={this.handleCloseMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                    <MenuItem onClick={this.handleOpenEdit}>Editar</MenuItem>
                    <MenuItem onClick={this.handleOpen}>Eliminar</MenuItem>
                </Menu>
                <Dialog
                    open={this.state.openEdit}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                        <DialogTitle>
                            Editar evento
                        </DialogTitle>
                        <DialogContent>
                            <form>
                            <TextField
                variant="outlined"
                name="nombre"
                type="text"
                multiline
                rows="1"
                placeholder="Nombre del evento"
                value={this.state.nombre}
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
                placeholder="Crea una nuevo evento para tus seguidores"
                value={this.state.postBody}
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
                placeholder="precio"
                value={this.state.precio}
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
                placeholder="lugar"
                value={this.state.lugar}
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
                renderInput={(params) => <TextField {...params} label="Generos" placeholder="Generos" variant="outlined"/>}
               />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.grid} justify="space-around">
                <DatePicker
                  margin="normal"
                  label="Fecha"
                  defaultValue={this.state.selectedDate}
                  onChange={this.handleDateChange}
                />
                <TimePicker
                  margin="normal"
                  label="hora"
                  defaultValue={this.state.selectedDate}
                  onChange={this.handleDateChange}
                />
              </Grid>
              
            </MuiPickersUtilsProvider>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Guardar
                            </Button>
                        </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                        <DialogTitle>
                            ¿Estas seguro de eliminar este evento?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={this.deletePublicacion} color="secondary">
                                Eliminar
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}

EditEvento.propTypes = {
    deleteEvento: PropTypes.func.isRequired,
    editEvento: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    publicacion: PropTypes.object.isRequired,
}


export default connect(null , {deleteEvento, editEvento})(withStyles(styles)(EditEvento));
