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

class EditCourse extends React.Component {
    constructor() {
        super()

        this.state = {
            courseno: '',
            coursename: '',
            credits:'',
            coursedetails:'',
            instructor:'',
            oldCourseName: ''
        }

        this.onClickCourseNo = this.onClickCourseNo.bind(this);
        this.onClickCourseName = this.onClickCourseName.bind(this);
        this.onClickCredits = this.onClickCredits.bind(this);
        this.onClickCourseDetails = this.onClickCourseDetails.bind(this);
        this.onClickInstructors = this.onClickInstructors.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

        };
        axios.post('http://localhost:5000/courses/update/'+this.props.match.params.id, obj,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(res => console.log(res.data));

            axios.post('http://localhost:5000/assignment/updateAllCourses/'+this.state.oldCourseName+'/'+this.state.coursename,{headers: {
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
              }
            })
            .then(res => console.log(res.data));

            axios.post('http://localhost:5000/api/updateAllCourses/'+this.state.oldCourseName+'/'+this.state.coursename,{headers: {
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
              }
            })
            .then(res => console.log(res.data));

    }

    componentDidMount() {
        alert(this.props.match.params.id)
        axios.get('http://localhost:5000/courses/edit/'+this.props.match.params.id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(response => {
                this.setState({
                    courseno: response.data.courseno,
                    coursename: response.data.coursename,
                    credits: response.data.credits,
                    coursedetails: response.data.coursedetails,
                    instructor: response.data.instructor,

                    oldCourseName: response.data.coursename
                });
            })
            .catch(function (error) {
                console.log(error);
            })
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
                                    <input type="submit" value="Update Course" className="btn btn-primary"/>
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

export default EditCourse;
