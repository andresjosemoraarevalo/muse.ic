import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
    invisibleSeparator: {
        border: 'none',
        margin: 4
        },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    commentImage: {
        maxWidth: '100%',
        width: 80,
        height: 80,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: 20,
        marginTop: 6
    },
    commentData: {
        marginLeft: 20
    }
});

class Comments extends Component {
  render(){
    const { listacomentarios, classes } = this.props;
    return(
      <Grid container>
        {listacomentarios.map((comment, index)=> {
            const { username, Fotolink, postDate, body } = comment;
            return(
              <Fragment key = {postDate}>
                <Grid item sm ={12}>
                  <Grid container>
                    <Grid item sm = {2}>
                      <Avatar alt={username} src={Fotolink} className={classes.commentImage}></Avatar>
                    </Grid>
                    <Grid item sm = {10}>
                      <div className ={classes.commentData}>
                        <Typography
                          variant = "h5"
                          component = {Link}
                          to = {`/usuarios/${username}`}
                          color = 'primary'>
                            {username}
                        </Typography>
                        <Typography 
                          variant = "body2"
                          color = "textSecondary">
                          {dayjs(postDate).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className = {classes.invisibleSeparator}/>
                        <Typography variant = "body1">
                          {body}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                {index !== Comments.lenght -1 && (
                  <hr className = {classes.visibleSeparator}/>
                )}
              </Fragment>
            )
        })}
      </Grid>
    )
  }
}

Comments.propTypes = {
  listacomentarios: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);