var express  = require("express"),
    router   = express(),
    passport = require('passport');
// Set default API response

router.get('/', function (req, res) {
    res.json({
        status: "API Its Working",
        message: "Welcome to Taskwud API's!"
    });
});

var usercontroller = require('../controllers/usercontroller');
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

// Export API routes
module.exports = router;