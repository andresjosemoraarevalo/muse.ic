import React, { Component } from 'react'
import {withStyles} from '@material-ui/core';

//MUI stuff
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = {
    card: {
        display: 'flex'
    }
}

class Publicacion extends Component{
    render(){
        const{ classes, publicacion : { postBody, postedBy, postDate} } = this.props
    return(
        <Card>
            <CardHeader>
                title={postedBy}
                subheader={postDate}
            </CardHeader>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {postBody}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Like" style={{ color: "#800080" }}>
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
    }
}
export default withStyles(styles)(Publicacion);