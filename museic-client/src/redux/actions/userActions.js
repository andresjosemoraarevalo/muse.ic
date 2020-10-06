import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post("/loginUsuario", userData)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS});
        this.props.history.push("/");
      })
      .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
      });
}

export const getUserData = () => (dispatch) => {
    axios.get('/usuario')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));

}