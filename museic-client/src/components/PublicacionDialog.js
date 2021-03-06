import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { CardHeader, withStyles } from "@material-ui/core";
import MyButton from "../util/MyButton";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from 'react-router-dom';
import LikeButton from './LikeButtom';
import DontLikeButtom from './DontLikeButtom';
import EditPublicacion from './EditPublicacion';
import CommentForm from './CommentForm';
import Comments from './Comments';
// MUI stuff
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
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
        marginLeft: 'auto',
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
        },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
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

        const { username, postId } = this.props;
        let newPath = `/usuarios/${username}/publicacion/${postId}`;
        
        if (oldPath === newPath) oldPath = `/usuarios/${username}`;

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
                listacomentarios,
                likes,
                dislikes,
                Fotolink,
                comentarios,
                postId,
                remixeado
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
            <EditPublicacion postId={postId} publicacion={this.props.publicacion}/>
        ) : null

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={2} />
            </div>
        ) : (
            <div>
            <Card className={classes.card}>
                <CardHeader
                avatar={<Avatar alt={postedBy} src={Fotolink}></Avatar>}
                title={
                    postedBy === username ? (
                    <Typography
                    variant="h6"
                    color="primary"
                    component={Link}
                    to={`/usuarios/${postedBy}`}
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
                    postedBy === username ? (
                        deleteButton
                    ) : (
                        <MyButton
                            tip="Cerrar"
                            onClick={this.handleClose}
                            tipClassName={classes.closeButton}
                        >
                            <CloseIcon />
                        </MyButton>
                    )
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
                <DontLikeButtom postId = {postId}/>
                <span>{dislikes} Dislikes</span>
                <MyButton tip="Comentarios">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{comentarios} Comentarios</span>
                </CardContent>
                
                
            </Card>
            
            <Comments listacomentarios={listacomentarios} />
            <CommentForm postId={postId} />
            </div>
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
