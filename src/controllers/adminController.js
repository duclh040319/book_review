class AdminController {
    index(req, res) {
        res.render('admin/index', {
            title: "Dashboard-admin",
            layout: 'admin'
        })
    }

    statistic(req, res) {
        res.render('admin/statistic', {
            title: "Statistic",
            layout: 'admin'
        })
    }

    bookManage(req, res) {
        res.render('admin/bookManage', {
            title: "Book Manager",
            layout: 'admin'
        })
    }

    user(req, res) {
        res.render('admin/user', {
            title: "User",
            layout: 'admin'
        })
    }

    review(req, res) {
        res.render('admin/review', {
            title: 'Reviews',
            layout: 'admin'
        })
    }

    setting(req, res) {
        res.render('admin/setting', {
            title: 'Setting',
            layout: 'admin'
        })
    }

    redirectIndex(req, res) {
        res.redirect('/admin/dashboard')
    }
}

module.exports = new AdminController()