import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditarDetalles from '../components/EditarDetalles';
//MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import MyButton from '../util/MyButton';

//Iconos
import LinkIcon from '@material-ui/icons/Link'; 
import CalendarToday from '@material-ui/icons/CalendarToday'; 
import Backspace from '@material-ui/icons/Backspace';
import EditIcon from '@material-ui/icons/Edit';
//Redux
import { connect } from 'react-redux';
import {logoutUser, uploadImage } from '../redux/actions/userActions';
import { IconButton } from '@material-ui/core';

const styles ={
    paper: {
        padding: 20
    },
    Fotolink : {
        height: '100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    username : {
        height: '100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    FechaNacimiento : {
        height: '100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    seguidos : {
        height: '100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    seguidores : {
        height: '100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    bio : {
        height: '100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    button:{
        textAlign: 'center',
            '& a': {
                 margin: '2210px 170px'
    },
    }     
}


    
    
class ProfileUser extends Component {
    
    handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData); 
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const {
            classes, 
            user: {
                credentials: {
                username, FechaNacimiento, seguidos, seguidores, Fotolink, bio, website},
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
            <div className={classes.root}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <div className={classes.paper}>
                    <div className={classes.profile}>
                    </div>
                      <div className="image-wrapper">
                        <img src={Fotolink} alt="profile" className="profile-image" />
                        <input
                          type="file"
                          id="imageInput"
                          hidden="hidden"
                          onChange={this.handleImageChange}
                        />
                        <MyButton
                            tip="Edit profile picture"
                            onClick={this.handleEditPicture}
                            btnClassName="button"
                        >
                        <EditIcon color="primary" />
                        </MyButton>
                      </div>
                     </div>
                    </Grid>
                    <Grid item xs={6}>
                    <MuiLink component={Link} to={`/user`} color="primary" variant="h5">
                                    @{username}
                                </MuiLink>
                                <hr></hr>  
                                    <span>    {seguidores && <Typography variant="body2">{seguidores}</Typography>} seguidores        </span>
                                    <span>  {seguidos && <Typography variant="body2">{seguidos}</Typography>} seguidos </span>
                                <hr></hr>  
                                    {bio && <Typography variant="body2">{bio}</Typography>}
                                <hr></hr>  
                                 {website && (
                                    <Fragment>
                                    <LinkIcon color="primary"/>
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        {' '}{website}
                                    </a>
                                    </Fragment>
                                )}
                                <CalendarToday color="primary" />{' '}
                                <span>       {dayjs(FechaNacimiento).format('DD MMM YYYY')}</span>
                                <hr></hr>       
                                <Tooltip title="Logout" placemente="top">
                                <IconButton onClick={this.handleLogout}> 
                                <Backspace color="primary">
                            </Backspace>  Logout
                        </IconButton>
                        
                    </Tooltip>
                    <EditarDetalles />
                    </Grid>
                    
                  </Grid>
                </div> 
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
                </Typography>
            </Paper>
        )) : ( <div>Cargando..</div>)

        return profileMarkup;    
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionToProps = {logoutUser, uploadImage};

ProfileUser.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProfileUser))
