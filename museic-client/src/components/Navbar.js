import React, { Component , Fragment} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from "../util/MyButton";
import Notifications from './Notifications';
//MUI stuff
import { fade, makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import AlbumIcon from '@material-ui/icons/Album';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { logoutUser } from "../redux/actions/userActions";

const styles = ({
    search: {
        position: 'relative',
        borderRadius: 3,
        backgroundColor: fade("#FFFFFF", 0.15),
        "&:hover": {
            borderRadius: 3,
            backgroundColor: fade("#FFFFFF", 0.25)
        },
        width: '100%'
    },
    searchIcon: {
        padding: '0px 16px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: fade("#FFFFFF", 0.50),
        backgroundColor: 'inherit',
        borderRadius: 3,
        padding: '4px 4px 4px 0',
        paddingLeft: '46px',
        width: '100%',
    },
    inputInput: {
        
        // vertical padding + font size from searchIcon
        
        //transition: theme.transitions.create('width'),
        
        //[theme.breakpoints.up('md')]: {
        //  width: '20ch',
        //},
    },
});

class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser();
      };
    render() {
        const { authenticated, classes } = this.props;
        return (
          
            <AppBar>
              { authenticated && (
                <Toolbar className="nav-container">
                    { authenticated ? (
                        <Fragment>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Buscar..."
                                    className={classes.inputRoot}
                                    inputProps={{ 'aria-label': 'search' }}
                                />   
                            </div>
                            
                            <Link to="/">
                                <MyButton tip="Home">
                                    <AlbumIcon style={{fill: "white"}}/>
                                </MyButton>
                            </Link>
                            <Notifications />
                            <Link to="/user">
                                <MyButton tip="Perfil">
                                    <PersonIcon style={{fill: "white"}}/>
                                </MyButton>
                            </Link>
                            <Link to ="/intro">
                            <MyButton tip="Logout" onClick={this.handleLogout}>
                                <ExitToAppIcon style={{fill: "white"}} />
                            </MyButton>
                            </Link>
                            
                            
                            
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
    logoutUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})
const mapActionsToProps = { logoutUser };


export default connect(mapStateToProps,mapActionsToProps )(withStyles(styles)(Navbar));
