import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home'
import Header from './components/header'

const defaultRoute = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home}/>
    </div>
  </Router>
)

export default defaultRoute

