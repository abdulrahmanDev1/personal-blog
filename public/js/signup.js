import { showAlert } from './alerts'
import axios from 'axios'

export const signup = async (uName, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name: uName,
        email,
        password,
        passwordConfirm
      }
    })

    if (res.data.status === 'success') {
      showAlert('success', 'Signup successful!', 7);
      window.setTimeout(() => {
        location.assign('/')
      }, 1500)
    }
  } catch (err) {
    if (err.response.data.message.startsWith("Duplicate")) {
      showAlert('error', 'Email already exists! Please login instead.')
    } else {
      showAlert('error', err.response.data.message)
    }
  }
}
