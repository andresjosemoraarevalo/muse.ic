import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions';

class Notifications extends Component {
    state = {
        anchorEl: null
    };
    handleOpen = (event) => {
        this.setState({anchorEl: event.target });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notificaciones
          .filter((not) => not.read === false )
          .map((not) => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    };
    render(){
        const notificaciones = this.props.notificaciones;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        var notificacionesSinMi = notificaciones.filter(n => n.remitente !== this.props.user.credentials.username);
        let notificationsIcon;
        if (notificacionesSinMi && notificacionesSinMi.length > 0){
            notificacionesSinMi.filter(not => not.read === false ).length > 0 
            ? notificationsIcon = (
                <Badge badgeContent={notificacionesSinMi.filter(not => not.read === false ).length}
                    color = "error" className={{backgroundColor: "#03a9f4"}}> 
                    <NotificationsIcon style={{fill: "white"}}/>
                </Badge>
            ) :  (
                notificationsIcon = <NotificationsIcon style={{fill: "white"}}/>
            )
        } else {
            notificationsIcon = <NotificationsIcon style={{fill: "white"}}/>
        }

        let notificationsMarkup =
        notificacionesSinMi && notificacionesSinMi.length > 0 ? (
            notificacionesSinMi.map(not => {
                    const verb = not.type === 'like' ? 'le dio like a ' : 'comentó';
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary';
                    const icon =
                    not.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                    ) : (
                        <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                    );
            return (
                <MenuItem key={not.createdAt} onClick={this.handleClose}>
                  {icon}
                  <Typography
                    component={Link}
                    color="default"
                    variant="body1"
                    to={`/usuarios/${not.destinatario}/publicacion/${not.postId}`}
                  >
                    {not.remitente} {verb} tu Publicacion {time}
                  </Typography>
                </MenuItem>
              );
            })
          ) : (
            <MenuItem onClick={this.handleClose}>
              Aún no tiene ninguna notificación
            </MenuItem>
          );
        return (
            <Fragment>
                <Tooltip placement = "top" title = "Notificaciones">
                    <IconButton aria-owns={anchorEl ? ' simple-menu' : undefined  }
                    aria-haspopup = "true"
                    onClick = {this.handleOpen}
                    >
                        {notificationsIcon  }
                    </IconButton>
                </Tooltip>
                <Menu
                anchorEl = {anchorEl}
                 open = {Boolean (anchorEl )}
                 onClose = {this.handleClose}
                 onEntered = {this.onMenuOpened}
                 >
                    {notificationsMarkup}
                 </Menu>

            </Fragment >
        )
    }

}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notificaciones: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    notificaciones: state.user.notificaciones,
    user: state.user,
});

export default connect ( mapStateToProps, {markNotificationsRead}) (Notifications);