import React, { Component } from 'react';
import CreateTask from './tasks/CreateTask';
import DisplayTasks from './tasks/DisplayTasks';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            tasks: [],
            errors: {}
        };
    }

    render() {
        return (
            <div className="container pt-5">
                <div className="row justify-content-center">
                    <CreateTask />
                    <DisplayTasks />
                </div>
            </div>
        );
    };
};

export default Tasks;