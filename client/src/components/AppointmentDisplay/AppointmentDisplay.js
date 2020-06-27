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

  sortByDate = (a, b) => {
    const dateA = a.startDate;
    const dateB = b.startDate;

    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
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
              .sort(this.sortByDate)
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
            {document.querySelector(".appointmentsList") ? (
              document
                .querySelector(".appointmentsList")
                .hasChildNodes() ? null : (
                <div className="appointment">No Appointments</div>
              )
            ) : null}
          </div>
        </div>
        <Modal
          fetchAppointments={this.props.fetchAppointments}
          currentDay={this.props.currentDay}
        />
      </div>
    );
  }
}

export default AppointmentDisplay;
