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

class StudentView extends React.Component {
    constructor() {
        super()

        this.state = {
            files: [],
            file: '',
            student1: sessionStorage.getItem("idNumber"),
            info: [],
            aname:''
        }
        this.loadFiles = this.loadFiles.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/stuview/' + this.state.student1+'/'+this.props.match.params.cName+'/'+this.props.match.params.aName,{headers: {
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

    loadFiles() {

    }

    deleteFile(event) {

        event.preventDefault();
        const id = event.target.id;

        fetch('/api/files/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(response => {
                console.log(response);
                if (response.success) this.loadFiles()
                
            })

        axios.delete('http://localhost:5000/api/delete/' + id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(
            res => {

                console.log()
                event.preventDefault();
            }
        )
        this.props.history.push('/student/uploadAssignment/'+this.props.match.params.cName+'/'+this.props.match.params.aName)
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
                                        <th><h5>File</h5></th>
                                        <th><h5>Assignment</h5></th>
                                        <th><h5>Subject</h5></th>
                                        <th><h5>Uploaded Date</h5></th>
                                        <th><h5>Deadline  Date</h5></th>
                                        <th><h5>Deadline Time</h5></th>
                                        <th><h5>Submission Status</h5></th>

                                        <th><h5>Action</h5></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.info.map((obj, index) => {

                                        return (
                                            <tr key={index}>
                                                <td><a href={`http://localhost:5000/api/files/${obj.filename}`}>{obj.uname}</a></td>
                                                <td>{obj.name}</td>
                                                <td>{obj.subject}</td>
                                                <td>{obj.uploadedate}</td>
                                                <td>{obj.deadlinedate}</td>
                                                <td>{obj.deadlinetime}</td>
                                                <td>{obj.late}</td>

                                                <Link class="btn btn-danger" to  onClick={this.deleteFile.bind(this)} id={obj.filename}>Edit</Link>
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

export default StudentView;
