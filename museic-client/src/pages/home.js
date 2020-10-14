import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

import Publicacion from '../components/Publicacion';

const styles = {
    root: {
        margin: '64px 32px'
        
    }
}

class home extends Component {
    state = {
        publicaciones: null
    }
    componentDidMount(){
        axios.get('/getPublicaciones')
         .then(res=>{
             console.log(res.data)
             this.setState({
                 publicaciones: res.data
             })
         })
         .catch(err => console.log(err));
    }
    render(){
        let recentPublicacionesMarkup = this.state.publicaciones ? (
<<<<<<< Updated upstream
            this.state.publicaciones.map((publicacion) => <Publicacion key={publicacion.postId} publicacion={publicacion}/>)
=======
            this.state.publicaciones.map((publicacion) => <Publicacion publicacion={publicacion}/>)
>>>>>>> Stashed changes
        ) : (
            <p>Loading...</p>
        );
        const {classes} = this.props;
        return (
            <Grid container className={classes.root} spacing={3} alignItems="center">
<<<<<<< Updated upstream
                <Grid item xs={8}>
                    <p>Crear Publicacion</p>
                    <Paper>Crear</Paper>
                </Grid>
                <Grid item xs={4}>
                    Chat...
                </Grid>
                <Grid item xs={8}>
                    {recentPublicacionesMarkup}
                </Grid>
                
                
=======
                <Grid item sm={11} xs={12}>
                    <p>Crear Publicacion</p>
                    <Paper>Crear</Paper>
                </Grid>
                <Grid item sm={11} xs={12}>
                    {recentPublicacionesMarkup}
                </Grid>
>>>>>>> Stashed changes
            </Grid>
        );
    }
}
home.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(home);
