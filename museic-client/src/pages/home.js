import React, { Component } from 'react'
import ProfileUser from '../components/ProfileUser';
import Grid from '@material-ui/core/Grid';

class home extends Component {
    render() {
        return (
            <Grid item sm={4} xs={12}>
                <ProfileUser/>
            </Grid>
        )
    }
}

export default home
