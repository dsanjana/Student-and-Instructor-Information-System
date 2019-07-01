const router = require('express').Router();
const { mongo, connection } = require('mongoose');
let Marks = require('./marks.model');


router.route('/add').post(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    let marks = new Marks(req.body);
    marks.save()
        .then(business => {
            res.status(200).json({'marks': 'marks in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

router.route('/get/:cName/:aName/').get(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }

    Marks.find({subject:req.params.cName,name:req.params.aName})
        .then(business => {
            res.status(200).json(business);
        })
        .catch(err => {
            res.status(400).send("unable");
        });
})

router.route('/get/:cName/:aName/:stuId').get(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }

    Marks.findOne({subject:req.params.cName,name:req.params.aName,student:req.params.stuId}, function (err, Assignment){
        res.json(Assignment);
    });

})

router.route('/getMarks/:cName/:stuId').get(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }

    Marks.find({subject:req.params.cName,student:req.params.stuId}, function (err, marks){
        res.json(marks);
    });

})

router.route('/get/:stu').post(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }

    Marks.find({student:req.params.stu})
        .then(business => {
            res.status(200).json({'marks': 'marks in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})

router.get('/delete/:id', (req, res) => {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    Marks.remove({_id:req.params.id}, (err) => {
        if (err) return res.status(500).json({ success: false })
        return res.json({ success: true });
    })

})
router.get('/findmarks/:id', (req, res) => {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    Marks.findOne( {_id:req.params.id}, function (err, mark){
        res.json(mark);
    }).catch(err => {
        res.status(400).send("unable to save to database");
    });

    })

router.post('/updatemarks/:id/:mark', (req, res) => {
    console.log(req.params.id)
    // if (!req.isAuth) {
    //     return res.status(500).json({ message: "Invalid authentication tutorial"})
    //  }
    Marks.updateMany({_id:req.params.id},{mark:req.params.mark},{multi:true}, function (err, Assignment){
        res.json(Assignment);
    }).catch(err => {
        res.status(400).send("unable to save to database");
    });

})

module.exports = router;
