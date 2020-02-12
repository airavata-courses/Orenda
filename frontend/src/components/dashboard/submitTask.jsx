import React, { Component } from "react";
import { Link } from "react-router-dom";
import DashNav from "./dashboardnav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import stations from './stations';
import Select from 'react-select';
import {Button} from 'react-bootstrap';
import dashService from './dashboardservice'
import jwt_decode from 'jwt-decode'

export default class SubmitTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID:'',
    errDate:'',
      selectedDate:new Date(),
      currYear: new Date().getFullYear(),
      currMonth: new Date().getMonth(),
      currDay: new Date().getDate(),
stn:[],
selectedStnVal:'',
selectedStn:'',
    Year: new Date().getFullYear(),
      Month: new Date().getMonth(),
      Day: new Date().getDate()


    };
    this.handleDateChange=this.handleDateChange.bind(this)
    this.handleStnChange=this.handleStnChange.bind(this)

  }
  componentDidMount(){
if (localStorage.getItem('userInfo')){
   
      this.setState({
        userID: jwt_decode(localStorage.getItem('userInfo')).user.id
      });
   
    
    var statn=[]
    var label=''
    var value=''
    var ob={}
    for (var i = 0; i < stations.length; i++) {
      label=stations[i]['STATION NAME']
      value=stations[i]['STATION ID']
       ob={label: label,value:value}
       statn[i]=ob
    }
    this.setState({
      stn: statn
    });
  }
else{
  this.props.history.push('/')
}}
  handleStnChange = stn => { console.log(stn) 
    this.setState({selectedStn:stn,selectedStnVal:stn['value']})}

  handleDateChange = date => {
    
   
    if (
      date.getFullYear() <= this.state.currYear &&
      date.getMonth() <= this.state.currMonth &&
      date.getDate() <=this.state.currDay
    ) {
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      this.setState({
        Year: year,
        Month: month,
        Day: day,
        selectedDate:date,
        errDate: ""
      });
    } else {
      this.setState({
        errDate: "Please select a valid date"
      });
    }
    
  };
submitTask=e=>{
e.preventDefault();

var data = {

  "inputData":{
  "Year": this.state.Year,
  "Month": this.state.Month,
  "Day": this.state.Day,
  "Radar": this.state.selectedStnVal,
  },
  userID:this.state.userID

};
console.log(data)
dashService.submitTask(data).then(res => {
  if (res.status === 200) {
    console.log(res)
  }
});
}
  render() {

    return (
      <div className="mt-5 p-4 ">
        <DashNav />
        {this.state.errDate}
        <div className="container m-2">
          <div className="row">
            <div className="col">
              <DatePicker
                selected={this.state.selectedDate}
                onChange={this.handleDateChange}
              />
            </div>
          </div>{" "}
       
          <div className="row ">
            <div className="col ">
              <Select
                name="stations"
           
                options={this.state.stn}
                onChange={val => this.handleStnChange(val)}
                value={this.state.selectedStn}
              />
            </div>
          </div>{" "}
        </div>{" "}

        <Button variant="primary" onClick={this.submitTask}>Validate And Submit</Button>
      </div>
    );
  }
}
