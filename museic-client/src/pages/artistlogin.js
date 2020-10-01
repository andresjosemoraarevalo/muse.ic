import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import imagenLogin from '../images/artistloginimage.jpg';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const styles = {
    root: {
        /*textAlign: 'center',*/
        height: '100vh'
    },
    image: {
        backgroundImage: "url(" + imagenLogin + ")",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    paper: {
        margin: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: '8px'
    },
    avatar: {
        margin: '8px',
        backgroundColor: "#03a9f4"
    },
    submit: {
        margin: '24px 0px 16px'
    }
}



class artistlogin extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const  { classes } = this.props;
        return (
            <Grid container className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <MusicNoteIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar Sesión como Artista
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={this.handleChange}
                            />
                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            type="password"
                            label="Contraseña"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            />
                            <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordarme"
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                            Ingresar
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                    Olvidaste tu contraseña?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                    {"No tienes una cuenta? Registrate aqui"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

artistlogin.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(artistlogin);
