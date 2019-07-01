import React, { Component } from 'react';
import axios from 'axios'

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

class ApprovalList extends React.Component {
    constructor() {
        super()

        this.state = {
            coursed: [],
            name: sessionStorage.getItem("userName"),
            courseno: '',
            coursename: '',
            credits: '',
            coursedetails: '',
            instructor: ''
        }
        this.delete = this.delete.bind(this);
        this.sendx = this.sendx.bind(this);
        this.load = this.load.bind(this);

    }
    load(){
        axios.get('http://localhost:5000/approves/' + this.state.name,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
        .then(response => {
            this.setState({ coursed: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })

    }

    componentDidMount() {
        this.load()

        }
    

    delete(e) {

        alert(e.target.id)
        axios.get('http://localhost:5000/approves/delete/' + e.target.id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(console.log('Deleted'))
            .catch(err => console.log(err))

            this.load()
    }

    sendx(e) {

        let x=(e.target.id)


        axios.get('http://localhost:5000/approves/get/' + e.target.id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

            const obj = {
                courseno:res.data.courseno,
                coursename: res.data.coursename,
                credits: res.data.credits,
                coursedetails: res.data.coursedetails,
                instructor: res.data.instructor
    
            };

            axios.post('http://localhost:5000/courses/add/', obj,{headers: {
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
              }
            })
            .then(res => console.log(res.data));

            axios.get('http://localhost:5000/approves/delete/'+x,{headers: {
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
              }
            })
            .then(console.log('Deleted'))
            .catch(err => console.log(err))

       this.load();

        })

        
        // alert(this.props.obj.courseno);
        //   alert(this.props.obj.coursename);
        //   alert(this.props.obj.credits);
        //   alert(this.props.obj.coursedetails);
        //   alert(this.props.obj.instructor);
        //   alert(this.props.obj._id);

        //console.log("gygy");
        //alert(obj);

        
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
                            <h3 className="mb-0">.......</h3>
                        </CardHeader>

                        <CardBody>
                            <table class="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Course No</th>
                                        <th>Course Name</th>
                                        <th>Credits</th>
                                        <th>Details</th>
                                        <th>Lectures</th>
                                        <th colSpan="2">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.coursed.map((obj, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {obj.courseno}
                                                </td>
                                                <td>
                                                    {obj.coursename}
                                                </td>
                                                <td>
                                                    {obj.credits}
                                                </td>
                                                <td>
                                                    {obj.coursedetails}
                                                </td>
                                                <td>
                                                    {obj.instructor}
                                                </td>
                                                <td>
                                                    <button onClick={this.sendx} id={obj._id} className="btn btn-danger">Accept</button>
                                                </td>
                                                <td>
                                                    <button onClick={this.delete} id={obj._id} className="btn btn-danger">Decline</button>
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

export default ApprovalList;
