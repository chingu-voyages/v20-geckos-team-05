import React from "react";
import "./App.css";

import CalenderDisplay from "./components/CalenderDisplay/calenderDisplay";
import AppointmentDisplay from "./components/AppointmentDisplay/AppointmentDisplay";

class App extends React.Component {
  state = {
    appointments: [],
  };

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = () => {
    fetch(process.env.REACT_APP_API_URL || "http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => data.appointments)
      .then((appointments) => {
        this.setState(() => ({
          appointments,
        }));
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="app">
        <div className="header">
          <div className="title">eCalender</div>
        </div>
        <div className="mainContainer">
          <CalenderDisplay />
          <div className="eventsDisplay">
            <AppointmentDisplay
              appointments={this.state.appointments}
              fetchAppointments={this.fetchAppointments}
            />
          </div>
        </div>
        <div className="footer">This is the footer</div>
      </div>
    );
  }
}
export default App;
