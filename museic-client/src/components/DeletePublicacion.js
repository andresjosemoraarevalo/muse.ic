import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deletePublicacion } from '../redux/actions/dataActions';

const styles = {
    
};

class DeletePublicacion extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    deletePublicacion = () => {
        this.props.deletePublicacion(this.props.postId);
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        return (
            <Fragment> 
                <MyButton tip="Borrar Publicacion" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary"/>
                </MyButton>
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

DeletePublicacion.propTypes = {
    deletePublicacion: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null, {deletePublicacion })(withStyles(styles)(DeletePublicacion));
