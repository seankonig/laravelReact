import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(user, this.props.history);
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors.errors.errors
            });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container pt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
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
                                            id="email"
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
                                                'form-control form-control-md ',
                                                {
                                                    'is-invalid':
                                                        errors.password
                                                }
                                            )}
                                            name="password"
                                            id="password"
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

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-md"
                                    >
                                        Submit
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

Login.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
