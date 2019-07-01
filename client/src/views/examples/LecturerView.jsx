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

class LecturerView extends React.Component {
    constructor() {
        super()

        this.state = {
            files: [],
            file: '',
            lecturer: sessionStorage.getItem("userName"),
            info: [],
            filterValue: '',
            filterValue1: '',
            filterinfo: [],
            ainfo: [],
            finfo: []
        }

        this.loadFiles = this.loadFiles.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilter1 = this.handleFilter1.bind(this);
        this.filterclick = this.filterclick.bind(this);
    }

    componentDidMount() {
        this.loadFiles();
    }

    loadFiles() {

        axios.get('http://localhost:5000/courses/getCourses/' + this.state.lecturer,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    info: response.data
                })
                console.log(this.state.info)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    deleteFile(event) {
        event.preventDefault();
        const id = event.target.id;

        axios.delete('http://localhost:5000/api/delete/' + id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(
            res => {

                console.log()
                this.filterclick()
            }
        )
    }

    handleFilter(e) {
        this.setState({
            filterValue: e.target.value
        }, () => {
            console.log(this.state.filterValue)
            console.log(this.state.filterValue1)
            axios.get("http://localhost:5000/assignment/getAssignmentByaName/" + this.state.filterValue,{headers: {
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
              }
            }).then(res => {

                console.log(res.data)
                this.setState({

                    ainfo: res.data
                })
            })
        })
    }

    handleFilter1(e) {
        this.setState({
            filterValue1: e.target.value
        }, () => {
            console.log(this.state.filterValue1)
        })
    }

    filterclick(e) {

        console.log(this.state.filterValue)
        console.log(this.state.filterValue1)

        axios.get('http://localhost:5000/api/lecassview/' + this.state.filterValue1 + '/' + this.state.filterValue,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

            console.log(res)
            this.setState({
                finfo: res.data
            })
            console.log(this.state.finfo)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const { files } = this.state;
        return (
            <>
                <AdminHeader />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Submitted Assignments</h3>
                                </Col>
                                <Col className="text-right" xs="4">
                                    <Button
                                        color="primary"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        size="sm"
                                    >
                                        Settings
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* <Form onSubmit={this.onSubmit}> */}
                            <Form>
                                <div className="pl-lg-4">

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Course Name </label>
                                        <select className="form-control" value={this.state.filterValue} onChange={this.handleFilter}>
                                            <option>Select the Course</option>
                                            {this.state.info.map((obj) => {
                                                return (
                                                    <option>{obj.coursename}</option>
                                                )
                                            })}
                                        </select><br />
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Assignment Name </label>
                                        <select className="form-control" value={this.state.filterValue1} onChange={this.handleFilter1}>
                                            <option>Select the Assignment</option>
                                            {this.state.ainfo.map((obj) => {
                                                return (
                                                    <option>{obj.assignmentName}</option>
                                                )
                                            })}
                                        </select><br />
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <button type="button" onClick={this.filterclick} class="btn btn-primary">Search Assignments</button>
                                    </FormGroup>

                                </div>
                            </Form>
                        </CardBody>
                    </Card>

                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <h3 className="mb-0">Assignments List</h3>
                        </CardHeader>

                        <CardBody>
                            <table class="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th><h5>File</h5></th>
                                        <th><h5>Assignment</h5></th>
                                        <th><h5>Subject</h5></th>
                                        <th><h5>Student</h5></th>
                                        <th><h5>Uploaded Date</h5></th>
                                        <th><h5>Deadline  Date</h5></th>
                                        <th><h5>Deadline Time</h5></th>
                                        <th><h5>Submission Status</h5></th>
                                        <th><h5>Action</h5></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.finfo.map((obj, index) => {
                                        return (
                                            <tr key={index}>
                                                <td><a href={`http://localhost:5000/api/files/${obj.filename}`}>{obj.uname}</a></td>
                                                <td>{obj.name}</td>
                                                <td>{obj.subject}</td>
                                                <td>{obj.student}</td>
                                                <td>{obj.uploadedate}</td>
                                                <td>{obj.deadlinedate}</td>
                                                <td>{obj.deadlinetime}</td>
                                                <td>{obj.late}</td>
                                                <td><button class="btn btn-danger" onClick={this.deleteFile.bind(this)} id={obj.filename}>Delete</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Container>
            </>
        );
    }
}

export default LecturerView;
