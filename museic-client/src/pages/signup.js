import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import AppIcon from '../images/logo-blanco-03.png';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        /*textAlign: 'center',*/
        textAlign: 'center'
    },
    paper: {
        margin: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

class signup extends Component {
    render() {
        const  { classes } = this.props;
        return (
            <Grid container className={classes.root}>
                
                <Grid item sm/>
                <Grid item sm component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <img src={AppIcon} alt="disco" width="300" heigth="250"/>
                    </div>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}
signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup);
