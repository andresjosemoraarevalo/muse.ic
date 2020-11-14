import React, { Component, Fragment } from "react";
import { DialogContent, TextField, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { deletePublicacion, editPublicacion } from '../redux/actions/dataActions';

const styles = {
    TextField: {
        marginBottom: 20
    }, 
};

class EditPublicacion extends Component {
    state = {
        postBody: '',
        open: false,
        anchorEl: null,
        openEdit: false
    };
    mapPostDetailsToState = (publicacion) => {
        this.setState({
            postBody: publicacion.postBody,
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
            postedBy: this.props.publicacion.postedBy
        };
        this.props.editPublicacion(postDetails, this.props.postId);
        this.handleClose();
    }
    render() {
        const { classes, publicacion } = this.props;
        const anchorEl = this.state.anchorEl;
        return (
            <Fragment> 
                <MyButton tip="Opciones" onClick={this.handleOpenMenu} btnClassName={classes.deleteButton}>
                    <MoreVertIcon color="secondary"/>
                </MyButton>
                <Menu id="post-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={this.handleCloseMenu}>
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


export default connect(null , {deletePublicacion, editPublicacion })(withStyles(styles)(EditPublicacion));
