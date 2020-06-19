import React from "react";
import Modal from "../Modal/Modal";
import "./AppointmentDisplay.css";

class AppointmentDisplay extends React.Component {
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
              <div className="appointment" key={appointment._id}>
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
