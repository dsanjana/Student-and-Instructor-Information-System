import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//images
import Background from "../assets/img/brand/Image2.jpg";
import axios from 'axios'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  FormGroup,
  Form,
  Input,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.jsx";

import Header from "components/Headers/Header.jsx";
/*import Footer from "../components/Footers/AdminFooter";*/

class Index extends React.Component {
  
  state = {
    activeNav: 1,
    chartExample1Data: "data1",
    info:'',
    assignments: [],
    notifyAssignment: false,
    name: sessionStorage.getItem("userName")
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };

  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentDidMount() {
    console.log(sessionStorage.getItem("userId"))
    console.log(sessionStorage.getItem("token"))
    var timestamp = sessionStorage.getItem("userId").toString().substring(0,8)
    console.log(sessionStorage.getItem("email"))

    axios.get('http://localhost:5000/login/getLoginDetails/'+sessionStorage.getItem("email"),{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
  })
            .then(response => {
                this.setState({
                    info: response.data
                })
                console.log(this.state.info)
            })
            .catch(function (error) {
                console.log(error);
            })

            const obj = {
              email: sessionStorage.getItem("email"),
              userId: sessionStorage.getItem("userId"),
              time: Date.now()
            }
      axios.post('http://localhost:5000/login/loginDetails', obj,{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data)
      })
      
       if(sessionStorage.getItem("userRole")=="student"){

        axios.get('http://localhost:5000/assignment/getAssignments/',{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
  })
            .then(response => {
                console.log(response.data)
                this.setState({
                    assignments: response.data
                },()=>{
                  this.state.assignments.map((obj)=>{
                    console.log(parseInt(obj._id.toString().substring(0,8),16).toString())
                    if(this.state.info.time.substring(0,8)< parseInt(obj._id.toString().substring(0,8),16).toString()){
                      this.setState({
                        notifyAssignment:true
                      })
                    }
                  })
                })
                console.log(this.state.assignments)
                
                if(this.state.notifyAssignment == true){
                  confirmAlert({
                    title: 'New Assignment were Added!',
                    message: 'Are you want to go to the Assignment Page.',
                    buttons: [
                      {
                        label: 'Yes',
                        onClick: () => this.props.history.push('/dashboard/studentDashboard/')
                      },
                      {
                        label: 'No',
                      }
                    ]
                  })
                }
  
              
            })
            .catch(function (error) {
                console.log(error);
            })
       }
      
       if(sessionStorage.getItem("userRole")=="lecturer"){

          axios.get('http://localhost:5000/approves/'+sessionStorage.getItem("userName"),{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
              .then(response => {
                  this.setState({ coursed: response.data });
  
                 // alert(this.state.coursed.length);
                  if(this.state.coursed.length != 0){
                    confirmAlert({
                      title: 'New Courses were Added!',
                      message: 'Are you want to go to the Course Page.',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () => this.props.history.push('/dashboard/LecturerDashboard/')
                        },
                        {
                          label: 'No',
                        }
                      ]
                    })
                  }
              })
              .catch(function (error) {
                  console.log(error);
              });
            }
  }
  render() {
    let { leftIcon, rightIcon } = this.state;
    return (
      <>
        <Header />
        {/* Page content */}
      </>
    );
  }
}

export default Index;
