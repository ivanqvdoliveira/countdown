import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home'
import Header from './components/header'
import Menu from './components/menu'
import Contact from './components/contact'
import Exemples from './components/exemples'

const defaultRoute = () => (
  <Router>
    <div>
      <Header />
      <Menu />

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/exemples" component={Exemples}/>
    </div>
  </Router>
)

export default defaultRoute

