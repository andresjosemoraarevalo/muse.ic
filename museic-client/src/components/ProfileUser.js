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
import LocationOn from '@material-ui/icons/LocationOn'; 
import LinkIcon from '@material-ui/icons/Link'; 
import CalendarToday from '@material-ui/icons/CalendarToday'; 

//Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }

      },
      '& .profile-image': {
        order: 1,
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        order: 2,
        minwidth :12,
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  });

class ProfileUser extends Component {
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
            <Paper className = {classes.paper}>
                <div className={classes.profile}>
                    <div className="profile-image">
                        <img src={Fotolink} alt="profile"/>
                    </div>
                    <hr/>
                    <div className="profile-details">
                    <hr/>
                    <MuiLink component={Link} to={`/Usuario/${username}`} color="primary" variant="h5">  
                        @{username}
                    </MuiLink>
                    <hr/>
                        <span>{seguidores && <Typography variant="body2">{seguidores}</Typography>} seguidores      </span>
                        <span>{seguidos && <Typography variant="body2">{seguidos}</Typography>} seguidos </span>
                    <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                     {website && (
                        <Fragment>
                        <LinkIcon color="primary"/>
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            {' '}{website}
                        </a>
                        <hr/>
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />{' '}
                    <span>Fecha de nacimiento {dayjs(FechaNacimiento).format('DD MMM YYYY')}</span>
                    </div>
                </div>
            </Paper>
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

ProfileUser.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(ProfileUser))