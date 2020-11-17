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

function ordenarAsc(p_array_json, p_key) {
  p_array_json.sort(function (a, b) {
     return a[p_key] > b[p_key];
  });
}
function ordenarDesc(p_array_json, p_key) {
  ordenarAsc(p_array_json, p_key); p_array_json.reverse(); 
}
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
            let {mensajes}=this.props.data;
            ordenarDesc(mensajes,'postDate');
            console.log(mensajes);
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
  