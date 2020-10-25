import React, { Component , Fragment} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from "../util/MyButton";
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import AlbumIcon from '@material-ui/icons/Album';


class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (
          
            <AppBar>
              { authenticated && (
                <Toolbar className="nav-container">
                    { authenticated ? (
                        <Fragment>
                            <Link to="/">
                                <MyButton tip="Home">
                                    <AlbumIcon style={{fill: "white"}}/>
                                </MyButton>
                            </Link>
                            <Link to="/user">
                                <MyButton tip="Perfil">
                                    <PersonIcon style={{fill: "white"}}/>
                                </MyButton>
                            </Link>
                            <MyButton tip="Logout" onClick={this.handleLogout}>
                                <ExitToAppIcon style={{fill: "white"}} />
                            </MyButton>
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
                    )}
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
