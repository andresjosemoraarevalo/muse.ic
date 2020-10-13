import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
//MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//Iconos
import LinkIcon from '@material-ui/icons/Link'; 
import CalendarToday from '@material-ui/icons/CalendarToday'; 
import Backspace from '@material-ui/icons/Backspace';
//Redux
import { connect } from 'react-redux';
import {logoutUser, uploadImage } from '../redux/actions/userActions';
import { IconButton } from '@material-ui/core';

const styles ={
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
                 margin: '20px 10px'
    },
    }     
}

class ProfileUser extends Component {
    
    handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
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
                             <div>
                                 <Grid container xs={false} sm={4} md={7} className = {classes.paper}>
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
                                             </div>
                                     </div>
                                                  
                                     <Grid container spacing={3}>
                                         <Grid item xs>
                                         <MuiLink component={Link} to={`/Usuario/${username}`} color="primary" variant="h5">
                                                 @{username}
                                         </MuiLink>
                                         </Grid>
                             
                                         <Grid container spacing={3}>
                                             
                                             <span>
                                                {seguidores && <Typography variant="body2">{seguidores}</Typography>}seguidores
                                             </span>
                                                     
                                             <Grid container spacing={3}>
                                             
                                                 <span>
                                                    {seguidos && <Typography variant="body2">{seguidos}</Typography>} seguidos
                                                </span>
                                                 <Grid container spacing={3}>
                                                     {bio && <Typography variant="body2">{bio}</Typography>}
                                                 </Grid>
                                             </Grid>
                                         </Grid>
                                     </Grid>
                                 </Grid>
                     {website && (
                        <Fragment>
                        <LinkIcon color="primary"/>
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            {' '}{website}
                        </a>
                        </Fragment>
                    )}
                            
                    <Grid container xs={12} sm={8} md={5} className="profile-details"square>
                        <div className={classes.paper}>
                                
                        <CalendarToday color="primary" />{' '}
                        <span>Fecha de nacimiento {dayjs(FechaNacimiento).format('DD MMM YYYY')}</span>
                        </div>
                    </Grid>
                    <Tooltip title="Logout" placemente="top">
                        <IconButton onClick={this.handleLogout}>
                            <Backspace color="primary">

                            </Backspace>
                        </IconButton>
                    </Tooltip>

                </div>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No se encontro un perfil asociado, porfavor reingrese
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<p>loading..</p>)

        return profileMarkup;    
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionToProps = {logoutUser, uploadImage};

ProfileUser.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(ProfileUser))
