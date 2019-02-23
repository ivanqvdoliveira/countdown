import React, { Component } from 'react';
import Modal from './utils/modal'

class Contact extends Component {
  constructor () {
    super()

    this.state = {modal: false}
  }

  clearWhiteSpace (value) {
    if (value == null) return value
    return value.replace(/^\s+/g, '')
  }

  onChangeInputValue (e) {
    const inputInfo = e.target.name
    let value = e.target.value
    value = this.clearWhiteSpace(value)
    this.setState({
      [inputInfo]: value
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    this.setState({modal: true})
  }


  closeModal = () => {
    this.setState({
      modal: false
    })
  }


  render () {
    return (
      <div className='squad format-style'>
        {this.state.modal ? (
          <Modal closeModal={this.closeModal}>
            <h3>Você enviou:</h3>
            <p>{this.state.formName}</p>
            <p>{this.state.formEmail}</p>
            <p>{this.state.formPhone}</p>
            <p>{this.state.formMsg}</p>
            <h4>com sucesso</h4>
          </Modal>
          ) : null
        }
        <article>
          <h1>Contact <i className="fas fa-igloo" /></h1>
        </article>
        <form
          id='form'
          action=''
          method='post'
          className='clear'
          onSubmit={this.submitForm}>
          <input
            name='formName'
            type='text'
            id='Nome'
            placeholder='Nome'
            required
            onChange={(e) => this.onChangeInputValue(e)}
          />
          <input
            name='formEmail'
            type='text'
            id='email'
            placeholder='E-mail (ex. meunome@meudominio.com)'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
            required
            onChange={(e) => this.onChangeInputValue(e)}
          />
          <input
            name='formPhone'
            type='number'
            id='fone'
            placeholder='Telefone'
            required
            onChange={(e) => this.onChangeInputValue(e)}
          />
          <textarea
            name='formMsg'
            id='mensagem'
            placeholder='Digite aqui a sua mensagem'
            required
            onChange={(e) => this.onChangeInputValue(e)}
          ></textarea>
          <button type='submit' className='button' name='Submit'>
            Enviar
          </button>
        </form>
      </div>
    )
  }
}

export default Contact

