import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
//MUI stuff

import Grid from "@material-ui/core/Grid";
//botones 

//redux 
import { connect } from "react-redux";
import Mensaje from "./Mensaje";
import { getMensajes } from "../redux/actions/dataActions";
const styles = {
    root: {
       
        background: "white",
        overflow: 'scroll',
        
        
        display: "block",
      },
    grid: {
       
        
      
      
    },
};



class Chatbox extends Component {
    componentDidMount() {
    this.props.getMensajes();
    }
      render(){
        const {
            classes, user:{
                credentials: {
                    username,
                    artista,    
                },
                loading,
                authenticated,
            },    
            } = this.props;
            const {mensajes}=this.props.data;
            let recentMensajes = !loading ? (
                mensajes.map((mensaje) => (
                  <Mensaje key={mensaje.postId} mensaje={mensaje} />
                ))
              ) : (
                <p>Loading...</p>
              );
            let caja = ! loading ? (
                authenticated ? (
                <Grid container className={classes.root}> 
                    {recentMensajes}
              </Grid>
                ):(
                    <p> inicial sesion para chatear </p>
                )
          ):(
            <p> Loading... </p>
          );
          return caja;
      }
}

  const mapStateToProps = (state) => ({
    data: state.data,  
    user: state.user,
  });    

  Chatbox.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getMensajes: PropTypes.func.isRequired,
  };
  export default connect(
    mapStateToProps, {getMensajes}
  )(withStyles(styles)(Chatbox));
  