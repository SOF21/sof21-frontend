import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import LogRocket from 'logrocket'

if (process.env.NODE_ENV !== 'development') {
  LogRocket.init('jhsg24/sof21');
}   

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.append(modalRoot);

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;
