import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import moment from 'moment';
import { setNewUserTask } from '../../actions/tasks';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/initialize';

class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            due_date: null,
            calenderFocused: false,
            errors: {}
        };
    }

    //set task values
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const task = {
            title: this.state.title,
            description: this.state.description,
            due_date: moment(this.state.due_date).format('YYYY-MM-DD')
        };
        this.props.setNewUserTask(task, this.props.history);
    };

    onDateChange = (due_date) => {
        if (due_date) {
            this.setState({
                due_date
            });
        }
    };

    onCalenderFocusChange = ({ focused }) => {
        this.setState(() => ({ calenderFocused: focused }));
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors != this.props.errors) {
            this.setState({
                errors: nextProps.errors.errors
            });
        } else {
            this.setState({
                title: '',
                description: '',
                due_date: null
            });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">Create new tasks</div>

                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    className={classnames(
                                        'form-control form-control-md',
                                        {
                                            'is-invalid': errors.title
                                        }
                                    )}
                                    name="title"
                                    placeholder="Task title"
                                    value={this.state.title}
                                    onChange={this.handleInputChange}
                                />
                                {errors.title && (
                                    <div className="invalid-feedback">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="Description">
                                    Task Description:
                                </label>
                                <textarea
                                    className={classnames(
                                        'form-control form-control-md',
                                        {
                                            'is-invalid': errors.description
                                        }
                                    )}
                                    name="description"
                                    rows="5"
                                    placeholder="Task Description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">
                                        {errors.description}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="Description">Due Date: </label>
                                <SingleDatePicker
                                    date={this.state.due_date}
                                    onDateChange={this.onDateChange}
                                    focused={this.state.calenderFocused}
                                    onFocusChange={this.onCalenderFocusChange}
                                    numberOfMonths={1}
                                    isOutsideRange={(day) =>
                                        isInclusivelyBeforeDay(
                                            day,
                                            moment().subtract(1, 'd')
                                        )
                                    }
                                    small={true}
                                    block={true}
                                    placeholder="Set Due Date"
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">
                                        {errors.description}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                            >
                                Add New Task
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

CreateTask.propTypes = {
    auth: PropTypes.object.isRequired,
    setNewUserTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    tasks: state.tasks,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { setNewUserTask }
)(withRouter(CreateTask));
