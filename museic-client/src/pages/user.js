import React, { Component } from 'react'
import ProfileUser from '../components/ProfileUser';
import PropTypes from 'prop-types';
import axios from 'axios';
import Publicacion from "../components/Publicacion";
import { withStyles } from "@material-ui/core";


import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

const styles = {
    root: {
        marginTop: '80px'
    }
}

class user extends Component {
    componentDidMount(){
        const username = this.props.match.params.username;
        this.props.getUserData(username);
        axios.get(`/usuario/${username}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const { publicaciones, loading } = this.props.data;
        const publicacionesMarkup = loading ? (
            <p>loading data</p>
        ) : publicaciones === null ? (
            <p>Sin publicaciones</p>
        ) : (
            publicaciones.map((publicacion) => <Publicacion key={publicacion.postId} publicacion={publicacion}/>)
        )
        const { classes } = this.props;
        return (
                <div container className={classes.root}>

                    <ProfileUser/>
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
