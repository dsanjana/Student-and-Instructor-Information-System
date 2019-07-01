// import React from "react";
// import axios from 'axios'
// import { withRouter } from 'react-router-dom';
// // reactstrap components
// import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup } from "reactstrap";


// class LecturerHeader extends React.Component {
//     constructor() {
//         super()

//         this.state = {
//         };

//         this.routeChange=this.routeChange.bind(this)
//         this.routeChange1=this.routeChange1.bind(this)
//     }

//      routeChange(e) {
//          this.props.history.push('/lecturer/assignments')
//      }

//      routeChange1(e) {
//          this.props.history.push('/lecturer/lecturerView');
//      }
//     /*onChangeComboBoxValue(e) {
//       this.setState({
//         selectedCourse: e.target.value
//       }, () => {
//         this.props.history.push('/student/subject/' + this.state.selectedCourse);
//       })
//     }
  
//     componentDidMount() {
//       //get details of all the courses
//       axios.get('http://localhost:5000/course/getCourses').then(
//         courses => {
//           this.setState({
//             courses: courses.data
//           });
//           console.log(courses)
//         }
//       )
//     }*/

//     render() {
//         return (
//             <>
//                 <div
//                     className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
//                     style={{
//                         minHeight: "800px",
//                         backgroundImage:
//                             "url(" + require("assets/img/theme/sliit-login-page-bg.jpg") + ")",
//                         backgroundSize: "cover",
//                         backgroundPosition: "center"
//                     }}
//                 >
//                     <span className="mask bg-gradient-default opacity-2" />

//                     <Container fluid>
//                         <div className="header-body">
//                             {/* Card stats */}
//                             <Row>
//                                 <Col lg="6" xl="3" >

//                                     <button 
//                                     type="button" class="btn btn-link"
//                                         style={{
//                                             minHeight: "268px",
//                                             minWidth: "270px",
//                                             backgroundImage:
//                                                 "url(" + require("assets/img/theme/assignmentManager.png") + ")",
//                                             backgroundSize: "cover",
//                                             backgroundPosition: "center"
//                                         }}
//                                         onClick={this.routeChange}
//                                     ></button>
//                                     <label style={{ marginLeft: 45}} ><font color="white"><b>Manage Assignments</b></font></label>

//                                 </Col>
//                                 <Col lg="6" xl="3" >

//                                     <button type="button" class="btn btn-link"
//                                         style={{
//                                             minHeight: "268px",
//                                             minWidth: "270px",
//                                             backgroundImage:
//                                                 "url(" + require("assets/img/theme/uploadedAssignments.png") + ")",
//                                             backgroundSize: "cover",
//                                             backgroundPosition: "center"
//                                         }}
//                                         onClick={this.routeChange1}
//                                     ></button>
//                                     <label style={{ marginLeft: 45}} ><font color="white"><b>Uploaded Assignments</b></font></label>
//                                 </Col>

//                                 {/* <Col lg="6" xl="3" >

//                                     <button type="button" class="btn btn-link"
//                                         style={{
//                                             minHeight: "268px",
//                                             minWidth: "270px",
//                                             backgroundImage:
//                                                 "url(" + require("assets/img/theme/addMarks.png") + ")",
//                                             backgroundSize: "cover",
//                                             backgroundPosition: "center"
//                                         }}
//                                         onClick={this.routeChange}
//                                     ></button>
//                                     <label style={{ marginLeft: 45}} className="form-control-label"><font color="white"><b>Select the Course Name</b></font></label>
//                                 </Col> */}
//                             </Row>
//                         </div>
//                     </Container>
//                 </div>
//             </>
//         );
//     }
// }

// export default withRouter(LecturerHeader);
