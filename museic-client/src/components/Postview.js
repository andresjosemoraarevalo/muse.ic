import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
//Reduc stuff
import { connect } from 'react-redux';
import { postPublicacion } from '../redux/actions/dataActions';

const styles = {

}

class Postview extends Component{
     state = {
        open: false,
        postBody: '',
        errors: {}
     };
     handleOpen = () => {
        this.setState({ open: true })
     };
     handleClose = () => {
        this.setState({ open: false })
     };
     render(){
         const { errors } = this.state;
         const { classes, UI: { loading } } = this.props;
         return (
             <Fragment>

             </Fragment>
         )
     }
}

Postview.propTypes = {
    postPublicacion: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postPublicacion})(withStyles(styles)(Postview));