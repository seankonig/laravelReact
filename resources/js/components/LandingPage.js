import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = (props) => {
    return (
        <div className="container pt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Welcome</div>
                        <div className="card-body text-center">
                            <div
                                className="btn-group"
                                role="group"
                                aria-label="Basic example"
                            >
                                <Link
                                    to={`/register`}
                                    className="btn btn-md btn-secondary mr-2"
                                >
                                    Register
                                </Link>
                                <Link
                                    to={`/login`}
                                    className="btn btn-md btn-primary"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
