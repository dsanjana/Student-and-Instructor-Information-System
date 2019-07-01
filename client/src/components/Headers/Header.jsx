import React from "react";
import { withRouter } from 'react-router-dom';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import RBCarousel from "react-bootstrap-carousel";

// import slide_1 from "../../assets/img/brand/slide1.jpg";
// import slide_2 from "../../assets/img/brand/slide2.jpg";
// import slide_3 from "../../assets/img/brand/slide3.jpg";
// import slide_4 from "../../assets/img/brand/slide4.jpg";
// import slide_5 from "../../assets/img/brand/slide5.jpg";


class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      autoplay: true,
      admin: true,
      student: true,
      lecture: true
    };

    this.routeChange = this.routeChange.bind(this);
    this.routeChangeAdmin = this.routeChangeAdmin.bind(this)
    this.routeChangeStudent = this.routeChangeStudent.bind(this)
    this.routeChangeLecture = this.routeChangeLecture.bind(this)
  }
  onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  visiableOnSelect = active => {
    console.log(`visiable onSelect active=${active}`);
  };
  slideNext = () => {
    this.slider.slideNext();
  };
  slidePrev = () => {
    this.slider.slidePrev();
  };
  goToSlide = () => {
    this.slider.goToSlide(4);
  };
  autoplay = () => {
    this.setState({ autoplay: !this.state.autoplay });
  };
  _changeIcon = () => {
    let { leftIcon, rightIcon } = this.state;
    leftIcon = leftIcon ? undefined : <span className="fa fa-glass" />;
    rightIcon = rightIcon ? undefined : <span className="fa fa-music" />;
    this.setState({ leftIcon, rightIcon });
  };

  routeChange() {
    this.props.history.push('/admin/user-profile');
  }

  routeChangeAdmin() {
    this.props.history.push('/dashboard/adminDashboard');
  }

  routeChangeStudent() {
    this.props.history.push('/dashboard/studentDashboard');
  }

  routeChangeLecture() {
    this.props.history.push('/dashboard/lecturerDashboard');
  }

  componentDidMount(){

    if(sessionStorage.getItem("userRole") == "admin"){
      this.setState({
        admin: false
      })
    }
    else if(sessionStorage.getItem("userRole") == "student"){
      this.setState({
        student: false
      })
    }
    else if(sessionStorage.getItem("userRole") == "lecturer"){
      this.setState({
        lecture: false
      })
    }
  }

  render() {
    let { leftIcon, rightIcon } = this.state;
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "800px",
            backgroundImage:
              "url(" + require("assets/img/theme/sliit-login-page-bg.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <span className="mask bg-gradient-default opacity-2" />

          <Container fluid>
            <Row>
              <Col>
                <Card className="bg-secondary shadow">
                  <Container fluid>
                    <Row>
                      <Col span={12}>
                        <RBCarousel
                          animation={true}
                          autoplay={this.state.autoplay}
                          slideshowSpeed={5000}
                          leftIcon={leftIcon}
                          rightIcon={rightIcon}
                          onSelect={this.onSelect}
                          ref={r => (this.slider = r)}
                          version={4}
                        >
                          <div style={{ height: 500 }}>
                            <img style={{ width: "100%", height: "100%" }} src={"//courseweb.sliit.lk/pluginfile.php/1/theme_lambda/slide2image/1554885363/Image1.jpg"} alt="..." />
                          </div>
                          <div style={{ height: 500 }}>
                            <img style={{ width: "100%", height: "100%" }} src={"//courseweb.sliit.lk/pluginfile.php/1/theme_lambda/slide3image/1554885363/Image2.jpg"} alt="..." />
                          </div>
                          <div style={{ height: 500 }}>
                            <img style={{ width: "100%", height: "100%" }} src={"//courseweb.sliit.lk/pluginfile.php/1/theme_lambda/slide4image/1554885363/Image3.jpg"} alt="..." />
                          </div>
                          <div style={{ height: 500 }}>
                            <img style={{ width: "100%", height: "100%" }} src={"//courseweb.sliit.lk/pluginfile.php/1/theme_lambda/slide5image/1554885363/Image4.jpg"} alt="..." />
                          </div>
                        </RBCarousel>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </Col>
            </Row>
            <div className="header-body">
              {/* Card stats */}
              <br></br>
              <br></br>
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-muted mb-0"
                      >
                        Login as {sessionStorage.getItem("userRole")}
                          </CardTitle><br></br>

                      <button type="button" class="btn btn-link"
                        style={{
                          minHeight: "228px",
                          minWidth: "230px",
                          backgroundImage:
                            "url(" + require("assets/img/theme/use.jpeg") + ")",
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                        onClick={this.routeChange}
                      ></button>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-muted mb-0"
                      >
                        Admin Dashboard
                          </CardTitle><br></br>

                      <button type="button" class="btn btn-link"
                        style={{
                          minHeight: "228px",
                          minWidth: "230px",
                          backgroundImage:
                            "url(" + require("assets/img/theme/teacher_837826.png") + ")",
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                        onClick={this.routeChangeAdmin}
                        disabled= {this.state.admin}
                      ></button>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-muted mb-0"
                      >
                        Lecture Dashboard
                          </CardTitle><br></br>

                      <button type="button" class="btn btn-link"
                        style={{
                          minHeight: "228px",
                          minWidth: "230px",
                          backgroundImage:
                            "url(" + require("assets/img/theme/lec.png") + ")",
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                        onClick={this.routeChangeLecture}
                        disabled= {this.state.lecture}
                      ></button>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-muted mb-0"
                      >
                        Student Dashboard
                          </CardTitle><br></br>

                      <button type="button" class="btn btn-link"
                        style={{
                          minHeight: "228px",
                          minWidth: "230px",
                          backgroundImage:
                            "url(" + require("assets/img/theme/stu.jpg") + ")",
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                        onClick={this.routeChangeStudent}
                        disabled= {this.state.student}
                      ></button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(Header);
