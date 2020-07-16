import React from 'react';
import logo from '../img/logo.svg'

const Header = () => {
  return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>React Countdown</h1>
          <div>
            <img src='http://ivanoliveira.com.br/imgs/logo.png' className='logo-ivan' alt='Logo Ivan Oliveira' />
            <a href='http://ivanoliveira.com.br'>Ivan Oliveira</a>
          </div>
        </header>
      </div>
    )
}

export default Header
