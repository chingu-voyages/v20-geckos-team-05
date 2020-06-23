import React from "react";
import Modal from "../Modal/Modal";
import "./AppointmentDisplay.css";

class AppointmentDisplay extends React.Component {
  handleDelete = async (event) => {
    const id = event.target.parentNode.getAttribute("listid");
    let url = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
    if (window.confirm("sure?")) {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      await this.props.fetchAppointments();
      this.forceUpdate();
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
            {this.props.appointments
              .filter(
                (appointment) =>
                  new Date(appointment.startDate).toDateString() ===
                  this.props.currentDay.toDateString()
              )
              .map((appointment) => (
                <div
                  className="appointment"
                  key={appointment._id}
                  listid={appointment._id}
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
