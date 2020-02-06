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
import DashBoard from './components/dashboard/dashboard'
export default class  App extends React.Component{
  render() {
  return (
    <Router>
    <div>
      <Switch>
      <Route path="/forget"  render={props => <Forget {...props} />}/>
      <Route path="/dashboard"  render={props => <DashBoard {...props} />}/>
      <Route path="/login"  render={props => <SignIn {...props} />}/>
      <Route path="/register"  render={props => <SignUp {...props} />}/>
       
        <Route path="/">
        <Redirect to="/login" />
        </Route>
       
      </Switch>
    </div>
  </Router>
  );
}}

