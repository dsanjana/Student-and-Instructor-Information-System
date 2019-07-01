import React, { Component } from 'react';

import axios from 'axios'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

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


class addmarks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            file: '',
            lecturer: sessionStorage.getItem("userName"),
            info: [],
            filterValue: '',
            filterValue1: '',
            filterinfo: [],
            ainfo: [],
            finfo: [],
            marks: [],
            getmarks: [],
            mark: '',
            x: '',
            addedmarks: '',
            filterValue2: '',
            filterValue3: '',
            filterValue4: '',
            minfo: [],
            stuinfo: []



        }

        this.loadFiles = this.loadFiles.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilter1 = this.handleFilter1.bind(this);
        this.filterclick = this.filterclick.bind(this);
        this.handlemarks = this.handlemarks.bind(this);
        this.viewmarks = this.viewmarks.bind(this);
        this.addmark = this.addmark.bind(this);
        this.handleFilter2 = this.handleFilter2.bind(this);
        this.handleFilter3 = this.handleFilter3.bind(this);
        this.handlestu = this.handlestu.bind(this);
        this.deletemark = this.deletemark.bind(this);
        this.editmark = this.editmark.bind(this);

        //this.added = this.added.bind(this);

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

        axios.get('http://localhost:5000/api/lecassview/' + e.target.value + '/' + this.state.filterValue,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

            console.log(res.data)
            this.setState({

                stuinfo: res.data
            })

            console.log(this.state.finfo)

        }).catch(err => {

            console.log(err)
        })

    }

    handleFilter3(e) {



        this.setState({
            filterValue3: e.target.value
        }, () => {
            console.log(this.state.filterValue3)

        })


    }


    handleFilter2(e) {

        this.setState({
            filterValue2: e.target.value
        }, () => {

            axios.get("http://localhost:5000/api/assview/" + this.state.filterValue2,{headers: {
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
              }
            }).then(res => {

                console.log(res.data)
                this.setState({

                    minfo: res.data
                })
            })

        })

    }

    filterclick(e) {

        e.preventDefault()

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

    addmark(e, index, id) {
        e.preventDefault()
        const value = document.querySelector("input[id='" + index + "']").value

        axios.get("http://localhost:5000/marks/get/" + this.state.filterValue + '/' + this.state.filterValue1 + '/' + id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

            console.log(res)

            if (res.data == null) {

                const obj = {

                    mark: value,
                    subject: this.state.filterValue,
                    name: this.state.filterValue1,
                    student: id
                }

                axios.post("http://localhost:5000/marks/add", obj,{headers: {
                    "Authorization" : "Bearer "+sessionStorage.getItem("token")
                  }
                }).then(res => {

                    console.log(res)
                }).catch(err => {

                    console.log(err)
                })
            }
            else{
                confirmAlert({
                    title: 'Marks Allready Added!',
                    buttons: [
                      {
                        label: 'Ok',            
                      }
                    ]
                  })
            }
        }).catch(err => {

            console.log(err)
        })

    }


    handlemarks(e) {

        this.setState({


            mark: e.target.value
        })

    }

    viewmarks(e) {
        e.preventDefault()


        axios.get('http://localhost:5000/marks/get/' + this.state.filterValue2 + '/' + this.state.filterValue3,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

            console.log(res.data)
            this.setState({

                marks: res.data
            })

            console.log(this.state.marks)

        }).catch(err => {

            console.log(err)
        })
    }

    handlestu() {

        axios.get('http://localhost:5000/api/lecassview/' + this.state.filterValue1 + '/' + this.state.filterValue,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

            console.log(res)
            this.setState({

                stuinfo: res.data
            })

            console.log(this.state.finfo)

        }).catch(err => {

            console.log(err)
        })

    }
    deletemark(e) {

        alert(e.target.id)

        axios.get('http://localhost:5000/marks/delete/' + e.target.id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

        }).catch(err => {

            console.log(err)
        })

        axios.get('http://localhost:5000/marks/get/' + this.state.filterValue2 + '/' + this.state.filterValue3,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

            console.log(res)
            this.setState({

                marks: res.data
            })

            console.log(this.state.marks)

        }).catch(err => {

            console.log(err)
        })

    }

    editmark(e) {
        this.props.history.push('/admin/editMarks/' + e.target.id)
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
                                    <h3 className="mb-0">Add Marks</h3>
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
                                        <button class="btn btn-primary" onClick={this.filterclick}>Search Assignment</button><br></br>
                                    </FormGroup>

                                </div>
                            </Form>
                        </CardBody>
                    </Card>

                    {/* table to view all the assignments */}
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <h3 className="mb-0">Marks List</h3>
                        </CardHeader>
                        <CardBody>

                            <table class="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th><h5>IT Number</h5></th>
                                        <th><h5>Marks</h5></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.finfo.map((obj, index) => {
                                        
                                        return (

                                            <tr key={index}>
                                                <td>{obj.student}</td>
                                                <td><Input id={index} className="form-control-alternative" type='number'></Input></td>
                                                <td><button id={index} class="btn btn-success" onClick={e => this.addmark(e, index, obj.student)}>Add</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>

                        </CardBody>
                    </Card>

                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Assignments Details</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* <Form onSubmit={this.onSubmit}> */}
                            <Form>
                                <div className="pl-lg-4">

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label"> Course Name </label>
                                        <select className="form-control" value={this.state.filterValue2} onChange={this.handleFilter2}>
                                            <option>Select the Course</option>


                                            {this.state.info.map((obj) => {
                                                return (
                                                    <option>{obj.coursename}</option>
                                                )
                                            })}
                                        </select><br />

                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <label className="form-control-label">Assignment Name </label>
                                        <select className="form-control" value={this.state.filterValue3} onChange={this.handleFilter3}>
                                            <option>Select the Assignment</option>


                                            {this.state.minfo.map((obj) => {
                                                return (
                                                    <option>{obj.name}</option>
                                                )
                                            })}
                                        </select><br />

                                        <td><button class="btn btn-primary" onClick={this.viewmarks} >Search</button></td><br></br>
                                    </FormGroup>


                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    {/* table to view all the assignments */}
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <h3 className="mb-0">Edit Marks</h3>
                        </CardHeader>
                        <CardBody>

                            <table class="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th><h5>Student Name</h5></th>
                                        <th><h5>Marks</h5></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.marks.map((obj, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{obj.student}</td>
                                                <td>{obj.mark}</td>
                                                <td><button onClick={this.editmark} id={obj._id} class="btn btn-primary">Edit</button></td>
                                                <td><button onClick={this.deletemark} id={obj._id} class="btn btn-danger">Delete</button></td>
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

export default addmarks;
