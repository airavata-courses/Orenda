import React, { Component } from "react";
import DashNav from "./dashboardnav";
import dashService from './dashboardservice';
import jwt_decode from 'jwt-decode'
export default class SessionView extends Component {
  componentDidMount(){
    
    if (localStorage.getItem('userInfo')){
      let data={"userID":jwt_decode(localStorage.getItem('userInfo')).user.id}
      dashService.sessions(data).then(res => {
        if (res.status === 200) {
          console.log(res)
        }
      });
    }
    else{
      this.props.history.push('/')
    }
  }
  

  render() {
    return (
      <div>
        <DashNav />

        <div className="mt-5 p-4">session</div>
      </div>
    );
  }
}
