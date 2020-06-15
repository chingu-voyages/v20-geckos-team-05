import React from "react";
import Modal from "../Modal/Modal";

class AppointmentDisplay extends React.Component {
  render() {
    return (
      <div>
        {" "}
        <ul>
          {this.props.appointments.map((appointment) => (
            <li key={appointment._id}>
              {appointment.title} {appointment.begins.substring(11, 16)}
            </li>
          ))}
        </ul>
        <Modal fetchAppointments={this.props.fetchAppointments} />
      </div>
    );
  }
}

export default AppointmentDisplay;
