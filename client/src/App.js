import React from "react";
import "./App.css";

import CalenderDisplay from "./components/CalenderDisplay/calenderDisplay";
import AppointmentDisplay from "./components/AppointmentDisplay/AppointmentDisplay";
import Footer from "./components/Footer/footer";

import spring from "./assets/spring.jpg";
import summer from "./assets/summer.jpg";
import autumn from "./assets/autumn.jpg";
import winter from "./assets/winter.jpg";

class App extends React.Component {
  state = {
    appointments: [],
    currentDay: new Date(),
    image: "",
  };

  componentDidMount() {
    this.fetchAppointments();
    this.handleBackgroundImage();
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

  handleDaySelection = (event) => {
    if (event.target.classList.contains("day") && event.target.innerText) {
      event.target.parentElement.childNodes.forEach((child) =>
        child.classList.remove("selected")
      );
      event.target.classList.add("selected");
      let day = event.target.innerText;
      let month = event.target.className.split(" ")[0];
      let year = event.target.className.split(" ")[1];
      this.setState({ currentDay: new Date(year, month, day) }, () => {
        this.handleBackgroundImage();
      });
    }
  };

  handleBackgroundImage = () => {
    let test = this.state.currentDay.getMonth();
    if (test === 11 || test === 0 || test === 1) {
      this.setState({ image: winter });
    } else if (test === 2 || test === 3 || test === 4) {
      this.setState({ image: spring });
    } else if (test === 5 || test === 6 || test === 7) {
      this.setState({ image: summer });
    } else if (test === 8 || test === 9 || test === 10) {
      this.setState({ image: autumn });
    }
  };

  render() {
    const imgStyle = {
      backgroundImage: `url(${this.state.image})`,
      transition: "background-image 1s ease-in-out",
    };

    return (
      <div className="app" style={imgStyle}>
        <div className="header">
          <div className="title">eCalender</div>
        </div>
        <div className="mainContainer">
          <CalenderDisplay
            months={this.props.months}
            onSelection={this.handleDaySelection}
            appointments={this.state.appointments}
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
        <Footer />
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
