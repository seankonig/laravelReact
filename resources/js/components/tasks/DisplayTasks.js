import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
    getUserTasks,
    getTasksByDate,
    clearCurrentTasks
} from '../../actions/tasks';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import moment from 'moment';

class DisplayTasks extends Component {
    constructor(props) {
        super(props);
        this.user = { ...this.props.auth.user };
        this.state = {
            tasks: [],
            selectedDate: moment(),
            calenderFocused: false,
            errors: {}
        };
    }

    onDateChange = (selectedDate) => {
        if (selectedDate) {
            this.setState({
                selectedDate
            });
            const data = {
                date: moment(selectedDate).format('YYYY-MM-DD')
            };
            this.props.clearCurrentTasks();
            this.props.getTasksByDate(data);
        }
    };

    onCalenderFocusChange = ({ focused }) => {
        this.setState(() => ({ calenderFocused: focused }));
    };

    componentWillMount() {
        this.props.getUserTasks();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tasks !== this.state.tasks) {
            const date = this.state.selectedDate.format('YYYY-MM-DD');
            const tasks = nextProps.tasks.filter(
                (task) => task.due_date === date
            );
            this.setState({ tasks: [...tasks] });
        }
    }

    renderTasks = () => {
        if (this.state.tasks.length) {
            return this.state.tasks.map((task) => (
                <div key={task.id} className="media">
                    <div className="media-body">
                        <div>
                            {task.title}{' '}
                            <span className="text-muted text-sm-left font-weight-light">
                                <br />
                                created: {moment(task.created_at).fromNow()}
                            </span>
                            <button
                                onClick={() => this.handleDelete(task.id)}
                                className="btn btn-danger btn-sm float-right"
                            >
                                Delete
                            </button>
                        </div>
                        <hr />
                    </div>
                </div>
            ));
        }
        return (
            <div>
                <div className="media-body">
                    <div>No tasks to for this date</div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        Your Tasks
                        <small className="card-subtitle mb-2 text-muted mt-2">
                            {' '}
                            (Today by default)
                        </small>
                    </div>
                    <div className="card-header">
                        <SingleDatePicker
                            date={this.state.selectedDate}
                            onDateChange={this.onDateChange}
                            focused={this.state.calenderFocused}
                            onFocusChange={this.onCalenderFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            small={true}
                            block={true}
                            placeholder="Change dates"
                        />
                    </div>

                    <div className="card-body">{this.renderTasks()}</div>
                </div>
            </div>
        );
    }
}

DisplayTasks.propTypes = {
    auth: PropTypes.object.isRequired,
    getUserTasks: PropTypes.func.isRequired,
    getTasksByDate: PropTypes.func.isRequired,
    clearCurrentTasks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    tasks: state.tasks,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getUserTasks, getTasksByDate, clearCurrentTasks }
)(withRouter(DisplayTasks));
