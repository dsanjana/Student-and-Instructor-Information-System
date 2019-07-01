import React from "react";

import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import axios from 'axios'
// reactstrap components
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";

//import Header from "components/Headers/Header.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      email:'',
      password: '',
      user:''
    };

    this.OnChangeEmail = this.OnChangeEmail.bind(this)
    this.OnChangePassword = this.OnChangePassword.bind(this)
    this.OnLogin = this.OnLogin.bind(this)
  }
  
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        6000
    );
  }

  OnChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  OnChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  OnLogin(e){
    e.preventDefault()
    const obj = {
      email: this.state.email,
      passwrd: this.state.password
    };

    axios.post('http://localhost:5000/login/loginUser', obj).then(res => {
      if(!res.data.message){
      sessionStorage.setItem("userId", res.data.userId);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userRole", res.data.typeOfEmp)
      sessionStorage.setItem("userName", res.data.name)
      sessionStorage.setItem("idNumber", res.data.idNumber)
      sessionStorage.setItem("email", res.data.email)
      this.props.history.push('/main/index');
      }else{
        throw new Error('I meant to blow up here.');
      }
    })
    .catch(err => {
      this.showNotification("tr")
    })
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">

            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" value={this.state.email} onChange={this.OnChangeEmail}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" value={this.state.password} onChange={this.OnChangePassword} />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  {/*<GridItem xs={12} sm={12} md={4}>*/}
                  <Button fullWidth className="my-4" color="primary" type="button"
                          onClick={this.OnLogin}>
                    Sign in
                  </Button>
                    <Snackbar
                        place="tr"
                        color="info"
                        icon={AddAlert}
                        message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                        open={this.state.tr}
                        closeNotification={() => this.setState({ tr: false })}
                        close
                    />
                  {/*</GridItem>*/}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
