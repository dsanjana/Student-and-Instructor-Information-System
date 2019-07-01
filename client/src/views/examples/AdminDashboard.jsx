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

class AdminDashboard extends React.Component {
    constructor() {
        super()

        this.state = {
        };

        this.routeChange=this.routeChange.bind(this)
        this.routeChange1=this.routeChange1.bind(this)
    }

     routeChange(e) {
         this.props.history.push('/admin/createUser')
     }

     routeChange1(e) {
         this.props.history.push('/admin_/createCourse');
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

                    <Container>
                        <div className="header-body" >
                            {/* Card stats */}
                            <Row >
                                <Col lg="6" xl="3" style={{marginLeft:"15rem"}}>

                                    <button 
                                    type="button" class="btn btn-link"
                                        style={{
                                            minHeight: "250px",
                                            minWidth: "250px",
                                            backgroundImage:
                                                "url(" + require("assets/img/theme/user.png") + ")",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        onClick={this.routeChange}
                                    ></button>
                                    <label style={{ marginLeft: 45}} ><font color="white"><b>Manage Users</b></font></label>

                                </Col>
                                <Col lg="6" xl="3" style={{marginLeft:"5rem"}}>

                                    <button type="button" class="btn btn-link"
                                        style={{
                                            minHeight: "250px",
                                            minWidth: "250px",
                                            backgroundImage:
                                                "url(" + require("assets/img/theme/couese.png") + ")",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        onClick={this.routeChange1}
                                    ></button>
                                    <label style={{ marginLeft: 45}} ><font color="white"><b>Manage Courses</b></font></label>
                                </Col>

                                {/* <Col lg="6" xl="3" >

                                    <button type="button" class="btn btn-link"
                                        style={{
                                            minHeight: "268px",
                                            minWidth: "270px",
                                            backgroundImage:
                                                "url(" + require("assets/img/theme/addMarks.png") + ")",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        onClick={this.routeChange}
                                    ></button>
                                    <label style={{ marginLeft: 45}} className="form-control-label"><font color="white"><b>Select the Course Name</b></font></label>
                                </Col> */}
                            </Row>
                        </div>
                    </Container>
                </div>
            </>
        );
    }
    
}

export default withRouter(AdminDashboard);
