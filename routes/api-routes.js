var express  = require("express"),
    router   = express.Router({mergeParams: true}),
    passport = require('passport');
// Set default API response

router.get('/', function (req, res) {
    res.json({
        status: "API Its Working",
        message: "Welcome to Taskwud API's!"
    });
});

var usercontroller = require('../controllers/usercontroller');
var taskcontroller = require('../controllers/taskcontroller');
var organizationcontroller = require('../controllers/organizationcontroller');
// Contact routes
// Contact routes
router.route('/user')
    .get(usercontroller.index)
    .post(usercontroller.new);
router.route('/user/login')
    .post(usercontroller.login);
router.route('/user/:id')
    .get(usercontroller.view)
    .put(usercontroller.update)
    .delete(usercontroller.delete);
    
router.route('/task')
    .get(usercontroller.index)
    .post(taskcontroller.new);


router.route('/organization/neworganization')
    .get(organizationcontroller.index)
  
// Export API routes
module.exports = router;