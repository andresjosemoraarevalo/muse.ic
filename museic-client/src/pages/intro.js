import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import imagenLogin from '../images/introimage.jpg';
import Link from 'react-router-dom/Link';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = {
    root: {
        height: '100vh',
        backgroundImage: "url(" + imagenLogin + ")",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    title: {
        height: '100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    introTitle: {
        margin: '20px',
        color: "#FFFFFF"
    },
    paper: {
        margin: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
}

class intro extends Component {
    render() {
        const  { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.root}>
                    <CssBaseline />
                    <Grid container xs={false} sm={4} md={7} className={classes.title}>
                        <Typography component="h2" variant="h2" className={classes.introTitle}>
                            Bienvenido a Muse.ic
                        </Typography>
                        <Typography component="h2" variant="h5" className={classes.introTitle}>
                            No mames que chimba de aplicacion prro
                        </Typography>
                    </Grid>
                    
                    <Grid container xs={12} sm={8} md={5} className={classes.title} square>
                        <div className={classes.paper}>
                            <Typography component="h2" variant="h5" className={classes.introTitle}>
                                Quien sos gonorrea?
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        component={Link}
                                        to="/login"
                                        >
                                        Usuario
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to="/artistlogin"
                                        >
                                        Artista
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>  
                    </Grid>
                </Grid>
            </div>
        )
    }
}

intro.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(intro);
