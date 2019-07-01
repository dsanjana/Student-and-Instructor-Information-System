import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";
import Assignments from "views/examples/Assignments";
import UploadFile from "./views/examples/UploadFile";
import LecturerView from "./views/examples/LecturerView";
import StudentView from "./views/examples/StudentView";
import StudentDashboard from "./views/examples/StudentDashboard";
import Subjects from "./views/examples/Subjects";
import LecturerDashboard from "./views/examples/LecturerDashboard";
import AddUsers from "./views/examples/AddUsers";
import EditUser from "./views/examples/EditUser";
import UsersList from "./views/examples/UsersList";
import AddCourse from "./views/examples/AddCourse";
import CourseList from "./views/examples/CourseList";
import EditCourse from "./views/examples/EditCourse";
import ApprovalList from "./views/examples/ApprovalList";
import AdminDashboard from "./views/examples/AdminDashboard";
import AddMarks from "./views/examples/AddMarks";
import EditMarks from "./views/examples/EditMarks";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/main"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-primary",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-info",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/studentDashboard",
    name: "student Dashboard",
    icon: "ni ni-laptop text-primary",
    component: StudentDashboard,
    layout: "/dashboard"
  },
  {
    path: "/lecturerDashboard",
    name: "Lecturer Dashboard",
    icon: "ni ni-laptop text-primary",
    component: LecturerDashboard,
    layout: "/dashboard"
  },
  {
    path: "/adminDashboard",
    name: "Admin Dashboard",
    icon: "ni ni-laptop text-primary",
    component: AdminDashboard,
    layout: "/dashboard"
  },
  {
    path: "/assignments",
    component: Assignments,
    layout: "/lecturer"
  },
  {
    path: "/uploadAssignments/:cName/:aName/:dDate",
    component: UploadFile,
    layout: "/student"
  },
  {
    path: "/uploadAssignment/:cName/:aName",
    component: UploadFile,
    layout: "/student"
  },
  {
    path: "/lecturerView",
    component: LecturerView,
    layout: "/lecturer"
  },
  {
    path: "/studentView/:cName/:aName",
    component: StudentView,
    layout: "/student"
  },
  {
    path: "/subject/:cName",
    component: Subjects,
    layout: "/student"
  },
  {
    path: "/createUser",
    component: AddUsers,
    layout: "/admin"
  },
  {
    path: "/userList",
    component: UsersList,
    layout: "/admin"
  },
  {
    path: "/editUser/:id",
    component: EditUser,
    layout: "/admin"
  },
  {
    path: "/createCourse",
    component: AddCourse,
    layout: "/admin_"
  },
  {
    path: "/courseList",
    component: CourseList,
    layout: "/admin_"
  },
  {
    path: "/editCourse/:id",
    component: EditCourse,
    layout: "/admin_"
  },
  {
    path: "/approvalList",
    component: ApprovalList,
    layout: "/lecturer"
  },
  {
    path: "/addMarks",
    component: AddMarks,
    layout: "/admin"
  },
  {
    path: "/editMarks/:id",
    component: EditMarks,
    layout: "/admin"
  }
];
export default routes;