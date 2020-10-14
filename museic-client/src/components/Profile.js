import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

//MUI stuff
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const styles = {
    
};

class Profile extends Component {
    render() {
        const { classes, user: { credentials: {username, nombre, Fotolink, bio, seguidores, seguidos}, loading }} = this.props;
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default coneect(mapStateToProps)(withStyles(styles)(Profile))
