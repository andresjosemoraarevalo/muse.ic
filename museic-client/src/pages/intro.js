import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import imagenLogin from '../images/introimage.jpg';
import { Link } from 'react-router-dom';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = {
    root: {
        //height: '100vh',
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
        margin: '20px 20px 5px 20px',
        color: "#FFFFFF",
        fontWeight: "bold",
        fontFamily: "century gothic"
    },
    subtitle: {
        margin: '0px 20px 5px',
        color: "#FFFFFF",
        fontFamily: "century gothic"
    },
    paper: {
        margin: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    albums: {
        margin: '10px'
    }
}

class intro extends Component {
    render() {
        const  { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.title}>
                        <Typography component="h2" variant="h2" className={classes.introTitle}>
                            Bienvenido a Muse.ic
                        </Typography>
                        <Typography component="h2" variant="h5" className={classes.subtitle}>
                            La red social de musica que tanto esperabas
                        </Typography>
                        <Grid container spacing={3} className={classes.albums}>
                            <Grid item>
                                <img 
                                alt="Muse.ic"
                                width="150"
                                height="150" 
                                src="https://f4.bcbits.com/img/a1342484953_10.jpg" />
                            </Grid>
                            <Grid item>
                                <img 
                                alt="Muse.ic"
                                width="150"
                                height="150"
                                src="https://f4.bcbits.com/img/a1021729524_10.jpg" />
                            </Grid>
                            <Grid item>
                                <img 
                                alt="Muse.ic"
                                width="150"
                                height="150"
                                src="https://www.mondosonoro.com/wp-content/uploads/2020/04/strokes-new-abnormal.jpg" />
                            </Grid>
                            <Grid item>
                                <img 
                                alt="Muse.ic"
                                width="150"
                                height="150"
                                src="https://www.elquintobeatle.com/wp-content/uploads/2017/06/kendrick-lamar-to-pimp-a-butterfly-1-1068x1068.jpg" />
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12} sm={8} md={5} className={classes.title}>
                        <div className={classes.paper}>
                            <Typography component="h2" variant="h4" className={classes.introTitle}>
                                ¡Empecemos!
                            </Typography>
                            <Typography component="h2" variant="h6" className={classes.subtitle}>
                                ¿Quien eres?
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        component={Link}
                                        //buttonStyle={{ borderRadius: 25 }}
                                        style={{ borderRadius: 25, textTransform: "none", fontSize: '18px' }}
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
                                        //buttonStyle={{ borderRadius: 25 }}
                                        style={{ borderRadius: 25, textTransform: "none",  fontSize: '18px' }}
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
