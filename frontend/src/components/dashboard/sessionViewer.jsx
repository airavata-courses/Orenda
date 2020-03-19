import React, { Component } from "react";
import DashNav from "./dashboardnav";
import dashService from "./dashboardservice";
import jwt_decode from "jwt-decode";
import {Card} from 'react-bootstrap'
import moment from 'moment'
import ReactLoading from 'react-loading';
import './dashboard.css'
import notFound from './notFound.jpg'
export default class SessionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: []
    };
  }
  componentDidMount() {
    if (localStorage.getItem("userInfo")) {
      let data = {
        userID: jwt_decode(localStorage.getItem("userInfo")).user.id
      };
      dashService.sessions(data).then(res => {
        if (res.status === 200) {
          this.setState({ sessions: res.data.sessions });
          
        }
      });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <DashNav />
        <div className="container m-4" >
            <div className='row'>
            <div className='col'> session</div>
            </div>
        </div>
        <div className="container " >
          
              <div className='row'>
        {this.state.sessions.map((session, index) => (
        
         
            <SessionCard key={index} session={session} />
         
        ))}
        </div>
          </div>
      </div>
    );
  }
}

class SessionCard extends Component {
  render() {
    
    const input=this.props.session.inputData
  
    return (
      <div className='m-2 justify-content-left '>
        
       <Card style={{ width: '18rem' }}>

       {this.props.session.outputData && <Card.Img className='sessionCardImg m-auto' variant="top" src={this.props.session.outputData} href={this.props.session.outputData}/>}
       {!this.props.session.outputData && <Card.Img className='sessionCardImg' variant="top" src={notFound} href={this.props.session.outputData}/>}
  <Card.Body className='text-center text-primary'>
    <Card.Title>{'Station Name - '+this.props.session.inputData.Radar}</Card.Title>
    <Card.Text >
    {'Scan Date - '+this.props.session.inputData.Month}{'/'+this.props.session.inputData.Day}{'/'+this.props.session.inputData.Year}
    </Card.Text>
   
  </Card.Body>
  <Card.Footer className='text-center'>
      <small className="text-muted">Submitted on {moment(this.props.session.createdAt).format('MMMM Do YYYY')}</small>
      <hr/>
      {this.props.session.taskState=='executed' && <small className="text-muted">Executed on {moment(this.props.session.updatedAt).format('MMMM Do YYYY')}</small>}
      {this.props.session.taskState=='None' && <small className="text-muted">Waiting to fetch data</small>}
      {this.props.session.taskState=='error' && <small className="text-muted">No scans available</small>}
      {this.props.session.taskState=='executing' && <ReactLoading className='te' type='balls' color='#000000' height={20} width={37} />}

    </Card.Footer>
</Card>
      </div>
    );
  }
}
