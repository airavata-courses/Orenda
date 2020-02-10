import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignUp from './components/loginPage/register'
import SignIn from './components/loginPage/login'
import Forget from './components/loginPage/forget'
import SubmitTask from './components/dashboard/submitTask';
import SessionView from './components/dashboard/sessionViewer';

export default class  App extends React.Component{
  render() {
  return (
    <Router>
   
      <Switch>
      <Route path="/forget"  render={props => <Forget {...props} />}/>
      <Route path="/dashboard/submittask"  render={props => <SubmitTask {...props} />}/>
      <Route path="/login"  render={props => <SignIn {...props} />}/>
      <Route path="/register"  render={props => <SignUp {...props} />}/>
      <Route path="/dashboard/session"  render={props => <SessionView {...props} />}/>
       
        <Route path="/">
        <Redirect to="/login" />
        </Route>
       
      </Switch>
    
  </Router>
  );
}}

