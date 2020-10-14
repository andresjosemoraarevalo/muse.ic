import React, { Component } from 'react'
import ProfileUser from '../components/ProfileUser';
import PropTypes from 'prop-types';

class user extends Component {
    
    render() {
        return (
                <div>
                    <ProfileUser/>
                </div>
        )
    }
}

user.propTypes = {
    classes: PropTypes.object.isRequired
}


export default user
