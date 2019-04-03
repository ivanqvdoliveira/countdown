import React from 'react';
import { Route, Link } from 'react-router-dom'

const Exemple = ({ match }) => {
  const id = match.params.topicId
  let returnThat
  switch (id) {
    case 'grid-css':
      returnThat = (
        <div>
          <div className='grid container'>
            <div className='item1'>1</div>
            <div className='item2'>2</div>
            <div className='item3'>3</div>
            <div className='item4'>4</div>
            <div className='item5'>5</div>
            <div className='item6'>6</div>
          </div>
          <div className='grid mosaico'>
            <div className='item1'><img alt='' src='https://cdn.stocksnap.io/img-thumbs/960w/8BK8Y8YQLH.jpg' /></div>
            <div className='item2'><img alt='' src='https://cdn.stocksnap.io/img-thumbs/960w/3P2VJTWWNF.jpg' /></div>
            <div className='item3'><img alt='' src='https://cdn.stocksnap.io/img-thumbs/960w/9Z7ZIEY28T.jpg' /></div>
            <div className='item4'><img alt='' src='https://cdn.stocksnap.io/img-thumbs/960w/XLZH9NMVAF.jpg' /></div>
            <div className='item5'><img alt='' src='https://cdn.stocksnap.io/img-thumbs/960w/978C9IB8S8.jpg' /></div>
            <div className='item6'><img alt='' src='https://cdn.stocksnap.io/img-thumbs/960w/GM3VPV2VOY.jpg' /></div>
          </div>
        </div>)
      break;
    default:
      null
  }
  return (
    <div>
      <h3>{id}</h3>
      {returnThat}
    </div>
  )
}

const Exemples = ({ match }) => (
  <div className='squad'>
    <h2>Exemples</h2>
    <ul>
      <li>
        <Link to={`${match.url}/grid-css`}>
          Grid CSS
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Exemple}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

export default Exemples

