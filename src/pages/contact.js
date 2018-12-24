import React, {Component} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from 'react-spinkit'

class Contact extends Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }

  handleChangeForm (e) {
    var {form} = this.state
    form[e.target.name] = e.target.value
    this.setState({form})
  }

  async handleSubmit (e) {
    this.setState({
      loading: true
    })
    var {form} = this.state
    e.preventDefault()
    try {
      await axios.post('https://services.blazepxel.com/api/contact', form)
      this.setState({form: {name: '', email: '', subject: '', message: ''}, loading: false})
      toast.success('¡Listo!, pronto nos pondremos en contacto contigo', {
        position: toast.POSITION.TOP_RIGHT
      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    var {form, loading} = this.state

    return (<div>
      <ToastContainer />
        <form onSubmit={(e) => this.handleSubmit(e)}>

          <div className='field is-horizontal'>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <input
                    required
                    className='input'
                    name='name'
                    type='text'
                    placeholder={'Nombre'}
                    value={form.name}
                    onChange={(e) => this.handleChangeForm(e)} />
                </div>
              </div>
            </div>
          </div>

          <div className='field is-horizontal'>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <input
                    className='input'
                    required
                    name='email'
                    type='email'
                    placeholder={'Email'}
                    value={form.email}
                    onChange={(e) => this.handleChangeForm(e)} />
                </div>
              </div>
            </div>
          </div>

          <div className='field is-horizontal'>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <input
                    required
                    className='input '
                    name='subject'
                    type='text'
                    placeholder='Asunto'
                    value={form.subject}
                    onChange={(e) => this.handleChangeForm(e)} />
                </div>
              </div>
            </div>
          </div>

          <div className='field is-horizontal'>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <textarea
                    required
                    className='textarea'
                    placeholder='Mensaje'
                    value={form.message}
                    name='message'
                    onChange={(e) => this.handleChangeForm(e)} />
                </div>
              </div>
            </div>
          </div>

          <div className='control is-flex-center'>
            {
              loading ? (<Spinner name="circle" color="white"/>) : (<button className='button is-fullwidth is-success'>
                Enviar
              </button>)
            }
          </div>
        </form>
      </div>)
  }
}

export default Contact
