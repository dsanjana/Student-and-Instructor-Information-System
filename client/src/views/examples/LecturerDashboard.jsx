import React from "react";

import { withRouter } from 'react-router-dom';

import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import Header from "components/Headers/Header.jsx";
import LecturerHeader from "components/Headers/LecturerHeader.jsx";

import axios from 'axios'

// reactstrap components
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, Container } from "reactstrap";

//import Header from "components/Headers/Header.jsx";

class LecturerDashboard extends React.Component {
    constructor() {
        super()

        this.state = {
        };

        this.routeChange = this.routeChange.bind(this)
        this.routeChange1 = this.routeChange1.bind(this)
        this.routeChange2 = this.routeChange2.bind(this)
        this.routeChange3 = this.routeChange3.bind(this)
    }

    routeChange(e) {
        this.props.history.push('/lecturer/assignments')
    }

    routeChange1(e) {
        this.props.history.push('/lecturer/lecturerView');
    }

    routeChange2(e) {
        this.props.history.push('/lecturer/approvalList');
    }

    routeChange3(e) {
        this.props.history.push('/admin/addMarks');
    }

    render() {
        return (
            <>
                <div
                    className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                    style={{
                        minHeight: "800px",
                        backgroundImage:
                            "url(" + require("assets/img/theme/sliit-login-page-bg.jpg") + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    <span className="mask bg-gradient-default opacity-2" />

                    <Container >
                        <div className="header-body">
                            {/* Card stats */}
                            <Row>
                                <Col lg="6" xl="3" >

                                    <button
                                        type="button" class="btn btn-link"
                                        style={{
                                            minHeight: "250px",
                                            minWidth: "250px",
                                            backgroundImage:
                                                "url(" + require("assets/img/theme/assignmentManager.png") + ")",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        onClick={this.routeChange}
                                    ></button>
                                    <label style={{ marginLeft: 45 }} ><font color="white"><b>Manage Assignments</b></font></label>

                                </Col>
                                <Col lg="6" xl="3" >

                                    <button type="button" class="btn btn-link"
                                        style={{
                                            minHeight: "250px",
                                            minWidth: "250px",
                                            backgroundImage:
                                                "url(" + require("assets/img/theme/uploadedAssignments.png") + ")",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        onClick={this.routeChange1}
                                    ></button>
                                    <label style={{ marginLeft: 45 }} ><font color="white"><b>Uploaded Assignments</b></font></label>
                                </Col>

                                <Col lg="6" xl="3" >

                                    <button type="button" class="btn btn-link"
                                        style={{
                                            minHeight: "250px",
                                            minWidth: "250px",
                                            backgroundImage:
                                                "url(" + require("assets/img/theme/checkmark.png") + ")",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        onClick={this.routeChange3}
                                    ></button>
                                    <label style={{ marginLeft: 45 }} className="form-control-label"><font color="white"><b>Add Marks</b></font></label>
                                </Col>

                                <Col lg="6" xl="3" >

                                    <button type="button" class="btn btn-link"
                                        style={{
                                            minHeight: "250px",
                                            minWidth: "250px",
                                            backgroundImage:
                                                "url(" + require("assets/img/theme/notification.png") + ")",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        onClick={this.routeChange2}
                                    ></button>
                                    <label style={{ marginLeft: 45 }} className="form-control-label"><font color="white"><b>Requested Course List</b></font></label>
                                </Col>


                            </Row>
                        </div>
                    </Container>
                </div>
            </>
        );
    }

}

export default withRouter(LecturerDashboard);
