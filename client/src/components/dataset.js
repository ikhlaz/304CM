import React, { Component } from 'react';
import axios from "axios"
import './dataset.css';

class Dataset extends Component {
  constructor() {
    super();
    this.state = {
      dataset: [],
      input: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.input != '') {
      this.state.search = this.state.input;
      fetch(`/search/?city=${this.state.input}`)
      .then(res => res.json())
      .then(dataset => this.setState({dataset : dataset}, () => console.log('Dataset fetched...', dataset)));
      alert('A city was submitted: ' + this.state.input);
    }
    event.preventDefault();
  }

  componentDidMount() {
    fetch(`/search/?city=${this.state.input}`)
      .then(res => res.json())
      .then(dataset => this.setState({dataset : dataset}, () => console.log('Dataset fetched...', dataset)));
  }

  render() {
    var city = this.state.dataset.city;
    var dateG = this.state.dataset.dateG;
    var dateH = this.state.dataset.dateH;
    var time_Fajr = this.state.dataset.time_Fajr;
    var time_Zuhr = this.state.dataset.time_Zuhr;
    var time_Asar = this.state.dataset.time_Asar;
    var time_Maghrib = this.state.dataset.time_Maghrib;
    var time_Isha = this.state.dataset.time_Isha;

    return (
      <div>
        <div>
          <div className="container">
            <form onSubmit={this.handleSubmit} id="box">
              <input type="text" value={this.state.input} onChange={this.handleChange} id="txtbox-city" />
              <input type="submit" value="Search" id="btn-search"/>
            </form>
            <div id="table">
              <table>
                <tr>
                  <th id="th-city">City</th>
                  <th id="th-date">Date (Gregorian)</th>
                  <th id="th-date">Date (Hijri)</th>
                  <th id="th-time">Fajr</th>
                  <th id="th-time">Zuhr</th>
                  <th id="th-time">Asar</th>
                  <th id="th-time">Maghrib</th>
                  <th id="th-time">Isha'</th>
                </tr>
                <tr>
                  <td>{city}</td>
                  <td>{dateG}</td>
                  <td>{dateH}</td>
                  <td>{time_Fajr}</td>
                  <td>{time_Zuhr}</td>
                  <td>{time_Asar}</td>
                  <td>{time_Maghrib}</td>
                  <td>{time_Isha}</td>
                </tr>
              </table>
            </div>
          </div>       
        </div>
      </div>
    );
  }
}

export default Dataset;
