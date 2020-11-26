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
import { deletePublicacion, editPublicacion } from '../redux/actions/dataActions';

const styles = {
    TextField: {
        marginBottom: 20
    }, 
};

const options = ["Rock Alternativo", "Ambiente", "Clasica", "Country", "Cumbia", "Dance", "EDM", "Dancehall", "Deep House",
                 "Disco", "Drum & Bass", "Dubstep", "Electrónica", "Folk", "Hip Hop y Rap", "House",
                 "Indie", "Jazz y Blues", "Latina", "Metal", "Piano", "Pop", "R&B y Soul", "Reggae", 
                 "Reguetón", "Rock", "Bandas Sonoras", "Techno", "Trance", "Trap", "Triphop", "Vallenato"];

class EditPublicacion extends Component {
    state = {
        postBody: '',
        open: false,
        anchorEl: null,
        openEdit: false,
        generos:[]
    };
    mapPostDetailsToState = (publicacion) => {
        this.setState({
            postBody: publicacion.postBody,
            generos: publicacion.generos,
        });
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleOpenEdit = () => {
        this.setState({ openEdit: true });
        this.mapPostDetailsToState(this.props.publicacion);
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
        this.props.deletePublicacion(this.props.postId);
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
            postedBy: this.props.publicacion.postedBy,
            generos: this.state.generos
        };
        this.props.publicacion.postBody = this.state.postBody;
        this.props.publicacion.generos = this.state.generos;
        if(this.props.data !== null){
            this.props.data.publicacion.postBody = this.state.postBody;
            this.props.data.publicacion.generos = this.state.generos;
        }
        this.props.editPublicacion(postDetails, this.props.postId);
        this.handleClose();
    }
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
                            Editar Publicacion
                        </DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                    variant="outlined"
                                    name="postBody"
                                    type="text"
                                    label="Algo Musical"
                                    multiline
                                    rows="3"
                                    placeholder="Escribe algo musical"
                                    className={classes.TextField}
                                    value={this.state.postBody}
                                    onChange={this.handleChange}
                                    fullWidth />
                            </form>
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
                            ¿Estas seguro de eliminar esta publicacion?
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

EditPublicacion.propTypes = {
    deletePublicacion: PropTypes.func.isRequired,
    editPublicacion: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    publicacion: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
  });


export default connect(mapStateToProps , {deletePublicacion, editPublicacion })(withStyles(styles)(EditPublicacion));
