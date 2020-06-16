import React from "react";
import Modal from "../Modal/Modal";
import './AppointmentDisplay.css';

class AppointmentDisplay extends React.Component {
  
  render() {
    return (
      <div className="appointmentsDisplayContainer contain">
        <div className="selectedDay">Monday 15th June 2020</div>
        <div className="appointmentsListBox contain">
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
