import {
    GET_CURRENT_USER_TASKS,
    SET_NEW_USER_TASK,
    CLEAR_CURRENT_TASKS
} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_TASKS:
            return [...state, ...action.payload];
        case SET_NEW_USER_TASK:
            return [...state, action.payload];
        case CLEAR_CURRENT_TASKS:
            return initialState;
        default:
            return state;
    }
};
