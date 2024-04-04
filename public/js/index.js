import { login, logout } from './login'
import {signup} from './signup'

const loginForm = document.querySelector('.loginForm')
const logoutBtn = document.querySelector('.logoutBtn')
const signupForm = document.querySelector('.signupForm')

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementsByName('email')[0].value
    const password = document.getElementsByName('password')[0].value
    console.log(email, password)
    login(email, password)
  })
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout)
}


if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementsByName('uName')[0].value
    const email = document.getElementsByName('email')[0].value
    const password = document.getElementsByName('password')[0].value
    const passwordConfirm = document.getElementsByName('passwordConfirm')[0].value
    signup(name, email, password, passwordConfirm)
  })
}