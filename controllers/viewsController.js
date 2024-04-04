exports.getHomePage = (req, res) => {
  res.status(200).render('home', {
    title: 'Home page'
  })
}

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  })
}

exports.getProfile = (req, res) => {
  res.status(200).render('profile', {
    title: 'Your profile'
  })
}
