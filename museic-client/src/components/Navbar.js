import React, { Component , Fragment} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    { authenticated ? (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/user">User</Button>
                        </Fragment>
                    ):(
                        <Fragment>
                            <Button color="inherit" component={Link} to="/intro">Intro</Button>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/signup">Singup</Button>
                            <Button color="inherit" component={Link} to="/artistlogin">Artist login</Button>
                        </Fragment>
                    )}
                    </Toolbar>
            </AppBar>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
