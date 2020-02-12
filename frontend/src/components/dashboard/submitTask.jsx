import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashNav from './dashboardnav';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import stations from './stations';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import dashService from './dashboardservice';
import jwt_decode from 'jwt-decode';
import './dashboard.css';

export default class SubmitTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      errDate: '',
      selectedDate: new Date(),
      currYear: new Date().getFullYear(),
      currMonth: new Date().getMonth(),
      currDay: new Date().getDate(),
      stn: [],
      selectedStnVal: '',
      selectedStn: '',
      Year: new Date().getFullYear(),
      Month: new Date().getMonth(),
      Day: new Date().getDate()
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStnChange = this.handleStnChange.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem('userInfo')) {
      this.setState({
        userID: jwt_decode(localStorage.getItem('userInfo')).user.id
      });

      var statn = [];
      var label = '';
      var value = '';
      var ob = {};
      for (var i = 0; i < stations.length; i++) {
        label = stations[i]['STATION NAME'];
        value = stations[i]['STATION ID'];
        ob = { label: label, value: value };
        statn[i] = ob;
      }
      this.setState({
        stn: statn
      });
    } else {
      this.props.history.push('/');
    }
  }
  handleStnChange = stn => {
    console.log(stn);
    this.setState({ selectedStn: stn, selectedStnVal: stn['value'] });
  };

  handleDateChange = date => {
    if (
      date.getFullYear() <= this.state.currYear &&
      date.getMonth() <= this.state.currMonth &&
      date.getDate() <= this.state.currDay
    ) {
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      this.setState({
        Year: year,
        Month: month,
        Day: day,
        selectedDate: date,
        errDate: ''
      });
    } else {
      this.setState({
        errDate: 'Please select a valid date'
      });
    }
  };
  submitTask = e => {
    e.preventDefault();

    var data = {
      inputData: {
        Year: this.state.Year,
        Month: this.state.Month,
        Day: this.state.Day,
        Radar: this.state.selectedStnVal
      },
      userID: this.state.userID
    };
    console.log(data);
    dashService.submitTask(data).then(res => {
      if (res.status === 200) {
        console.log(res);
      }
    });
  };

  render() {
    return (
      <div className='Dashboard mt-5 p-4 full-width-div'>
        <DashNav />
        {this.state.errDate}
        <center>
          <div className='container m-2'>
            <div className='row'>
              <div className='col'>
                <b>
                  <font size='8'> GET THE PREDICTED WEATHER PLOT</font>
                </b>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col'>
                <div>
                  <b>
                    <font size='5'>Select a date</font>
                  </b>
                </div>
                <DatePicker
                  selected={this.state.selectedDate}
                  onChange={this.handleDateChange}
                />
              </div>
            </div>{' '}
            <div className='row mt-5 '>
              <div className='col '>
                <b>
                  <font size='5'>Select a location</font>
                </b>
                <Select
                  data-size='5'
                  data-width='fit'
                  name='stations'
                  options={this.state.stn}
                  onChange={val => this.handleStnChange(val)}
                  value={this.state.selectedStn}
                />
              </div>
            </div>{' '}
          </div>{' '}
          <div className='row mt-4 '>
            <div className='col '>
              <Button
                variant='primary'
                onClick={this.submitTask}
                data-toggle='modal'
                data-target='#myModal'
              >
                Validate And Submit
              </Button>
            </div>
          </div>
          <div class='modal fade' id='myModal' role='dialog'>
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <button
                    type='button'
                    class='close'
                    data-dismiss='modal'
                  ></button>

                  <h4 class='modal-title'>Your request is being processed</h4>
                </div>
                <div class='modal-body'>
                  <p>
                    <h6>
                      You can view the desired forecast in the SESSION tab in a
                      while
                    </h6>
                  </p>
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-default'
                    data-dismiss='modal'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
