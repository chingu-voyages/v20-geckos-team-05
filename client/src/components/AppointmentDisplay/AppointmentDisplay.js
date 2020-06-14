import React from "react";

class AppointmentDisplay extends React.Component {
  render() {
    return (
      <ul>
        {this.props.appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.title} {appointment.begins.substring(11, 16)}
          </li>
        ))}
      </ul>
    );
  }
}

export default AppointmentDisplay;
