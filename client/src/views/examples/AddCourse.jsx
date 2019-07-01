import React, { Component } from 'react';
import axios from 'axios'

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
//import UserHeader from "components/Headers/UserHeader.jsx";
import AdminHeader from "components/Headers/AdminHeader.jsx";

class AddCourse extends React.Component {
    constructor() {
        super()

        this.state = {
            courseno: '',
            coursename: '',
            credits: '',
            coursedetails: '',
            instructor: '',
            instrut: []
        }

        this.onClickCourseNo = this.onClickCourseNo.bind(this);
        this.onClickCourseName = this.onClickCourseName.bind(this);
        this.onClickCredits = this.onClickCredits.bind(this);
        this.onClickCourseDetails = this.onClickCourseDetails.bind(this);
        this.onClickInstructors = this.onClickInstructors.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    onClickCourseNo(e) {
        this.setState({
            courseno: e.target.value
        });
    }

    onClickCourseName(e) {
        this.setState({
            coursename: e.target.value
        });
    }


    onClickCredits(e) {
        this.setState({
            credits: e.target.value
        });
    }

    onClickCourseDetails(e) {
        this.setState({
            coursedetails: e.target.value
        })
    }

    onClickInstructors(e) {
        this.setState({
            instructor: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            courseno: this.state.courseno,
            coursename: this.state.coursename,
            credits: this.state.credits,
            coursedetails: this.state.coursedetails,
            instructor: this.state.instructor,
            id:this.state.id




        };
        axios.post('http://localhost:5000/approves/add', obj, {headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(res => console.log(res.data));

        this.setState({
            courseno: '',
            coursename: '',
            credits: '',
            coursedetails: '',
            instructor: '',

        })

    }

    componentDidMount() {
        axios.get('http://localhost:5000/lectures',{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(
            data => {
                this.setState({
                    instrut: data.data
                })

                console.log(data.data)
            }
        )
    }

    routeChange(e) {
        this.props.history.push('/admin_/courseList')
    }

    render() {
        return (
            <>
                <AdminHeader />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Add New Course</h3>
                                </Col>
                                <Col className="text-right" xs="4">
                                    <Button
                                        color="primary"
                                        onClick={this.routeChange}
                                        //size="sm"
                                    >
                                        Current Course List
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* <Form onSubmit={this.onSubmit}> */}
                            <Form onSubmit={this.onSubmit}>
                                <div className="pl-lg-4">
                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Course No : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Assignment Name"
                                            type="text"
                                            value={this.state.courseno}
                                            onChange={this.onClickCourseNo}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Course Name : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Assignment Name"
                                            type="text"
                                            value={this.state.coursename}
                                            onChange={this.onClickCourseName}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Credits : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Assignment Name"
                                            type="text"
                                            value={this.state.credits}
                                            onChange={this.onClickCredits}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Course Details : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Assignment Name"
                                            type="text"
                                            value={this.state.coursedetails}
                                            onChange={this.onClickCourseDetails}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Instructors : </label>
                                        <select name="lecturer" className="form-control" onChange={this.onClickInstructors} value={this.state.instructor}
                                            placeholder="Select the lecture">
                                            {
                                                this.state.instrut.map(lec => {
                                                    return (
                                                        <option key={lec.lecName} value={lec.lecName}>{lec.lecName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <input type="submit" value="Register Course" className="btn btn-primary" />
                                    </FormGroup>

                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </>
        );
    }
}

export default AddCourse;
