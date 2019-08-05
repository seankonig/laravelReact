import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import { history as routeTo } from '../history'

export const registerUser = (user, history) => (dispatch) => {
    axios
        .post('/api/auth/register', user)
        .then((res) => {
            history.push('/login');
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const loginUser = (user, history) => (dispatch) => {
    axios
        .post('/api/auth/login', user)
        .then((res) => {
            localStorage.setItem('accessToken', res.data.access_token);
            setAuthToken(res.data.access_token);
            const user = res.data.user;
            dispatch(setCurrentUser(user));
            history.push('/dashboard');
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
};

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
};

export const logoutUser = (history) => (dispatch) => {
    axios.post('/api/auth/logout').then((res) => {
        if (res.status === 200) {
            localStorage.removeItem('accessToken');
            setAuthToken(false);
            dispatch(setCurrentUser({}));
            history.push('/login')
        }
    });
};

export const setUser = () => (dispatch) => {
    axios
        .post('/api/auth/profile')
        .then((res) => {
            dispatch(setCurrentUser(res.data));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
};
