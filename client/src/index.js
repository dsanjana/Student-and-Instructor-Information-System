import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.jsx";
import Admin_Layout from "layouts/Admin_.jsx";
import AuthLayout from "layouts/Auth.jsx";
import DashboardLayout from "layouts/Dashboard.jsx";
import StudentLayout from "layouts/Student.jsx";
import LecturerLayout from "layouts/Lecturer.jsx";
import MainLayout from "layouts/Main.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/admin_" render={props => <Admin_Layout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/dashboard" render={props => <DashboardLayout {...props} />} />
      <Route path="/student" render={props => <StudentLayout {...props} />} />
      <Route path="/lecturer" render={props => <LecturerLayout {...props} />} />
      <Route path="/main" render={props => <MainLayout {...props} />} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
