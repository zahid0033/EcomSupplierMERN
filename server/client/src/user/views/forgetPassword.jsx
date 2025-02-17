import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumbs from '../widgets/Breadcrumbs/breadcrumbs'
import { Link } from 'react-router-dom'
// sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//validation
import SimpleReactValidator from 'simple-react-validator'

class ForgetPassword extends Component {
  constructor() {
    super()
    this.validator = new SimpleReactValidator({ autoForceUpdate: this })
    this.state = {
      email: '',
      message: null,
      sending: false,
    }
  }
  handleChange = (event) => {
    this.validator.showMessages()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onSave = async (e) => {
    e.preventDefault()
    if (this.validator.allValid()) {
      const dataPost = {
        email: this.state.email,
      }
      this.setState({
        sending: true,
      })

      await axios
        .post(`/api/supplier/forgetPassword`, dataPost)
        .then((response) => {
          if (response.data.success === true) {
            this.setState({
              email: '',
              message: response.data.message,
              sending: false,
            })
          } else {
            alert('hey ' + response.data.message)
          }
        })
        .catch((error) => {
          if (error.response.data.success === false) {
            this.setState({
              sending: false,
              message: error.response.data.message,
            })
          } else if (error.response.data.name === 'server error') {
            this.setState({
              sending: false,
              errorMessage: error.response.data.error[0].message,
            })
          }
        })
    } else {
      this.validator.showMessages()
    }
  }

  render() {
    return (
      <>
        {/* START SECTION BREADCRUMB */}
        <Breadcrumbs title='Forget Password' />
        {/* END SECTION BREADCRUMB */}
        <div className='main_content'>
          {/* START LOGIN SECTION */}
          <div className='login_register_wrap section'>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-xl-6 col-md-10'>
                  <div className='login_wrap'>
                    <div className='padding_eight_all bg-white'>
                      <div className='heading_s1'>
                        {this.state.message && (
                          <p className='alert alert-primary'>
                            {this.state.message}
                          </p>
                        )}
                        {this.state.sending ? (
                          <p className='alert alert-success'>
                            Sending Please Wait.....
                          </p>
                        ) : (
                          ''
                        )}
                        <h3>Forget Password</h3>
                      </div>
                      <form>
                        <div className='form-group'>
                          <input
                            type='text'
                            required
                            className='form-control'
                            name='email'
                            placeholder='Your Email'
                            value={this.state.email}
                            onChange={this.handleChange}
                          />
                          {this.validator.message(
                            'email',
                            this.state.email,
                            'required|email',
                            { className: 'text-danger' }
                          )}
                        </div>

                        <div className='form-group'>
                          <button
                            type='submit'
                            className='btn btn-fill-out btn-block'
                            name='login'
                            onClick={this.onSave}
                          >
                            Reset Password
                          </button>
                        </div>
                      </form>
                      <div className='different_login'>
                        <span> or</span>
                      </div>

                      <div className='form-note text-center'>
                        Remember Password?{' '}
                        <Link to={'/supplier/signin'}>Back to Signin</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END LOGIN SECTION */}
        </div>
      </>
    )
  }
}

export default ForgetPassword
