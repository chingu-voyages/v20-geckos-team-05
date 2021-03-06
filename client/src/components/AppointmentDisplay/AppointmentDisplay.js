import React from "react";
import Modal from "../Modal/Modal";
import "./AppointmentDisplay.css";

import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import EditAppointment from "../EditAppointment/EditAppointment";

class AppointmentDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    showEdit: false,
    editId: "",
    appointment: {},
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

  handleEditModal = (event) => {
    if (event.target.getAttribute("listid")) {
      this.setState(
        {
          showEdit: true,
          editId: event.target.getAttribute("listid"),
        },
        () => {
          this.fetchAppointment();
        }
      );
    }
  };

  handleEditModalClose = () => {
    this.setState({ showEdit: false });
  };

  fetchAppointment = () => {
    const id = this.state.editId;
    let url = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
    fetch(`${url}/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => this.setState({ appointment: data.appointment }))
      .then(this.myRef.current.updateState);
  };

  render() {
    return (
      <div
        className="appointmentsDisplayContainer"
        onClick={this.handleEditModal}
      >
        <div className="signInAndSignUpContainer">
          <Login 
            onLogin={this.props.onLogin} 
            userId={this.props.userId} 
            isLoggedIn={this.props.isLoggedIn} 
            stayLoggedIn={this.state.stayLoggedIn}
            handleLoggedInState={this.props.handleLoggedInState}
          />
          <Register 
            userId={this.props.userId} 
            isLoggedIn={this.props.isLoggedIn} 
          />
        </div>
        <div className="AppointmentDisplayheader">
          <div className="selectedDay">
            <div>{this.props.days[this.props.currentDay.getDay()]}</div>
            <div>
              {this.props.monthsLong[this.props.currentDay.getMonth()]}{" "}
              {this.props.currentDay.getDate()}{" "}
            </div>
          </div>
          {
          this.props.isLoggedIn && (
            <div className="buttonContainer">
              <div className="logoutButton" onClick={this.props.handleLogout}>Logout</div>
            </div>            
            )
          }   
        </div>

        <div className="appointmentsListBox">
          <div className="appointmentsList">
            {this.props.appointments
              .filter(
                (appointment) =>
                  new Date(appointment.startDate).toDateString() ===
                  this.props.currentDay.toDateString()
              )
              .filter((appointment) => appointment.userId === this.props.userId)
              .sort(this.sortByDate)
              .map((appointment) => (
                <div
                  className="appointment"
                  key={appointment._id}
                  listid={appointment._id}
                >
                  {appointment.begins.substring(11, 16)} {appointment.title}
                </div>
              ))}
            {this.props.appointments
              .filter(
                (appointment) =>
                  new Date(appointment.startDate).toDateString() ===
                  this.props.currentDay.toDateString()
              )
              .filter((appointment) => appointment.userId === this.props.userId)
              .length > 0 ? null : (
              <div className="appointment">No Appointments</div>
            )}
          </div>
        </div>
        <Modal
          fetchAppointments={this.props.fetchAppointments}
          currentDay={this.props.currentDay}
          userId={this.props.userId}
          isLoggedIn={this.props.isLoggedIn} 
        />
        <EditAppointment
          onEdit={this.handleEditModal}
          showEdit={this.state.showEdit}
          fetchAppointments={this.props.fetchAppointments}
          currentDay={this.props.currentDay}
          userId={this.props.userId}
          onClose={this.handleEditModalClose}
          editId={this.state.editId}
          appointment={this.state.appointment}
          ref={this.myRef}
        />
      </div>
    );
  }
}

export default AppointmentDisplay;
