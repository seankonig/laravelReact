import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class DashboardPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = { ...this.props.auth.user };
        return (
            <div className="container pt-5">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                Hi {user.first_name}
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <div>
                                                    Tasks for {user.first_name}
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    New Task
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <div>Users</div>
                                            </div>
                                            <div className="card-body">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Add User
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <div>Residence</div>
                                            </div>
                                            <div className="card-body">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Add Resident
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(withRouter(DashboardPage));
