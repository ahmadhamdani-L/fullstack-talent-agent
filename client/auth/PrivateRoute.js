import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './AuthHelper'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/talent/login/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute
