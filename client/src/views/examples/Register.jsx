import React from "react";
import { GoogleLogin } from 'react-google-login';

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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

const responseGoogle = (response) => {
  console.log(response);
}

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
        lecId: '',
        lecName: '',
        typeOfEmp: 'student',
        passwrd: '',
        email: ''
    }

    this.onClickLectureId = this.onClickLectureId.bind(this);
    this.onClickLectureName = this.onClickLectureName.bind(this);
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
  alert(this.state.email)
  const obj = {
    lecId: this.state.lecId,
    lecName: this.state.lecName,
    typeOfEmp: this.state.typeOfEmp,
    passwrd: this.state.passwrd,
    email: this.state.email

};

const obj1 = {
    lecId: this.state.lecId,
    passwrd: this.state.passwrd,
    email: this.state.email
}

//add to the database
axios.post('http://localhost:5000/lectures/add', obj,{headers: {
  "Authorization" : "Bearer "+sessionStorage.getItem("token")
}
})
    .then(res => console.log(res.data));

//send an email
axios.post('http://localhost:5000/lectures/send', obj1,{headers: {
  "Authorization" : "Bearer "+sessionStorage.getItem("token")
}
})
    .then(res => {


    })
    .catch(function (error) {

        console.log(error)
    })

this.setState({
    lecId: '',
    lecName: '',
    passwrd: '',
    email: ''
})

  this.props.history.push('/auth/login')
}

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>

                <GoogleLogin
                  clientId="924221512472-r2bjerq59bbm37dln6hi409t7fsscfgo.apps.googleusercontent.com"
                  buttonText="Login"
                  render={renderProps => (
                    <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={renderProps.onClick} disabled={renderProps.disabled}
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/google.svg")}
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
    )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />

                
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <Form>
              <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" onChange={this.onClickEmail} value={this.state.email}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" onChange={this.onClickLectureName} value={this.state.lecName} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="ID Number" type="text" onChange={this.onClickLectureId} value={this.state.lecId}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" onChange={this.onClickPassword} value={this.state.passwrd}/>
                  </InputGroup>
                </FormGroup>
                <div className="text-muted font-italic">
                  {/* <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small> */}
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={this.onSubmit}>
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
