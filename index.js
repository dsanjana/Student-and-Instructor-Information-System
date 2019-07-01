const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

const isAuth = require('./middleware/is-auth');

const app = express();

// connect to mongoose
mongoose.connect(config.db);

const uploadedAssignmentRoute = require('./routes/file')
const assignmentRoute = require('./routes/assignments.route');
const courseRoutes = require('./routes/courses.route');
const approveRoutes = require('./routes/approve.route');
const lectureRoutes = require('./routes/lecture.route');
const loginRoutes = require('./routes/login.route');
const markRoutes = require('./routes/marks.route');

/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(cors());
app.use(isAuth);
app.use(logger('dev'));
// Put all API endpoints under '/api'

app.use('/api', uploadedAssignmentRoute);
app.use('/assignment', assignmentRoute);
app.use('/courses',courseRoutes);
app.use('/approves',approveRoutes);
app.use('/lectures',lectureRoutes);
app.use('/login',loginRoutes);
app.use('/marks',markRoutes);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
var server = app.listen(port);

console.log(`GridFS tutorial listening on ${port}`);

module.exports = server;
