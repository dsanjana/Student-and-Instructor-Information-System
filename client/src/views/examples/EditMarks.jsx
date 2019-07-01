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

class MarksEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject1: "",
            assignment1: '',
            studen1t: "",
            mark1: ''
        }

        this.updateClick = this.updateClick.bind(this)
        this.changeMark = this.changeMark.bind(this)
        //this.added = this.added.bind(this);
    }

    componentDidMount() {

        axios.get("http://localhost:5000/marks/findmarks/" + this.props.match.params.id,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {

            this.setState({
                subject1: res.data.subject,
                assignment1: res.data.name,
                student1: res.data.student,
                mark1: res.data.mark
            })
        })
    }

    updateClick(e) {

        e.preventDefault()
        axios.post('http://localhost:5000/marks/updatemarks/' + this.props.match.params.id + '/' + this.state.mark1,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })

        this.props.history.push('/admin/addMarks')
    }

    changeMark(e) {

        this.setState({
            mark1: e.target.value
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
                                    <h3 className="mb-0">Add Marks</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* <Form onSubmit={this.onSubmit}> */}
                            <Form>
                                <div className="pl-lg-4">

                                    <FormGroup className="form-group col-md-8">
                                        <div>
                                            <label className="form-control-label"> Assignment Name :</label>
                                            <p>{this.state.assignment1}</p>
                                            <label className="form-control-label"> Student Name :</label>
                                            <p>{this.state.student1}</p>
                                            <Input type='text' className="form-control-alternative" onChange={this.changeMark} value={this.state.mark1}></Input><br></br>
                                            <button class="btn btn-primary" onClick={this.updateClick}>Edit and Save</button>
                                        </div>
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

export default MarksEdit;
