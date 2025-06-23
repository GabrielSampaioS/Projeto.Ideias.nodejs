module.exports.checkAuth = function(req, res, next) {
    const userId = req.session.userid

    if(!userId) {
        req.flash('message', 'Please log in to access this page.');
        return res.redirect('/login');
    }

    next();
}