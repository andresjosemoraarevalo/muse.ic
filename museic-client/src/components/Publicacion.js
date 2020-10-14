import React, { Component } from 'react'
import {CardHeader, makeStyles, withStyles} from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        marginBottom:20,
    },
    content:{
        padding:25,
        objectFit: 'cover',
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
}));

class Publicacion extends Component{
    render(){
<<<<<<< Updated upstream
        dayjs.extend(relativeTime)
        const{ classes, publicacion : { postBody, postedBy, postDate, comentarios, likes, Fotolink} } = this.props
=======
        const{ classes, publicacion: { postBody, postedBy, postDate} } = this.props
>>>>>>> Stashed changes
    return(
        
        <Card className={classes.card}>
            <div className={classes.section1}>
                <CardHeader
                avatar={
                    <Avatar alt={postedBy} src={Fotolink}>
                    </Avatar>
                }
                title={
                    <Typography variant="h6" component={Link} to={'/users/${postedBy}'}>{postedBy}</Typography>
                }
                subheader={
                    <Typography variant="body2" color="textSecondary">{dayjs(postDate).fromNow()}</Typography>
                }
                />
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
                <CardContent className={classes.content}>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {postBody}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Like" style={{ color: "#800080" }}>
                        <FavoriteIcon />
                    </IconButton>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {likes} Likes
                    </Typography>
                </CardActions>
                <Typography variant="body1" color="textSecondary" component="p" >
                        {comentarios} Comentarios
                </Typography>
            </div>
        </Card>
    )
    }
}
export default withStyles(makeStyles)(Publicacion);