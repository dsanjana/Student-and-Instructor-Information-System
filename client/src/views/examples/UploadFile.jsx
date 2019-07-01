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

class UploadFile extends React.Component {
  constructor() {
    super()

    this.state = {
      files: [],
      file: '',
      deadlinedate: "",
      deadlinetime: '23:20:11',
      name: '',
      subject: '',
      lecturer: 'l11',
      student: sessionStorage.getItem("idNumber"),
      filename: '',
      uploadeddate: '',
      uploadtime: '',
      late: '',
      info: [],
      sizealert: '',
      namealert: '',
      ofilename: '',
      dueDate: ''
    }

  }

  fileChanged(e) {
    const f = e.target.files[0];
    this.setState({
      file: f
    })
  }

  uploadFile(e) {
    e.preventDefault()

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    var hours = new Date().getHours(); //Current Hours.
    var min = new Date().getMinutes(); //Current Minutes.
    var sec = new Date().getSeconds(); //Current Seconds

    if (date < 10) {
      date = '0' + date;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (min < 10) {
      min = '0' + min;
    }

    let sud = +year + '/' + month + '/' + date
    let sut = +hours + ':' + min + ':' + sec

    //alert(date + month + year)

    // console.log(this.state.deadlinedate.indexOf('/')+1);
    // console.log(this.state.deadlinedate.substring(0,this.state.deadlinedate.indexOf('/')));
    //console.log(this.state.deadlinedate.substring(0,this.state.deadlinedate.indexOf('/')));



    let ldd = (this.state.dueDate.replace("-", "").replace("-", ""))
    let ldt = (this.state.deadlinetime.replace(":", "").replace(":", ""))

    let lud = (sud.replace("/", "").replace("/", ""))
    let lut = (sut.replace(":", "").replace(":", ""))



    if (ldd >= lud) {

      this.setState({

        late: ("Valid Submission")
      })
    }

    else if (lud > ldd) {

      this.setState({

        late: "Late Submission"
      }, () => {

        alert("Late Submission")
      })
    }

    axios.get('http://localhost:5000/api/checkview/' + this.props.match.params.aName + '/' + this.state.student,{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
  }).then(
      res => {
        console.log(res)
        this.setState({
          info: res.data
        })

        if (this.state.info == '') {

          if ((this.state.file.size / 1024) < 10240) {
            let data = new FormData();
            data.append('file', this.state.file);

            fetch('/api/files', {
              method: 'POST',
              body: data
            }).then(res => res.json())
              .then(data => {

                if (data.success) {
                  axios.get("http://localhost:5000/api/getlast",{headers: {
                    "Authorization" : "Bearer "+sessionStorage.getItem("token")
                  }
                }).then(res1 => {

                    console.log(res1.data.filename)
                    this.setState({
                      ofilename: res1.data.filename
                    })
                    console.log(res1.data.ofilename)

                    if (date < 10) {
                      date = '0' + date;
                    }
                    if (month < 10) {
                      month = '0' + month;
                    }
                    if (hours < 10) {
                      hours = '0' + hours;
                    }
                    if (min < 10) {
                      min = '0' + min;
                    }

                    const obj = {
                      name: this.props.match.params.aName,
                      subject: this.props.match.params.cName,
                      lecturer: this.state.lecturer,
                      student: this.state.student,
                      uname: this.state.file.name,
                      deadlinedate: this.state.dueDate,
                      deadlinetime: this.state.deadlinetime,
                      uploadedate: date + '/' + month + '/' + year,
                      uploadtime: hours + '/' + min + '/' + sec,
                      late: this.state.late,
                      filename: this.state.ofilename
                    }

                    axios.post('http://localhost:5000/api/add', obj,{headers: {
                      "Authorization" : "Bearer "+sessionStorage.getItem("token")
                    }
                  }).then(
                      res => {
                        console.log(res.data)

                        this.setState({

                          status: "Uploaded Successfully",
                          namealert: '',
                          sizealert: ''

                        })
                      }
                    ).catch(err => {
                      console.log(err)
                    }
                    )

                  }).catch(err1 => {
                    console.log(err1)
                  }
                  )

                  console.log(data)
                } else {
                  alert('Upload failed');
                }
              });

            //let x=this.state.file.uploadDate
            console.log(this.state.file.lastModifiedDate)

            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();

            var hours = new Date().getHours(); //Current Hours.
            var min = new Date().getMinutes(); //Current Minutes.
            var sec = new Date().getSeconds(); //Current Seconds

          } else {

            this.setState({
              sizealert: 'Select a File size < 10MB'
            })

            alert(this.state.sizealert);
          }
        } else {
          this.setState({
            namealert: 'Already Uploaded!'
          })
          alert(this.state.namealert);
        }
      }
    ).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    axios.get('http://localhost:5000/assignment/getAssignmentBycName_aName/' + this.props.match.params.cName + '/' + this.props.match.params.aName,{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
  }).then(res => {
      console.log(res.data);
      this.setState({
        dueDate: res.data.dueDate
      })
      console.log(this.state.dueDate);
    })
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
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Upload Assignments</h3>
                  <br></br>
                  <h4 className="mb-0"><b>Course Name   :</b>&nbsp;{this.props.match.params.cName}</h4>
                  <h4 className="mb-0"><b>Assignment Name   :</b>&nbsp;{this.props.match.params.aName}</h4>
                  <h4 className="mb-0"><b>Due Date   :</b>&nbsp;{this.state.dueDate}</h4>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {/* <Form onSubmit={this.onSubmit}> */}
              <Form>
                <div className="pl-lg-4">
                  <FormGroup className="form-group col-md-8">
                    <label className="form-control-label" style={{ marginRight: 25 }}> Upload your file here </label>

                    <input type="file" onChange={this.fileChanged.bind(this)} />

                    <button class="btn btn-primary" style={{ margin: 30 }} onClick={this.uploadFile.bind(this)}>Upload</button>
                    <br></br>
                    <h2>{this.state.namealert}</h2>
                    <h2>{this.state.sizealert}</h2>
                    <h2>{this.state.status}</h2>

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

export default UploadFile;
