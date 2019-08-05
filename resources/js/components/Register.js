import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        };
    }
    //set first name
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        this.props.registerUser(user, this.props.history);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors.errors.errors
            });
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container pt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Register</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="first_name">
                                            First Name:
                                        </label>
                                        <input
                                            type="text"
                                            className={classnames(
                                                'form-control form-control-md',
                                                {
                                                    'is-invalid':
                                                        errors.first_name
                                                }
                                            )}
                                            name="first_name"
                                            placeholder="Your First Name"
                                            value={this.state.first_name}
                                            onChange={this.handleInputChange}
                                        />
                                        {errors.first_name && (
                                            <div className="invalid-feedback">
                                                {errors.first_name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="last_name">
                                            Last Name:
                                        </label>
                                        <input
                                            type="text"
                                            className={classnames(
                                                'form-control form-control-md',
                                                {
                                                    'is-invalid':
                                                        errors.last_name
                                                }
                                            )}
                                            name="last_name"
                                            placeholder="Your Last Name"
                                            value={this.state.lastName}
                                            onChange={this.handleInputChange}
                                        />
                                        {errors.first_name && (
                                            <div className="invalid-feedback">
                                                {errors.last_name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            className={classnames(
                                                'form-control form-control-md',
                                                {
                                                    'is-invalid': errors.email
                                                }
                                            )}
                                            name="email"
                                            placeholder="email"
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            className={classnames(
                                                'form-control form-control-md',
                                                {
                                                    'is-invalid':
                                                        errors.password
                                                }
                                            )}
                                            name="password"
                                            placeholder="Your Password"
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password_confirm">
                                            Confirm Password:
                                        </label>
                                        <input
                                            type="password"
                                            className={classnames(
                                                'form-control form-control-md',
                                                {
                                                    'is-invalid':
                                                        errors.password_confirmation
                                                }
                                            )}
                                            name="password_confirmation"
                                            placeholder="Confirm Your Password"
                                            onChange={this.handleInputChange}
                                        />
                                        {errors.password_confirmation && (
                                            <div className="invalid-feedback">
                                                {errors.password_confirmation}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-md"
                                    >
                                        Register User
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
