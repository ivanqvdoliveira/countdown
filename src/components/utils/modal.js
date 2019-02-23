import React, { Component } from 'react'

export default class Modal extends Component {
  componentWillMount () {
    document.body.setAttribute('scroll', 'no')
    document.body.style.overflow = 'hidden'
  }

  onClickCloseModal () {
    this.props.closeModal()
  }

  render () {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <i className="fas fa-times" onClick={() => this.onClickCloseModal()}></i>
          {this.props.children}
        </div>
      </div>
    )
  }

  componentWillUnmount () {
    document.body.removeAttribute('scroll')
    document.body.style.overflow = 'initial'
  }
}
