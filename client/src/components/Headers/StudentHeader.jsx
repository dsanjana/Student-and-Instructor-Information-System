// import React from "react";
// import axios from 'axios'
// import { withRouter } from 'react-router-dom';
// // reactstrap components
// import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup } from "reactstrap";


// class StudentHeader extends React.Component {
//   constructor() {
//     super()

//     this.state = {
//       courses: [],
//       selectedCourse: '',
//     };
//     this.onChangeComboBoxValue = this.onChangeComboBoxValue.bind(this);
//   }

//   onChangeComboBoxValue(e) {
//     this.setState({
//       selectedCourse: e.target.value
//     }, () => {
//       this.props.history.push('/student/subject/' + this.state.selectedCourse);
//     })
//   }

//   componentDidMount() {
//     //get details of all the courses
//     axios.get('http://localhost:5000/courses').then(
//       courses => {
//         this.setState({
//           courses: courses.data
//         });
//         console.log(courses)
//       }
//     )
//   }

//   render() {
//     return (
//       <>
//         <div
//           className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
//           style={{
//             minHeight: "800px",
//             backgroundImage:
//               "url(" + require("assets/img/theme/sliit-login-page-bg.jpg") + ")",
//             backgroundSize: "cover",
//             backgroundPosition: "center"
//           }}
//         >
//           <span className="mask bg-gradient-default opacity-2" />

//           <Container fluid>
//             <div className="header-body">
//               {/* Card stats */}
//               <Row>
//                 <Col>
//                   {/* <Card className="bg-secondary shadow border-0" style={{ marginLeft: 300, marginRight: 300 }}>
//                     <CardBody className="px-lg-5 py-lg-5"> */}
//                       <Form>
//                         <FormGroup className="form-group col-md-8" style={{ marginLeft: 300, marginRight: 300 }}>
//                           <label className="form-control-label"><font color="white"><b>Select the Course Name</b></font></label><br></br>
//                           <select className="form-control" value={this.state.selectedCourse} onChange={this.onChangeComboBoxValue}>
//                             <option>Select your Course</option>
//                             {this.state.courses.map(course => {
//                               return (
//                                 <option>{course.coursename}</option>
//                               )
//                             }
//                             )}
//                           </select><br />
//                           {/* style={{ marginLeft: 300, marginRight: 300 }} */}
//                         </FormGroup>
//                       </Form>
//                     {/* </CardBody>
//                   </Card> */}
//                 </Col>
//               </Row>
//             </div>
//           </Container>
//         </div>
//       </>
//     );
//   }
// }

// export default withRouter(StudentHeader);
