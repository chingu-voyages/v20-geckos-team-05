import React from "react";
import "./App.css";

import CalenderDisplay from "./components/CalenderDisplay/calenderDisplay";
import AppointmentDisplay from "./components/AppointmentDisplay/AppointmentDisplay";

class App extends React.Component {
  state = {
    appointments: [],
    currentDay: new Date(),
  };

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = () => {
    return fetch(process.env.REACT_APP_API_URL || "http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => data.appointments)
      .then((appointments) => {
        this.setState(() => ({
          appointments,
        }));
      })
      .catch((error) => console.log(error));
  };

  handleDaySelection = (event) => {
    if (event.target.classList.contains("day") && event.target.innerText) {
      event.target.parentElement.childNodes.forEach((child) =>
        child.classList.remove("selected")
      );
      event.target.classList.add("selected");
      let day = event.target.innerText;
      let month = event.target.className.split(" ")[0];
      let year = event.target.className.split(" ")[1];
      this.setState({ currentDay: new Date(year, month, day) });
    }
  };

  render() {
    return (
      <div className="app">
        <div className="header">
          <div className="title">eCalender</div>
        </div>
        <div className="mainContainer">
          <CalenderDisplay
            months={this.props.months}
            onSelection={this.handleDaySelection}
          />
          <AppointmentDisplay
            appointments={this.state.appointments}
            fetchAppointments={this.fetchAppointments}
            currentDay={this.state.currentDay}
            months={this.props.months}
            monthsLong={this.props.monthsLong}
            days={this.props.days}
          />
        </div>
        <div className="footer">This is the footer</div>
      </div>
    );
  }
}

App.defaultProps = {
  months: [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
  monthsLong: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

export default App;
