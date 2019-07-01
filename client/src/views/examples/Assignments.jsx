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

class AddAssignment extends React.Component {
  constructor() {
    super()

    this.state = {
      courses: [],
      assignments: [],
      selectedCourse: '',
      selectedCourse1: '',
      assignmentName: '',
      assignmentLink: '',
      dueDate: '',
      currentDate: '',
      status: false,
      updateId: '',
      lecturer: sessionStorage.getItem("userName"),
      oldAssignmentName: ''
    }

    this.onChangeComboBoxValue = this.onChangeComboBoxValue.bind(this);
    this.onChangeComboBoxValue1 = this.onChangeComboBoxValue1.bind(this);
    this.onChangeAssignmentName = this.onChangeAssignmentName.bind(this);
    this.onChangeAssignmentLink = this.onChangeAssignmentLink.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onChangeAssignmentList = this.onChangeAssignmentList.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeComboBoxValue(e) {
    this.setState({
      selectedCourse: e.target.value
    })
  }

  onChangeComboBoxValue1(e) {
    this.setState({
      selectedCourse1: e.target.value
    })
  }

  onChangeAssignmentName(e) {
    this.setState({
      assignmentName: e.target.value
    });
  }

  onChangeDueDate(e) {
    this.setState({
      dueDate: e.target.value
    });
  }

  onChangeAssignmentLink(e) {
    this.setState({
      assignmentLink: e.target.value
    });
  }

  onLoad(e) {

  }

  onDelete(e) {
    alert(e.target.id)
    //get assignment by id nad delete
    axios.get('http://localhost:5000/assignment/deleteAssignment/' + e.target.id,{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
  })

    this.onChangeAssignmentList()
  }

  onEdit(e) {
    this.setState({
      status: true,
      updateId: e.target.id
    })

    //get assignment by id
    axios.get('http://localhost:5000/assignment/getAssignmentById/' + e.target.id,{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
  }).then(
      assignment => {
        this.setState({
          selectedCourse: assignment.data.courseName,
          assignmentName: assignment.data.assignmentName,
          assignmentLink: assignment.data.assignmentLink,
          dueDate: assignment.data.dueDate,

          oldAssignmentName: assignment.data.assignmentName
        });
      }
    )
  }

  onUpdate(e) {

    let tempDate = new Date();
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth();
    let day = tempDate.getDate();

    if (month < 10) {

      month = '0' + month

    }

    if (day < 10) {
      day = '0' + day
    }

    let curdate = year + '/' + month + '/' + day
    let cdate = year + month + day

    let ldd = (this.state.dueDate.replace("-", "").replace("-", ""))

    if (cdate > ldd) {
      alert("due date is not valid")
    }
    else {

      axios.get('http://localhost:5000/assignment/getAssignmentBycName_aName/' + this.state.selectedCourse + '/' + this.state.assignmentName,{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
        .then(res => {
          console.log(res.data)

          if (res.data == null) {

            var obj1 = {
              courseName: this.state.selectedCourse,
              assignmentName: this.state.assignmentName,
              assignmentLink: this.state.assignmentLink,
              dueDate: this.state.dueDate
            };

            //get assignment by id and update
            axios.post('http://localhost:5000/assignment/getAssignment/' + this.state.updateId, obj1,{headers: {
              "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
          }).then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            })

             axios.post('http://localhost:5000/api/updateAllAssignments/' + this.state.oldAssignmentName + '/' + this.state.assignmentName,{headers: {
              "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
          })
               .then(res => console.log(res.data));

            this.setState({
              courseName: '',
              assignmentName: '',
              assignmentLink: '',
              dueDate: ''
            });
          }
          else {
            confirmAlert({
              title: 'Assignment Allready Uploaded!',
              buttons: [
                {
                  label: 'Ok',            
                }
              ]
            })
          }
        });
    }

    //this.onChangeAssignmentList()
  }

  onSubmit(e) {
    e.preventDefault();

    let tempDate = new Date();
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth();
    let day = tempDate.getDate();

    if (month < 10) {
      month = '0' + month
    }

    if (day < 10) {
      day = '0' + day
    }

    let curdate = year + '/' + month + '/' + day
    let cdate = year + month + day

    let ldd = (this.state.dueDate.replace("-", "").replace("-", ""))

    if (cdate > ldd) {
      alert("due date is not valid")
    }
    else {

      axios.get('http://localhost:5000/assignment/getAssignmentBycName_aName/' + this.state.selectedCourse + '/' + this.state.assignmentName,{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
        .then(res => {
          console.log(res.data)

          if (res.data == null) {

            const obj = {
              courseName: this.state.selectedCourse,
              assignmentName: this.state.assignmentName,
              assignmentLink: this.state.assignmentLink,
              uploadedDate: this.state.currentDate,
              dueDate: this.state.dueDate
            };
            axios.post('http://localhost:5000/assignment/addAssignment', obj,{headers: {
              "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
          }).then(res => console.log(res.data));

            this.setState({
              courseName: '',
              assignmentName: '',
              assignmentLink: '',
              dueDate: ''
            });
          }
          else {
            confirmAlert({
              title: 'Assignment Allready Uploaded!',
              buttons: [
                {
                  label: 'Ok',            
                }
              ]
            })
          }

        });
    }
  }

  onChangeAssignmentList(e) {
    //get assignment list by course name
    axios.get('http://localhost:5000/assignment/getAssignmentByName/' + this.state.selectedCourse1,{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
  }).then(

      assignments => {


        this.setState({
          assignments: assignments.data
        });
        console.log(this.state.assignments)
      }
    )
  }

  componentDidMount() {
    //get details of all the courses
    axios.get('http://localhost:5000/courses/getCourses/' + this.state.lecturer,{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
  }).then(
      courses => {
        this.setState({
          courses: courses.data
        });
        console.log(courses)
      }
    )

    const tempDate = new Date();
    const date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    this.state.currentDate = date;
    console.log(this.state.currentDate)
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
                  <h3 className="mb-0">Assignments Details</h3>
                </Col>
                <Col className="text-right" xs="4">
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {/* <Form onSubmit={this.onSubmit}> */}
              <Form>
                <div className="pl-lg-4">
                  <FormGroup className="form-group col-md-8">
                    <label className="form-control-label"> Course Name </label>
                    <select className="form-control" value={this.state.selectedCourse} onChange={this.onChangeComboBoxValue}>
                      <option>Select your Course</option>
                      {this.state.courses.map(course => {
                        return (
                          <option>{course.coursename}</option>
                        )
                      }
                      )}
                    </select><br />
                  </FormGroup>

                  <FormGroup className="form-group col-md-8">
                    <label className="form-control-label"> Assignment Name </label>
                    <Input
                      className="form-control-alternative"
                      placeholder="Enter Assignment Name"
                      type="text"
                      value={this.state.assignmentName} onChange={this.onChangeAssignmentName}
                    />
                  </FormGroup>

                  <FormGroup className="form-group col-md-8">
                    <label className="form-control-label"> Assignment Submission Link </label>
                    <Input
                      className="form-control-alternative"
                      placeholder="Enter Assignment Link"
                      type="text"
                      value={this.state.assignmentLink} onChange={this.onChangeAssignmentLink}
                    />
                  </FormGroup>

                  <FormGroup className="form-group col-md-8">
                    <label className="form-control-label"> Due Date </label>
                    <Input
                      className="form-control-alternative"
                      placeholder="MM/DD/YYYY"
                      type="date"
                      value={this.state.dueDate} onChange={this.onChangeDueDate}
                    />
                  </FormGroup>

                  <FormGroup className="form-group col-md-8">
                    {this.state.status ? (
                      <button type="button" onClick={this.onUpdate} class="btn btn-primary">Update Details</button>
                      // <input type="submit" value="Save Details1111" className="btn btn-primary" />
                    ) : (
                        <button type="button" onClick={this.onSubmit} class="btn btn-primary">Save Details</button>
                        // <input type="submit" value="Save Details" className="btn btn-primary" />
                      )}
                  </FormGroup>

                </div>
              </Form>
            </CardBody>
          </Card>

          {/* table to view all the assignments */}
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <h3 className="mb-0">Assignments List</h3>
            </CardHeader>

            <div className="pl-lg-4">
              <FormGroup className="form-group col-md-4">
                <label className="form-control-label"> Course Name </label>
                <select className="form-control" value={this.state.selectedCourse1} onChange={this.onChangeComboBoxValue1}>
                  <option>Select your Course</option>
                  {this.state.courses.map(course => {
                    return (
                      <option>{course.coursename}</option>
                    )
                  }
                  )}
                </select><br />
                <button type="button" onClick={this.onChangeAssignmentList} class="btn btn-primary">Get Assignment List</button><br />
              </FormGroup>
            </div>
            <CardBody>

              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th><h5>Course Name</h5></th>
                    <th><h5>Assignment Name</h5></th>
                    <th><h5>Due Date</h5></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.assignments.map(assignment => {
                    return (
                      <tr>
                        <td>{assignment.courseName}</td>
                        <td>{assignment.assignmentName}</td>
                        <td>{assignment.dueDate}</td>
                        <td>
                          <div align="right">
                            <button type="button" id={assignment._id} class="btn btn-primary" style={{ marginRight: 5 }} onClick={this.onEdit}>Edit</button>
                            <button type="button" id={assignment._id} class="btn btn-danger" style={{ marginRight: 5 }} onClick={this.onDelete}>Delete</button>
                          </div>
                        </td>
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

export default AddAssignment;
