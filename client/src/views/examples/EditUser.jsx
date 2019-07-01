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

class EditUsers extends React.Component {
    constructor() {
        super()

        this.state = {
            lecId: '',
            lecName: '',
            typeOfEmp: '',
            lecturedetails: '',
            faculty: '',
            passwrd: '',
            email: ''
        }

        this.onClickLectureId = this.onClickLectureId.bind(this);
        this.onClickLectureName = this.onClickLectureName.bind(this);
        this.onClickType = this.onClickType.bind(this);
        this.onClickLectureDetails = this.onClickLectureDetails.bind(this);
        this.onClickFaculty = this.onClickFaculty.bind(this);
        this.onClickPassword = this.onClickPassword.bind(this);
        this.onClickEmail = this.onClickEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onClickLectureId(e) {
        this.setState({
            lecId: e.target.value
        });
    }

    onClickLectureName(e) {
        this.setState({
            lecName: e.target.value
        });
    }


    onClickType(e) {
        this.setState({
            typeOfEmp: e.target.value
        });
    }

    onClickLectureDetails(e) {
        this.setState({
            lecturedetails: e.target.value
        })
    }

    onClickFaculty(e) {
        this.setState({
            faculty: e.target.value
        })
    }

    onClickPassword(e) {
        this.setState({
            passwrd: e.target.value
        })
    }

    onClickEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            lecId: this.state.lecId,
            lecName: this.state.lecName,
            typeOfEmp: this.state.typeOfEmp,
            lecturedetails: this.state.lecturedetails,
            faculty: this.state.faculty,
            //passwrd:this.state.passwrd,
            email:this.state.email

        };
        axios.post('http://localhost:5000/lectures/update/'+this.props.match.params.id, obj,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(res =>  console.log(res.data));

            this.setState({
                lecId: '',
                lecName: '',
                typeOfEmp: '',
                lecturedetails: '',
                faculty: '',
                //passwrd: '',
                email: ''
            })

        //this.props.history.push('/lectureindex');
    }

    componentDidMount() {
        axios.get('http://localhost:5000/lectures/edit/'+this.props.match.params.id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(response => {
                this.setState({
                    lecId: response.data.lecId,
                    lecName: response.data.lecName,
                    typeOfEmp: response.data.typeOfEmp,
                    lecturedetails: response.data.lecturedetails,
                    faculty: response.data.faculty,
                    passwrd: response.data.passwrd,
                    email: response.data.email,
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
                                    <h3 className="mb-0">Add Users</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* <Form onSubmit={this.onSubmit}> */}
                            <Form onSubmit={this.onSubmit}>
                                <div className="pl-lg-4">
                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Admin/Lecture/Student Id : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Admin/Lecture/Student Id"
                                            type="text"
                                            value={this.state.lecId}
                                            onChange={this.onClickLectureId}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Admin/Lecture/Student Name : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Admin/Lecture/Student Name"
                                            type="text"
                                            value={this.state.lecName}
                                            onChange={this.onClickLectureName}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Type : </label>
                                        <select name="Type" className="form-control" onChange={this.onClickType} value={this.state.typeOfEmp}>
                                            <option value="">Choose option</option>
                                            <option value="lecturer" >lecturer</option>
                                            <option value="student" >student</option>
                                            <option value="admin" >admin</option>
                                        </select>
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Details : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Details"
                                            type="text"
                                            value={this.state.lecturedetails}
                                            onChange={this.onClickLectureDetails}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Faculty : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Faculty"
                                            type="text"
                                            value={this.state.faculty}
                                            onChange={this.onClickFaculty}
                                            required
                                        />
                                    </FormGroup>

                                    {/* <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Password : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Assignment Name"
                                            type="text"
                                            value={this.state.passwrd}
                                            onChange={this.onClickPassword}
                                            required
                                        />
                                    </FormGroup> */}

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Email : </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Enter Email"
                                            type="email"
                                            value={this.state.email}
                                            onChange={this.onClickEmail}
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

export default EditUsers;
