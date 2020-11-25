import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField } from '@material-ui/core';


import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';


const styles = ({
    paper: {
        padding: 20
    },
    box: {
        backgroundColor: "#800080",
        color: "#FFFFFF",
        marginRight: 10
    },
    boxDiv: {
        marginTop: 20,
        marginBottom: 20,
    },
    TextField: {
        marginBottom: 20
    },
    agregar: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    boton: {
        margin: '8px',
        textTransform: "none"
      },
})

const options = ["Rock Alternativo", "Ambiente", "Clasica", "Country", "Cumbia", "Dance", "EDM", "Dancehall", "Deep House",
                 "Disco", "Drum & Bass", "Dubstep", "Electrónica", "Folk", "Hip Hop y Rap", "House",
                 "Indie", "Jazz y Blues", "Latina", "Metal", "Piano", "Pop", "R&B y Soul", "Reggae", 
                 "Reguetón", "Rock", "Bandas Sonoras", "Techno", "Trance", "Trap", "Triphop", "Vallenato"];

export class EditarDetalles extends Component {
    state = {
        bio: '',
        gustos: [],
        aux: 'hola',
        open: false
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            gustos: credentials.gustos ? credentials.gustos : []
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
            bio: this.state.bio,
            gustos: this.state.gustos
        };
        this.props.editUserDetails(userDetails);
        this.props.credentials.bio = this.state.bio;
        this.props.credentials.gustos = this.state.gustos;
        this.handleClose();
    }
    addGusto = () => {
        const gustos = this.state.gustos;
        const aux = this.state.aux;
        if(gustos.find(gusto => gusto === aux)){
            return alert("No valores duplicados")
        }
        gustos.push(aux);
        this.setState({
            gustos
        })

    }
    onChangeGustos = (event, values) => {
        this.setState({
            gustos: values
        }, () => {
            console.log(this.state.gustos);
        });
    }

    render() {
        const { classes } = this.props;
        return (
              <Fragment>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={this.handleOpen}
                    buttonStyle={{ borderRadius: 5 }}
                    style={{ borderRadius: 5 }}
                    className={classes.boton}
                  >
                    Editar perfil
                  </Button>
                  
                  <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  fullWidth
                  maxWidth="sm">
                    <DialogTitle> 
                        Biografia:
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                variant="outlined"
                                name="bio"
                                type="text"
                                label="Biografia"
                                multiline
                                rows="3"
                                placeholder="Breve descripción de quien eres"
                                className={classes.TextField}
                                value={this.state.bio}
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