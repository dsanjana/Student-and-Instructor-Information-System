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

class ViewUsers extends React.Component {
    constructor() {
        super()

        this.state = {
            lectured: []
        }
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/lectures',{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(response => {
                this.setState({ lectured: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    delete(e) {
        axios.get('http://localhost:5000/lectures/delete/'+e.target.id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
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
                            <h3 className="mb-0">Current User List</h3>
                        </CardHeader>

                        <CardBody>
                            <table class="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Lecture/Student Id</th>
                                        <th>Lecture/Student Name</th>
                                        <th>Type</th>
                                        <th>Details</th>
                                        <th>Faculty</th>
                                        <th>Email</th>
                                        <th colSpan="2">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.lectured.map((obj, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {obj.lecId}
                                                </td>
                                                <td>
                                                    {obj.lecName}
                                                </td>
                                                <td>
                                                    {obj.typeOfEmp}
                                                </td>
                                                <td>
                                                    {obj.lecturedetails}
                                                </td>
                                                <td>
                                                    {obj.faculty}
                                                </td>
                                                <td>
                                                    { obj.email}
                                                </td>
                                                <td>
                                                    <Link to={"/admin/editUser/" + obj._id} className="btn btn-primary">Edit</Link>
                                                </td>
                                                <td>
                                                    <button onClick={this.delete} id={obj._id}className="btn btn-danger">Delete</button>
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

export default ViewUsers;
