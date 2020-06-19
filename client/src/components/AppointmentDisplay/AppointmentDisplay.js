import React from "react";
import Modal from "../Modal/Modal";
import "./AppointmentDisplay.css";

class AppointmentDisplay extends React.Component {
  handleDelete = (event) => {
    const id = event.target.parentNode.getAttribute("listId");
    if (window.confirm("sure?")) {
      fetch(
        process.env.REACT_APP_API_URL || `http://localhost:5000/api/${id}`,
        {
          method: "DELETE",
        }
      )
        .then(this.props.fetchAppointments)
        .then(this.forceUpdate)
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="appointmentsDisplayContainer">
        <div className="selectedDay">
          <div>{this.props.days[this.props.currentDay.getDay()]}</div>
          <div>
            {this.props.monthsLong[this.props.currentDay.getMonth()]}{" "}
            {this.props.currentDay.getDate()}{" "}
          </div>
        </div>
        <div className="appointmentsListBox">
          <div className="appointmentsList">
            {this.props.appointments.map((appointment) => (
              <div
                className="appointment"
                key={appointment._id}
                listId={appointment._id}
              >
                <span onClick={this.handleDelete}>X </span>
                {appointment.begins.substring(11, 16)} {appointment.title}
              </div>
            ))}
          </div>
        </div>
        <Modal fetchAppointments={this.props.fetchAppointments} />
      </div>
    );
  }
}

export default AppointmentDisplay;
