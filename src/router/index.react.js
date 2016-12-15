import React from 'react';
import {Router, Route, browserHistory, Redirect} from 'react-router';
import {Glonass} from '../containers';

/**
 * Glonass router component
 * @return {React.Component} component
 */
export default function GlonassRouter() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Glonass}/>
      <Redirect from="*" to="/"/>
    </Router>
  );
};
