import React, { Component } from 'react';
import axios from 'axios'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { Link } from "react-router-dom";
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
import StudentHeader from "components/Headers/StudentHeader.jsx";
import { throws } from 'assert';

class Subjects extends React.Component {
    constructor() {
        super()

        this.state = {
            assignments: [],
            assignments1: [],
            assignments2: '',
            selectedassignment: '',
            studentID: sessionStorage.getItem("idNumber"),
            status1:"yes",
            checkUploads:[],
            assName: '',
            marks: [],
            showMarks: false,
            marks1: [],
            info:[],
            notifyAssignment:false
            
        }
        this.cilckLink = this.cilckLink.bind(this)

    }

    // cilckLink() {
    //     //alert(e.target.id)
    //     axios.get('http://localhost:5000/api/checkUploads/xfgfg /'+ this.props.match.params.cName + '/' + this.state.studentID).then(res => {
    //         //console.log(res.data);
    //        // console.log(this.state.status1)
    //         if(res.data==''){
               
    //     this.setState({

    //         status1:"no"
    //     })
    //     alert(this.state.status1)
    //         }
    //     })
    // }

    cilckLink = (e) => {

        this.setState({
            assName: e.target.id
        })

        axios.get('http://localhost:5000/api/checkUploads/'+e.target.id+ '/'+ this.props.match.params.cName + '/' + this.state.studentID,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

        if(res.data!=''){
           
            confirmAlert({
                title: 'You have allready Uploaded the Assignment',
                message: 'Are you want to Edit.',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => this.props.history.push('/student/studentView/'+ this.props.match.params.cName+'/'+this.state.assName)
                  },
                  {
                    label: 'No',
                    onClick: () => this.props.history.push('/student/subject/'+ this.props.match.params.cName)
                  }
                ]
              })
        }
        else{
            axios.get('http://localhost:5000/assignment/getAssignmentBycName_aName/' + this.props.match.params.cName+'/'+this.state.assName,{headers: {
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
              }
            }).then(res => {
            console.log(res.data);
            this.setState({
                assignments2: res.data.dueDate
            })
            console.log(this.state.assignments2);

            this.props.history.push('/student/uploadAssignments/'+ this.props.match.params.cName+'/'+this.state.assName+'/'+this.state.assignments2,{headers: {
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
              }
            })
        })
        }


    
        })        
      };
    

    componentDidMount() {

        axios.get('http://localhost:5000/login/getLoginDetails/'+sessionStorage.getItem("email"),{headers: {
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

       if(sessionStorage.getItem("userRole")=="student"){

        axios.get('http://localhost:5000/marks/get/'+sessionStorage.getItem("idNumber"),{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    marks1: response.data
                },()=>{
                  this.state.marks1.map((obj)=>{
                    console.log(parseInt(obj._id.toString().substring(0,8),16).toString())
                    if(this.state.info.time.substring(0,8)< parseInt(obj._id.toString().substring(0,8),16).toString()){
                      this.setState({
                        notifyAssignment:true
                      })
                    }
                  })
                })
               
                console.log(this.state.assignments)
            },()=>{
                //alert(this.state.notifyAssignment)

                if(this.state.notifyAssignment == true){
                    confirmAlert({
                        title: 'New Marks were Added!',
                        buttons: [
                          {
                            label: 'Ok',
                          },

                        ]
                      })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
       }

        axios.get('http://localhost:5000/assignment/getAssignmentByName/' + this.props.match.params.cName,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {
            console.log(res.data);
            this.setState({
                assignments: res.data
            })
            console.log(this.state.assignments);
        })

        axios.get('http://localhost:5000/marks/getMarks/' + this.props.match.params.cName+'/'+sessionStorage.getItem("idNumber"),{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {
            console.log(res.data);
            this.setState({
                marks: res.data
            })
            console.log(this.state.marks);
            if(this.state.marks[0]!=null){
            this.setState({
                showMarks: true
            })
        }
            //alert(this.state.showMarks)
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
                                    <h3 className="mb-0">Module Materials</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* <Form onSubmit={this.onSubmit}> */}
                            <Form>
                                <div className="pl-lg-4">
                                    <FormGroup className="form-group col-md-8">
                                        <div>
                                        <h4 className="mb-0">Assignment Submission Links</h4><br></br>
                                            {this.state.assignments.map(cassignment => {
                                                return (
                                                    <div>
                                                        {/* <p><a href={`/admin/uploadAssignments/${cassignment.courseName}/${cassignment.assignmentName}/
                                                        ${cassignment.dueDate}`}>{cassignment.assignmentName}</a></p><br /> */}
                                                         <Link to onClick={this.cilckLink} id={cassignment.assignmentName}>{cassignment.assignmentName}</Link>
                                                        <br></br>
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <div>
                                        <h4 className="mb-0">Lecture Slides</h4><br></br>
                                        </div>
                                    </FormGroup>

                                    <FormGroup className="form-group col-md-8">
                                        <div>
                                        <h4 className="mb-0">Assignment GuideLines</h4><br></br>
                                        </div>
                                    </FormGroup>

                                </div>
                            </Form>
                        </CardBody>
                    </Card>

                    {this.state.showMarks ? (
                        <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Marks</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <table class="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th><h5>Student ID</h5></th>
                                        <th><h5>Assignment Name</h5></th>
                                        <th><h5>Marks</h5></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.marks.map((obj, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{sessionStorage.getItem("idNumber")}</td>
                                                <td>{obj.name}</td>
                                                <td>{obj.mark}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>
                        </CardBody>
                    </Card>
                    ): (<div></div>)}
                    
                </Container>
            </>
        )

    }
}
export default Subjects;
