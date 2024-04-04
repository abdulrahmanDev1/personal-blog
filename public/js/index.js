import '@babel/polyfill'
import { login, logout } from './login'

const loginForm = document.querySelector('.loginForm')
const logoutBtn = document.querySelector('.logoutBtn')

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
