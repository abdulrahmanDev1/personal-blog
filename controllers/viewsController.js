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

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create an account'
  })
}

exports.getProfile = (req, res) => {
  res.status(200).render('profile', {
    title: 'Your profile'
  })
}
