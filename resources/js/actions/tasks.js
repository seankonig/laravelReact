import {
    GET_ERRORS,
    GET_CURRENT_USER_TASKS,
    SET_NEW_USER_TASK,
    CLEAR_CURRENT_TASKS
} from './types';

export const getTasks = (tasks) => {
    return {
        type: GET_CURRENT_USER_TASKS,
        payload: tasks
    };
};

export const setTask = (task) => {
    return {
        type: SET_NEW_USER_TASK,
        payload: task
    };
};

export const clearTasks = () => {
    return {
        type: CLEAR_CURRENT_TASKS
    };
};

export const getUserTasks = () => (dispatch) => {
    axios
        .get(`/api/auth/tasks`)
        .then((res) => {
            dispatch(getTasks(res.data.tasks));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setNewUserTask = (task, history) => (dispatch) => {
    axios
        .post(`/api/auth/tasks/`, task)
        .then((res) => {
            const task = res.data.task;
            dispatch(setTask(task));
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            history.push('/tasks');
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            });
        });
};

export const clearCurrentTasks = () => (dispatch) => {
    dispatch(clearTasks());
};

export const getTasksByDate = (data) => (dispatch) => {
    axios
        .get('api/auth/tasks', {
            params: {
                selectedDate: data.date
            }
        })
        .then((res) => {
            const tasks = res.data.tasks;
            dispatch(getTasks(tasks));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            });
        });
};
