import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { CardHeader, DialogContent, withStyles } from "@material-ui/core";
import MyButton from "../util/MyButton";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from 'react-router-dom';
import LikeButton from './LikeButtom';
import DeletePublicacion from './DeletePublicacion';
// MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
//redux
import { connect } from 'react-redux';
import { getPublicacion, clearErrors } from '../redux/actions/dataActions';

const styles = {
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    card: {
        marginBottom: 15,
    },
    content: {
        padding: 25,
        objectFit: "cover",
    },
    section1: {
        margin: "24px 16px",
    },
    section2: {
        margin: "16px",
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    expandButton: {
        position: 'absolute',
        marginLeft: 'auto'
    },
};

class PublicacionDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }
    componentDidMount() {
        if (this.props.openDialog) {
          this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { publicacion: {postedBy}, postId } = this.props;
        const newPath = `/usuarios/${postedBy}/publicacion/${postId}`;

        if (oldPath === newPath) oldPath = `/usuarios/${postedBy}`;

        window.history.pushState(null, null, newPath);
        
        this.setState({ open: true, oldPath, newPath });
        this.props.getPublicacion(this.props.postId);
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    }

    render(){
        dayjs.extend(relativeTime);
        const { 
            classes, 
            publicacion: {
                postBody,
                postedBy,
                postDate,
                comentarios,
                likes,
                Fotolink,
                postId
              },
            user: {
                authenticated,
                credentials: {
                    username
                }
            },
            UI: { loading }
        } = this.props;

        const deleteButton = authenticated && postedBy === username ? (
            <DeletePublicacion postId={postId}/>
        ) : null

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Card className={classes.card}>
                <CardHeader
                avatar={<Avatar alt={postedBy} src={Fotolink}></Avatar>}
                title={
                    postedBy === username ? (
                    <Typography
                    variant="h6"
                    color="primary"
                    component={Link}
                    to={'/user'}
                    >
                    {postedBy}
                    </Typography>
                    ) : (
                    <Typography
                    variant="h6"
                    color="primary"
                    component={Link}
                    to={`/usuarios/${postedBy}`}
                    >
                    {postedBy}
                    </Typography>
                    )
                    
                }
                action={
                    deleteButton
                }
                subheader={
                    <Typography variant="body2" color="textSecondary">
                    {dayjs(postDate).fromNow()}
                    </Typography>
                }
                />
                <Divider variant="middle" />

                <CardContent>
                <Typography variant="body1" color="textPrimary" component="p" className={classes.section1}>
                    {postBody}
                </Typography>
                <LikeButton postId = {postId}/>
                <span>{likes} Likes</span>
                <MyButton tip="Comentarios">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{comentarios} Comentarios</span>
                
                </CardContent>
            </Card>
        )
        return (
        <Fragment>
            <MyButton onClick={this.handleOpen} tip="Expandir Publicacion" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary" />
            </MyButton>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">  
                <MyButton
                    tip="Cerrar"
                    onClick={this.handleClose}
                    tipClassName={classes.closeButton}
                >
                    <CloseIcon />
                </MyButton>
                {dialogMarkup}
                
            </Dialog>
        </Fragment>

        )
    }
}

PublicacionDialog.propTypes = {
    getPublicacion: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    publicacion: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    publicacion: state.data.publicacion,
    user: state.user,
    UI: state.UI
  });

const mapActionsToProps = {
    getPublicacion,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PublicacionDialog));
