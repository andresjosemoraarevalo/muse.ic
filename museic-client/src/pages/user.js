import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Publicacion from "../components/Publicacion";
import { withStyles } from "@material-ui/core";
import StaticProfile from '../components/StaticProfile';
import CircularProgress from "@material-ui/core/CircularProgress";


import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

const styles = {
    root: {
        padding: '80px 300px 0px',
    },
    progressSpinner: {
        position: "absolute",
      },
}

class user extends Component {
    state = {
        profile: null,
        postIdParam: undefined,
        userId: null
    }
    componentDidMount(){
        const username = this.props.match.params.username;
        const postId = this.props.match.params.postId;
        this.setState({ userId: username});
        if (postId) this.setState({postIdParam: postId});

        this.fetchUser(this.props.match.params.username);
    }
    fetchUser(userId){
        this.props.getUserData(userId);
        axios.get(`/usuario/${userId}`)
            .then(res => {
                this.setState({
                    profile: res.data.user,
                    userId: userId
                })
            })
            .catch(err => console.log(err));
    }
    componentDidUpdate(){
        const userId = this.props.match.params.username;
        const postIdd = this.props.match.params.postId;

        //window.location.href = `/usuarios/${userId}`;
        if(userId !== this.state.userId){
            this.setState({ userId: userId });
            this.fetchUser(this.props.match.params.username);
        }
        if(postIdd !== this.state.postIdParam){
            this.setState({ postIdParam: postIdd });
            this.fetchUser(this.props.match.params.username);
        }
    }

    render() {
        const { publicaciones, loading } = this.props.data;
        const { postIdParam } = this.state;
        const publicacionesMarkup = loading ? (
            <p> </p>
        ) : publicaciones === null ? (
            <p>Sin publicaciones</p>
        ) : !postIdParam ? (
            publicaciones.map((publicacion) => <Publicacion key={publicacion.postId} publicacion={publicacion}/>)
        ) : (
            publicaciones.map(publicacion => {
                if(publicacion.postId !== postIdParam)
                    return <Publicacion key={publicacion.postId} publicacion={publicacion}/>
                else return <Publicacion key={publicacion.postId} publicacion={publicacion} openDialog />
            })
        );

        const { classes } = this.props;
        return (
                <div container className={classes.root}>
                    {this.state.profile === null ?  (
                        <CircularProgress
                        size={60}
                        className={classes.progressSpinner}
                      />
                    ) : (
                        <StaticProfile profile={this.state.profile}/>
                        
                    )}
                    
                    <div>
                        {publicacionesMarkup}
                    </div>
                </div>
        )
    }
}

user.propTypes = {
    classes: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state=> ({
    data: state.data
});


export default connect(mapStateToProps, {getUserData})(withStyles(styles)(user));
