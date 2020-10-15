import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Tooltip } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';


const styles = ({
    paper: {
        padding: 20
      },
})

export class EditarDetalles extends Component {
    state = {
        bio: '',
        open: false
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
        });
    }
    handleOpen = () => {
        this.setState({open: true})
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({ open: false});
    }
    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }   
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value  
        });
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
              <Fragment>
                  <Tooltip title="Editar bio" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary">

                        </EditIcon>
                    </IconButton>
                  </Tooltip>
                  <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  fullWidth
                  maxWidth="sm">
                    <DialogTitle> 
                        Edite la bio
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                variant="outlined"
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="Breve descripción de quien eres"
                                className={classes.TextField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                                />
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
              </Fragment>
        )
    }
}

EditarDetalles.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})
export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditarDetalles));